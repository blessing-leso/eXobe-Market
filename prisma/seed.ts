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

  // At least two published listings per category so every section browses cleanly.
  await prisma.product.createMany({
    data: [
      // FASHION
      {
        vendorId: thandeka.id,
        name: "Handcrafted Leather Tote Bag",
        description:
          "Full-grain leather tote, hand-stitched and finished in Soweto. Each piece is slightly unique.",
        price: 1450,
        category: "FASHION",
        imageUrl: "/products/leather-tote-bag.png",
        stock: 8,
        views: 134,
      },
      {
        vendorId: naledi.id,
        name: "Ankara Print Headwrap",
        description:
          "Vibrant Ankara print headwrap in 100% cotton. Versatile, breathable and made to make a statement.",
        price: 180,
        category: "FASHION",
        imageUrl: "/products/ankara-headwrap.png",
        stock: 30,
        views: 87,
      },

      // ELECTRONICS
      {
        vendorId: sipho.id,
        name: "Wireless Over-Ear Headphones",
        description:
          "Comfortable over-ear headphones with deep bass, 30-hour battery life and a built-in mic. Backed by a 12-month local warranty.",
        price: 899,
        category: "ELECTRONICS",
        imageUrl: "/products/over-ear-headphones.png",
        stock: 25,
        views: 212,
      },
      {
        vendorId: sipho.id,
        name: "Portable Bluetooth Speaker",
        description:
          "Compact water-resistant Bluetooth speaker with rich sound and 12-hour playtime. Perfect for braais and beach days.",
        price: 549,
        category: "ELECTRONICS",
        imageUrl: "/products/bluetooth-speaker.png",
        stock: 18,
        views: 145,
      },

      // HOME_AND_GARDEN
      {
        vendorId: naledi.id,
        name: "Basotho Beaded Wall Hanging",
        description:
          "Hand-beaded decorative wall art featuring traditional Basotho patterns. A statement piece for any room.",
        price: 620,
        category: "HOME_AND_GARDEN",
        imageUrl: "/products/beaded-wall-hanging.png",
        stock: 5,
        views: 98,
      },
      {
        vendorId: naledi.id,
        name: "Handwoven Seagrass Storage Basket",
        description:
          "Natural handwoven seagrass basket with sturdy handles. Stylish, eco-friendly storage for any home.",
        price: 295,
        category: "HOME_AND_GARDEN",
        imageUrl: "/products/seagrass-basket.png",
        stock: 22,
        views: 52,
      },

      // BEAUTY
      {
        vendorId: lerato.id,
        name: "Shea Butter Skincare Set",
        description:
          "Small-batch shea butter moisturiser and botanical soap bars, made with locally sourced natural ingredients.",
        price: 340,
        category: "BEAUTY",
        imageUrl: "/products/shea-butter-set.png",
        stock: 40,
        views: 156,
      },
      {
        vendorId: lerato.id,
        name: "Marula Oil Facial Serum",
        description:
          "Lightweight cold-pressed marula oil serum that deeply hydrates and restores glow. Cruelty-free and locally made.",
        price: 260,
        category: "BEAUTY",
        imageUrl: "/products/marula-oil-serum.png",
        stock: 33,
        views: 119,
      },

      // FOOD_AND_BEVERAGE
      {
        vendorId: lerato.id,
        name: "Rooibos & Chutney Pantry Pack",
        description:
          "Artisanal loose-leaf rooibos tea paired with homemade Cape chutney. Perfect as a gift or a weekend treat.",
        price: 215,
        category: "FOOD_AND_BEVERAGE",
        imageUrl: "/products/rooibos-chutney-pack.png",
        stock: 60,
        views: 74,
      },
      {
        vendorId: lerato.id,
        name: "Biltong & Droëwors Snack Box",
        description:
          "Hand-selected biltong and droëwors made from premium grass-fed beef. A protein-packed South African favourite.",
        price: 320,
        category: "FOOD_AND_BEVERAGE",
        imageUrl: "/products/biltong-box.png",
        stock: 45,
        views: 168,
      },

      // ARTS_AND_CRAFTS
      {
        vendorId: naledi.id,
        name: "Handwoven Beaded Bowl",
        description:
          "Colourful handwoven beaded bowl, crafted by artisans using traditional techniques. Decorative and food-safe.",
        price: 480,
        category: "ARTS_AND_CRAFTS",
        imageUrl: "/products/beaded-bowl.png",
        stock: 12,
        views: 63,
      },
      {
        vendorId: naledi.id,
        name: "Hand-painted Ndebele Art Canvas",
        description:
          "Original hand-painted canvas featuring bold geometric Ndebele patterns. A vivid celebration of South African heritage.",
        price: 750,
        category: "ARTS_AND_CRAFTS",
        imageUrl: "/products/ndebele-canvas.png",
        stock: 6,
        views: 91,
      },

      // SERVICES
      {
        vendorId: sipho.id,
        name: "Phone Screen Repair (Walk-in)",
        description:
          "Same-day screen replacement for most Android and iPhone models, done in-store at our Durban CBD workshop.",
        price: 450,
        category: "SERVICES",
        imageUrl: "/products/phone-repair.png",
        stock: 50,
        views: 41,
      },
      {
        vendorId: sipho.id,
        name: "Laptop Diagnostics & Tune-up",
        description:
          "Full laptop health check, malware cleanup and performance tune-up. Walk-in or book ahead at our Durban workshop.",
        price: 380,
        category: "SERVICES",
        imageUrl: "/products/laptop-tuneup.png",
        stock: 40,
        views: 33,
      },

      // OTHER
      {
        vendorId: naledi.id,
        name: "Eco Stationery Bundle",
        description:
          "Reusable notebooks and recycled-paper stationery set with kraft packaging. Practical, planet-friendly and locally made.",
        price: 185,
        category: "OTHER",
        imageUrl: "/products/eco-stationery.png",
        stock: 35,
        views: 28,
      },
      {
        vendorId: lerato.id,
        name: "Handmade Soy Candle Trio",
        description:
          "Three hand-poured soy wax candles with natural fragrances. Clean-burning and beautifully packaged for gifting.",
        price: 240,
        category: "OTHER",
        imageUrl: "/products/soy-candles.png",
        stock: 28,
        views: 47,
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
