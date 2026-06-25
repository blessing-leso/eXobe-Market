import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const vendorSchema = z.object({
  businessName: z.string().min(2).max(100),
  ownerName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  province: z.string().min(2),
  description: z.string().max(500).optional(),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = vendorSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.vendor.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "A vendor with this email is already registered." },
      { status: 409 }
    );
  }

  const vendor = await prisma.vendor.create({
    data: { ...parsed.data, logoUrl: parsed.data.logoUrl || null },
  });

  return NextResponse.json({ vendor }, { status: 201 });
}
