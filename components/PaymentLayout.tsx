"use client";

import { useAppSelector } from "@/store/hooks";
import AppLayout from "./AppLayout";
import ProcessingScreen from "./Status/ProcessingScreen";
import StatusScreen from "./Status/StatusScreen";

export default function PaymentLayout() {
  const status = useAppSelector((store) => store.payment.status);

  if (status === "processing") {
    return <ProcessingScreen />;
  }

  return (
    <AppLayout>
      <StatusScreen />
    </AppLayout>
  );
}
