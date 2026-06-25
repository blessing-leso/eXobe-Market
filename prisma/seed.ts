import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.vendor.deleteMany();

  const thandeka = await prisma.vendor.create({
    data: {
      businessName: "Thandeka's Leather Co.",
      ownerName: "Thandeka Mokoena",
      email: "thandeka@example.com",
      phone: "0821234567",
      province: "Gauteng",
      description: "Handmade genuine leather bags and belts, crafted in Soweto.",
      verified: true,
    },
  });

  const naledi = await prisma.vendor.create({
    data: {
      businessName: "Naledi Crafts",
      ownerName: "Naledi Dlamini",
      email: "naledi@example.com",
      phone: "0837654321",
      province: "Free State",
      description: "Beadwork and home decor inspired by Basotho heritage.",
      verified: true,
    },
  });

  const sipho = await prisma.vendor.create({
    data: {
      businessName: "Sipho's Tech Repairs",
      ownerName: "Sipho Ndlovu",
      email: "sipho@example.com",
      phone: "0712223344",
      province: "KwaZulu-Natal",
      description: "Mobile phone and laptop repair services in Durban.",
      verified: false,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        vendorId: thandeka.id,
        name: "Handcrafted Leather Tote Bag",
        description:
          "Full-grain leather tote, hand-stitched and finished in Soweto. Each piece is slightly unique.",
        price: 1450,
        category: "FASHION",
        stock: 8,
        views: 34,
      },
      {
        vendorId: thandeka.id,
        name: "Men's Leather Belt",
        description: "Classic brown leather belt with brass buckle, made to order.",
        price: 380,
        category: "FASHION",
        stock: 20,
        views: 12,
      },
      {
        vendorId: naledi.id,
        name: "Basotho Beaded Wall Hanging",
        description: "Hand-beaded decorative wall art, traditional Basotho patterns.",
        price: 620,
        category: "HOME_AND_GARDEN",
        stock: 5,
        views: 21,
      },
      {
        vendorId: naledi.id,
        name: "Beaded Statement Necklace",
        description: "Vibrant handmade beaded necklace, one size, adjustable cord.",
        price: 295,
        category: "FASHION",
        stock: 15,
        views: 9,
      },
      {
        vendorId: sipho.id,
        name: "Phone Screen Repair (Walk-in)",
        description: "Same-day screen replacement for most Android and iPhone models, Durban CBD.",
        price: 450,
        category: "SERVICES",
        stock: 50,
        views: 6,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
