export async function POST() {
  const rand = Math.random();

  await new Promise((res) => setTimeout(res, 2000));

  if (rand < 0.6) {
    return Response.json({ status: "success" }, { status: 200 });
  }

  if (rand < 0.85) {
    return Response.json(
      {
        status: "failed",
        reason: "Insufficient funds",
      },
      { status: 200 },
    );
  }

  await new Promise((res) => setTimeout(res, 6000));

  return Response.json({ status: "timeout" }, { status: 200 });
}
