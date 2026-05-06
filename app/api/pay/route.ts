export async function POST() {
  const rand = Math.random();

  await new Promise((res) => setTimeout(res, 2000));

  if (rand < 0.6) {
    return Response.json({ status: "success" });
  }

  if (rand < 0.85) {
    return Response.json({
      status: "failed",
      reason: "Insufficient funds",
    });
  }

  await new Promise((res) => setTimeout(res, 6000));

  return Response.json({ status: "timeout" });
}
