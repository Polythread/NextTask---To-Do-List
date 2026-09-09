import type { NextFunction, Request, Response } from "express";
import { createClient } from "redis";

const client = createClient();
await client.connect();
const CAPACITY = 10;
const REFILL_RATE = 5;

export async function tokenBucketLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.ip;
  const key = `ratelimiter:${userId}`;

  const userKey = await client.get(key);

  const now = Date.now();

  let capacity: number;
  let lastRefil: number;

  if (!userKey) {
    capacity = CAPACITY;
    lastRefil = now;
  } else {
    const bucket = JSON.parse(userKey);
    lastRefil = bucket.lastRefil;
    capacity = bucket.capacity;
  }

  const timeElapse = (now - lastRefil) / 1000;
  const tokenTobeGiven = REFILL_RATE * timeElapse;

  capacity = Math.min(CAPACITY, capacity + tokenTobeGiven);

  if (capacity < 1) {
    await client.set(
      key,
      JSON.stringify({
        capacity,
        lastRefil: now,
      }),
    );
    res.status(429).json({ message: "too many requests" });
  }
  capacity = capacity - 1;

  await client.set(
    key,
    JSON.stringify({
      capacity,
      lastRefil: now,
    }),
  );

  next();
}
