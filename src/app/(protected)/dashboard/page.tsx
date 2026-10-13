"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  // Get books from API and set books state
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    };

    getBooks();
  }, []);

  // Filter books based on search and user
  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesUser = book.userId === session?.user?.id;
      return matchesSearch && matchesUser;
    });

    setFilteredBooks(filtered);
  }, [search, books, session?.user?.id]);

  const handleDeleteBook = async (id: string) => {
    const response = await fetch("/api/books", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("Book deleted successfully");
      setBooks(books.filter((book) => book.id !== id));
    } else {
      alert("Faile to delete book");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 mx-4">
        <h1 className="text-2xl font-bold ">
          Welcome, {session?.user?.name || "User"} 👋
        </h1>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
      <div className="flex items-center justify-between p-4 mx-4">
        <h1 className="text-2xl font-bold">Your Books</h1>
        <div className="flex items-center gap-3">
          <input
            className="box-border h-10 rounded border border-gray-400 px-3 text-gray-800"
            type="text"
            placeholder="Search for a book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            href="/add-book"
            className=" flex items-center justify-center box-border h-10 rounded border border-gray-400 bg-white px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
          >
            Add Book
          </Link>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-3 p-4">
        {filteredBooks.length === 0 ? (
          <div>
            <h2>No books found</h2>
          </div>
        ) : (
          filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-40 items-center justify-center bg-gray-100">
                  <span className="text-gray-400">Book Image</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Author: {book.author}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    {book.description}
                  </p>
                  <div className="mt-auto p-4 flex gap-2">
                    <Link
                      href={`/edit-book/${book.id}`}
                      className="flex-1 rounded-md border text-center border-gray-300 px-3 py-2 text-sm font-semibold hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold hover:bg-gray-100"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Dashboard;
