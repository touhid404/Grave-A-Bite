import { prisma } from "../lib/prisma";


async function main() {
    const categoryId = "cmkvif4lw0000ewuw5unpm2fs";
    const providerId = "cmkwejuxo0000l0uwgqcojjzb";
    const image = "https://i.ibb.co.com/HL3QgC21/6076.jpg";

    console.log("Seeding 15 meals...");

    for (let i = 1; i <= 15; i++) {
        await prisma.meal.create({
            data: {
                name: `Test Meal ${i} - Gourmet Special`,
                description: `This is a delicious test meal number ${i}. perfectly crafted for testing purposes. Contains high quality ingredients.`,
                price: 10 + i * 2, // Varied prices: 12, 14, 16...
                image: image,
                providerId: providerId,
                categoryId: categoryId,
                dietary: i % 2 === 0 ? ["Spicy", "Non-Veg"] : ["Vegan", "Gluten-Free"], // Varied dietary tags
                isAvailable: true,
            },
        });
        console.log(`Created meal ${i}`);
    }

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
