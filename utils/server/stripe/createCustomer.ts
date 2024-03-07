import prisma from "@/lib/prisma";
import { PaymentData } from "@/utils/types/stripe";

export async function createCustomer(paymentData: PaymentData) {
  try {
    const firstLastName = paymentData.customerDetails?.name?.split(" ");

    await prisma.customer.create({
      data: {
        firstname: firstLastName![0],
        lastname: firstLastName![1],
        email: paymentData.customerDetails?.email!,
        phone: paymentData.customerDetails?.phone,
        address: {
          create: {
            city: paymentData.customerDetails?.address?.city,
            country: paymentData.customerDetails?.address?.country,
            line1: paymentData.customerDetails?.address?.line1,
            line2: paymentData.customerDetails?.address?.line2,
            postal_code: paymentData.customerDetails?.address?.postal_code,
            state: paymentData.customerDetails?.address?.state,
          },
        },
        transactions: {
          create: {
            paymentStatus: paymentData.paymentStatus,
            status: paymentData.status,
            currency: paymentData.currency,
            amountSubtotal: paymentData.amountSubtotal,
            amountTotal: paymentData.amountTotal,
            soldItems: { createMany: { data: paymentData.soldItems } },
          },
        },
      },
    });
  } catch (error) {
    console.log(
      `Problem creating customer: ${paymentData.customerDetails?.email}`,
      error
    );
  }
}
