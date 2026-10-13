import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const { userId, title, author, description } = body;

  const createdBook = await prisma.book.create({
    data: {
      userId,
      title,
      author,
      description,
    },
  });

  return Response.json(createdBook);
}

export async function GET() {
  const book = await prisma.book.findMany();
  return Response.json(book);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  const deletedBook = await prisma.book.delete({
    where: {
      id: id,
    },
  });

  return Response.json(deletedBook);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, title, author, description } = body;
  const updatedBook = await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      title,
      author,
      description,
    },
  });

  return Response.json(updatedBook);
}
