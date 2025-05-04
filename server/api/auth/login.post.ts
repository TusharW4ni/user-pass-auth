import prisma from "~~/lib/prisma";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const runtime = useRuntimeConfig();

  const pepper = runtime.PEPPER;

  if (!email || !password) {
    setResponseStatus(event, 400);
    return { error: "Email and password are required" };
  }

  if (!pepper) {
    console.error("Server configuration error: PEPPER is not defined.");
    setResponseStatus(event, 500);
    return { error: "Server configuration error" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      setResponseStatus(event, 401); // Unauthorized
      return { error: "Invalid email or password" };
    }

    const pepperedPassword = password + pepper;

    const isPasswordValid = await bcrypt.compare(
      pepperedPassword,
      user.password
    );

    if (!isPasswordValid) {
      setResponseStatus(event, 401);
      return { error: "Invalid email or password" };
    }

    const { password: _, ...userWithoutPassword } = user;

    setResponseStatus(event, 200);
    // In a real application, you would typically generate a session token here
    return { message: "Login successful", user: userWithoutPassword };
  } catch (error) {
    console.error("Login error:", error);
    setResponseStatus(event, 500);
    return { message: "Errored logging in" };
  }
});
