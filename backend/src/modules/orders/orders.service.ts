import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../generated/prisma/client";

const createOrder = async (
  userId: string,
  orderData: {
    deliveryAddress: string;
    deliveryPhone: string;
    notes?: string;
    items: {
      mealId: string;
      quantity: number;
      price: number;
    }[];
  },
) => {
  const { deliveryAddress, deliveryPhone, notes, items } = orderData;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const totalAmount = subtotal + deliveryFee;

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        deliveryAddress,
        deliveryPhone,
        notes: notes ?? null,
        totalAmount,
        status: OrderStatus.PLACED,
      },
    });

    const orderItemsData = items.map((item) => ({
      orderId: order.id,
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.price,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    return await tx.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            meal: true,
          },
        },
      },
    });
  });
};

const getUserOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { customerId: userId },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
      reviews: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (userId: string, orderId: string) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
      reviews: true,
    },
  });
};

export const OrdersService = {
  createOrder,
  getUserOrders,
  getOrderById,
};
