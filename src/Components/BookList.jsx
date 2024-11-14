import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "../api/bookApi";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const response = await getBooks();
    setBooks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Book Inventory</h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add New Book
        </Link>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-600">
              Title
            </th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-600">
              Author
            </th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-t">
              <td className="py-3 px-4">{book.title}</td>
              <td className="py-3 px-4">{book.author}</td>
              <td className="py-3 px-4">
                <Link to={`/books/${book.id}`} className="text-blue-500 mr-2">
                  View
                </Link>
                <Link
                  to={`/books/edit/${book.id}`}
                  className="text-yellow-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
