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
