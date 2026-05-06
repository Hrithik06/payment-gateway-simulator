export function usePaymentFlow() {
  const startPayment = async () => {
    console.log("Start payment");
  };

  return { startPayment };
}
