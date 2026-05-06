"use client";

import { useAppSelector } from "@/store/hooks";
import PaymentForm from "./PaymentForm";
import ProcessingScreen from "./Status/ProcessingScreen";
import SuccessScreen from "./Status/SuccessScreen";
import FailureScreen from "./Status/FailureScreen";
import LockedScreen from "./Status/LockedScreen";

export default function PaymentLayout() {
  const status = useAppSelector((state) => state.payment.status);

  if (status === "processing") {
    return <ProcessingScreen />;
  }

  return (
    <div>
      {status === "idle" && <PaymentForm />}
      {status === "success" && <SuccessScreen />}
      {status === "failed" && <FailureScreen variant="failed" />}
      {status === "timeout" && <FailureScreen variant="timeout" />}
      {status === "locked" && <LockedScreen />}
    </div>
  );
}
