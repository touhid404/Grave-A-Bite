import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/authmiddle";
import { auth } from "../lib/auth";

async function seedAdmin() {
  try {
    console.log("***** Admin Seeding Started....");
    const admins = [
      {
        name: "Admin Riyadh",
        email: "admin@admin.com",
        role: UserRole.ADMIN,
        password: "12345678",
      },
      {
        name: "Admin Touhid",
        email: "admin2@admin.com",
        role: UserRole.ADMIN,
        password: "12345678",
      },
    ];

    for (const adminData of admins) {
      console.log(`***** Processing Admin: ${adminData.email}`);

      // check user exist on db or not
      const existingUser = await prisma.user.findUnique({
        where: {
          email: adminData.email,
        },
      });

      if (existingUser) {
        console.log(
          `***** User ${adminData.email} already exists, skipping creation.`,
        );
        continue;
      }

      console.log(`***** Creating Admin: ${adminData.email}`);
      try {
        const user = await auth.api.signUpEmail({
          body: {
            email: adminData.email,
            password: adminData.password,
            name: adminData.name,
            role: adminData.role,
          },
        });

        if (user) {
          console.log(`**** Admin ${adminData.email} created`);
          await prisma.user.update({
            where: {
              email: adminData.email,
            },
            data: {
              emailVerified: true,
            },
          });

          console.log(
            `**** Email verification status updated for ${adminData.email}!`,
          );
        }
      } catch (error: any) {
        console.error(
          `**** Failed to create admin ${adminData.email}:`,
          error.message || error,
        );
      }
    }
    console.log("******* SUCCESS ******");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
