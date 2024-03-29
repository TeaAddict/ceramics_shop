import { Transaction } from "@/utils/types/stripe";
import Stripe from "stripe";

export function createTransaction(
  event:
    | Stripe.CheckoutSessionCompletedEvent
    | Stripe.CheckoutSessionAsyncPaymentSucceededEvent
) {
  const sessionInfo = event.data.object;
  const transaction: Transaction = {
    paymentStatus: sessionInfo.payment_status,
    status: sessionInfo.status,
    //   invoice_creation: sessionInfo.invoice_creation,
    customerDetails: sessionInfo.customer_details,
    currency: sessionInfo.currency,
    //   automatic_tax: sessionInfo.automatic_tax,
    amountSubtotal: sessionInfo.amount_subtotal,
    amountTotal: sessionInfo.amount_total,
    sessionId: sessionInfo.id,
  };
  return transaction;
}
