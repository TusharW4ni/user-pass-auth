import prisma from "~~/lib/prisma";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const runtime = useRuntimeConfig();

  const pepper = runtime.PEPPER;

  if (!pepper) {
    setResponseStatus(event, 500);
    return { error: "Server configuration error" };
  }

  if (!email || !password) {
    setResponseStatus(event, 400);
    return { error: "Email and password are required" };
  }

  try {
    console.log("Creating user with email:", email);
    const saltRounds = 10;
    const pepperedPassword = password + pepper;
    const hashedPassword = await bcrypt.hash(pepperedPassword, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    setResponseStatus(event, 201);
    return {
      message: "User created successfully",
    };
  } catch (e: any) {
    if (e.code === "P2002" && e.meta?.target?.includes("email")) {
      setResponseStatus(event, 409);
      return { message: "User with this email already exists" };
    }
    console.error("Error creating user:", e);
    setResponseStatus(event, 500);
    return { message: "An error occurred while creating the user" };
  }
});
