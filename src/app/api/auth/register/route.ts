import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1. Get all data from the form
  const body = await request.json();

  // 2. Verify if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 },
    );
  }

  // 3. Verifiy student ID already exists
  const existingStudent = await prisma.user.findUnique({
    where: { studentId: body.studentId },
  });
  if (existingStudent) {
    return NextResponse.json(
      { message: "Student ID already exists" },
      { status: 400 },
    );
  }

  // 4. Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // 5. Create a new user
  const newUser = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      studentId: body.studentId,
      email: body.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      studentId: true,
      email: true,
      password: false,
    },
  });
  if (!newUser) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 400 },
    );
  }
  // 3. Return a success response
  return NextResponse.json(
    { message: "User created successfully", data: newUser },
    { status: 201 },
  );
}
