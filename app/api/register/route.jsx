import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;
  console.log(firstName, lastName, email, password);

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists " },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      hashedPassword,
    },
  });

  if (user) {
    console.log("page loaded1");
    return NextResponse.json({ message: "User created" }, { status: 201 });
  }
  console.log("page loaded2");

  return NextResponse.json(
    { message: "Something went wrong!" },
    { status: 500 }
  );
}
