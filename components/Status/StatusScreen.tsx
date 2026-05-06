"use client";

import { useAppSelector } from "@/store/hooks";

import PaymentForm from "../PaymentForm";
import ProcessingScreen from "./ProcessingScreen";
import SuccessScreen from "./SuccessScreen";
import FailureScreen from "./FailureScreen";
import LockedScreen from "./LockedScreen";

export default function StatusScreen() {
  const status = useAppSelector((store) => store.payment.status);

  switch (status) {
    case "processing":
      return <ProcessingScreen />;

    case "success":
      return <SuccessScreen />;

    case "failed":
      return <FailureScreen variant="failed" />;

    case "timeout":
      return <FailureScreen variant="timeout" />;

    case "locked":
      return <LockedScreen />;

    default:
      return <PaymentForm />;
  }
}
