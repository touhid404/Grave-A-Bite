import { prisma } from "../lib/prisma";

async function seedCategories() {
  try {
    console.log("***** Category Seeding Started....");

    const categories = [
      {
        name: "Italian",
        description: "Authentic Italian pasta, pizza, and more.",
        image:
          "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Chinese",
        description: "Traditional Chinese noodles, stir-fry, and dim sum.",
        image:
          "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Fast Food",
        description: "Quick and delicious burgers, fries, and shakes.",
        image:
          "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Indian",
        description: "Spicy and aromatic curries, biryanis, and tandoori.",
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Japanese",
        description: "Fresh sushi, ramen, and tempura.",
        image:
          "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=1974&auto=format&fit=crop",
      },
      {
        name: "Mexican",
        description: "Tacos, burritos, and spicy salsas.",
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2070&auto=format&fit=crop",
      },
    ];

    for (const categoryData of categories) {
      console.log(`***** Processing Category: ${categoryData.name}`);

      const existingCategory = await prisma.category.findUnique({
        where: {
          name: categoryData.name,
        },
      });

      if (existingCategory) {
        console.log(
          `***** Category ${categoryData.name} already exists, skipping.`,
        );
        continue;
      }

      await prisma.category.create({
        data: categoryData,
      });

      console.log(`***** Category ${categoryData.name} created!`);
    }

    console.log("******* SUCCESS ******");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
