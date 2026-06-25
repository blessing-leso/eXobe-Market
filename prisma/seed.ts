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
      description: "Beadwork, decor and crafts inspired by Basotho heritage.",
      verified: true,
    },
  });

  const sipho = await prisma.vendor.create({
    data: {
      businessName: "Sipho's Tech Hub",
      ownerName: "Sipho Ndlovu",
      email: "sipho@example.com",
      phone: "0712223344",
      province: "KwaZulu-Natal",
      description: "Consumer electronics and same-day device repairs in Durban.",
      verified: true,
    },
  });

  const lerato = await prisma.vendor.create({
    data: {
      businessName: "Lerato Naturals",
      ownerName: "Lerato Khumalo",
      email: "lerato@example.com",
      phone: "0763334455",
      province: "Western Cape",
      description: "Small-batch natural skincare and Cape pantry goods.",
      verified: true,
    },
  });

  // One published listing per category so the marketplace browses cleanly.
  await prisma.product.createMany({
    data: [
      {
        vendorId: thandeka.id,
        name: "Handcrafted Leather Tote Bag",
        description:
          "Full-grain leather tote, hand-stitched and finished in Soweto. Each piece is slightly unique.",
        price: 1450,
        category: "FASHION",
        imageUrl: "/products/fashion.png",
        stock: 8,
        views: 134,
      },
      {
        vendorId: sipho.id,
        name: "Wireless Over-Ear Headphones",
        description:
          "Comfortable over-ear headphones with deep bass, 30-hour battery life and a built-in mic. Backed by a 12-month local warranty.",
        price: 899,
        category: "ELECTRONICS",
        imageUrl: "/products/electronics.png",
        stock: 25,
        views: 212,
      },
      {
        vendorId: naledi.id,
        name: "Basotho Beaded Wall Hanging",
        description:
          "Hand-beaded decorative wall art featuring traditional Basotho patterns. A statement piece for any room.",
        price: 620,
        category: "HOME_AND_GARDEN",
        imageUrl: "/products/home.png",
        stock: 5,
        views: 98,
      },
      {
        vendorId: lerato.id,
        name: "Shea Butter Skincare Set",
        description:
          "Small-batch shea butter moisturiser and botanical soap bars, made with locally sourced natural ingredients.",
        price: 340,
        category: "BEAUTY",
        imageUrl: "/products/beauty.png",
        stock: 40,
        views: 156,
      },
      {
        vendorId: lerato.id,
        name: "Rooibos & Chutney Pantry Pack",
        description:
          "Artisanal loose-leaf rooibos tea paired with homemade Cape chutney. Perfect as a gift or a weekend treat.",
        price: 215,
        category: "FOOD_AND_BEVERAGE",
        imageUrl: "/products/food.png",
        stock: 60,
        views: 74,
      },
      {
        vendorId: naledi.id,
        name: "Handwoven Beaded Bowl",
        description:
          "Colourful handwoven beaded bowl, crafted by artisans using traditional techniques. Decorative and food-safe.",
        price: 480,
        category: "ARTS_AND_CRAFTS",
        imageUrl: "/products/crafts.png",
        stock: 12,
        views: 63,
      },
      {
        vendorId: sipho.id,
        name: "Phone Screen Repair (Walk-in)",
        description:
          "Same-day screen replacement for most Android and iPhone models, done in-store at our Durban CBD workshop.",
        price: 450,
        category: "SERVICES",
        imageUrl: "/products/services.png",
        stock: 50,
        views: 41,
      },
      {
        vendorId: naledi.id,
        name: "Eco Stationery Bundle",
        description:
          "Reusable notebooks and recycled-paper stationery set with kraft packaging. Practical, planet-friendly and locally made.",
        price: 185,
        category: "OTHER",
        imageUrl: "/products/other.png",
        stock: 35,
        views: 28,
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
