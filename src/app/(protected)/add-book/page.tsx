"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const { data: session } = useSession();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookDetails = {
      id: session?.user?.id,
      title,
      author,
      description,
    };

    console.log(session);

    console.log(bookDetails);
  };
  return (
    <>
      <div className="flex w-full justify-end p-4">
        <Link
          href="/dashboard"
          className="rounded-md border border-gray-400 bg-white px-4 py-2 font-semibold shadow hover:bg-gray-100"
        >
          Back to Dashboard
        </Link>
      </div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <form
          className="flex w-full max-w-md flex-col gap-4 rounded-md border-2 border-gray-300 p-6 shadow"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold">Add Book</h1>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title"
            className="rounded-md border border-gray-300 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            placeholder="Author"
            className="rounded-md border border-gray-300 p-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            placeholder="Description"
            className="rounded-md border border-gray-300 p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md border border-gray-400 bg-white px-4 py-2 font-semibold shadow hover:bg-gray-100"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
