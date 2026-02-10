// app/payment-link/confirmation/page.tsx
import { Suspense } from "react";
import PaymentConfirmationClient from "./PaymentConfirmationClient";

export default function PaymentConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentConfirmationClient />
    </Suspense>
  );
}
