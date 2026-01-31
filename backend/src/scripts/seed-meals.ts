import { prisma } from "../lib/prisma";

async function main() {
  const categoryIdBD = "cml27uqfp0003qouwrd0e5lo2"; // Bangladeshi
  const categoryIdIT = "cml27uq5z0000qouwumria21d"; // Italian
  const categoryIdJP = "cml27uqiu0004qouwgnnf1l0y"; // Japanese
  const providerId = "cml281cma000028uwgylsl0ug";

  const meals = [
    // Bangladeshi
    {
      name: "Kacchi Biryani",
      description:
        "Traditional mutton kacchi biryani with long grain basmati rice and potatoes.",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdBD,
      dietary: ["Non-Veg", "Spicy"],
    },
    {
      name: "Bhuna Khichuri",
      description: "Deep flavored rice and lentil dish served with beef bhuna.",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1601050638917-3d8437024584?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdBD,
      dietary: ["Non-Veg"],
    },
    {
      name: "Beef Tehari",
      description: "Aromatic small grain rice cooked with tender beef chunks.",
      price: 300,
      image:
        "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdBD,
      dietary: ["Non-Veg", "Spicy"],
    },
    {
      name: "Morog Polao",
      description:
        "Fragrant rice served with a large piece of spiced chicken roast.",
      price: 400,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdBD,
      dietary: ["Non-Veg"],
    },
    {
      name: "Hilsa Fish Curry",
      description: "The national fish of Bangladesh cooked in mustard sauce.",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1516714435131-44d6b64dc38b?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdBD,
      dietary: ["Non-Veg", "Fish"],
    },
    // Italian
    {
      name: "Margherita Pizza",
      description:
        "Classic pizza with tomato sauce, fresh mozzarella, and basil.",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdIT,
      dietary: ["Vegetarian"],
    },
    {
      name: "Pasta Carbonara",
      description: "Creamy pasta with egg, cheese, pancetta, and black pepper.",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop",
      categoryId: categoryIdIT,
      dietary: ["Non-Veg"],
    },
    {
      name: "Lasagna Bolognese",
      description: "Layered pasta with meat sauce, bechamel, and parmesan.",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1629115913089-755018128522?q=80&w=1974&auto=format&fit=crop",
      categoryId: categoryIdIT,
      dietary: ["Non-Veg"],
    },
    {
      name: "Truffle Mushroom Risotto",
      description: "Arborio rice cooked with wild mushrooms and truffle oil.",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdIT,
      dietary: ["Vegetarian"],
    },
    {
      name: "Seafood Fettuccine",
      description: "Flat pasta served with fresh shrimp, clams, and mussels.",
      price: 1300,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2020&auto=format&fit=crop",
      categoryId: categoryIdIT,
      dietary: ["Non-Veg", "Seafood"],
    },
    // Japanese
    {
      name: "Sushi Platter",
      description: "Assorted nigiri and maki rolls with fresh tuna and salmon.",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdJP,
      dietary: ["Non-Veg", "Seafood"],
    },
    {
      name: "Tonkotsu Ramen",
      description: "Rich pork bone broth with chashu pork, egg, and noodles.",
      price: 900,
      image:
        "https://images.unsplash.com/photo-1557872246-10759f200c67?q=80&w=2008&auto=format&fit=crop",
      categoryId: categoryIdJP,
      dietary: ["Non-Veg"],
    },
    {
      name: "Shrimp Tempura",
      description: "Crispy battered shrimp served with tendashi sauce.",
      price: 800,
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop",
      categoryId: categoryIdJP,
      dietary: ["Non-Veg", "Seafood"],
    },
    {
      name: "Beef Teriyaki",
      description: "Grilled beef glazed with sweet and savory teriyaki sauce.",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
      categoryId: categoryIdJP,
      dietary: ["Non-Veg"],
    },
    {
      name: "Salmon Sashimi",
      description:
        "Freshly sliced raw salmon served with wasabi and soy sauce.",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
      categoryId: categoryIdJP,
      dietary: ["Non-Veg", "Seafood"],
    },
  ];

  console.log(`Seeding ${meals.length} meals...`);

  for (const meal of meals) {
    await prisma.meal.create({
      data: {
        ...meal,
        providerId: providerId,
        isAvailable: true,
      },
    });
    console.log(`Created meal: ${meal.name}`);
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
