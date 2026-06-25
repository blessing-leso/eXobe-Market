import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  buyerName: z.string().min(2).max(100),
  buyerEmail: z.string().email(),
  buyerPhone: z.string().min(7).max(20),
  province: z.string().min(2),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.coerce.number().int().positive(),
      })
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { items, ...buyer } = parsed.data;

  try {
    // Everything below runs as one DB transaction: either the whole order
    // is placed and stock is decremented consistently, or none of it is.
    // This matters even for a no-real-payment checkout — two buyers should
    // never be able to "buy" the last unit of the same item.
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: items.map((i) => i.productId) } },
      });

      let total = 0;
      for (const item of items) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) throw new Error(`Product ${item.productId} no longer exists`);
        if (product.stock < item.quantity) {
          throw new Error(`Only ${product.stock} unit(s) of "${product.name}" left in stock`);
        }
        total += product.price.toNumber() * item.quantity;
      }

      const newOrder = await tx.order.create({
        data: {
          ...buyer,
          totalAmount: total,
          status: "PENDING",
          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              return {
                productId: item.productId,
                vendorId: product.vendorId,
                quantity: item.quantity,
                unitPrice: product.price,
              };
            }),
          },
        },
        include: { items: true },
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return NextResponse.json(
      { order: { ...order, totalAmount: order.totalAmount.toNumber() } },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
