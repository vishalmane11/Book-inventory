// src/components/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/bookApi";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Published Date:</strong> {book.publishedDate}
      </p>
      <p>
        <strong>Publisher:</strong> {book.publisher}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
    </div>
  );
};

export default BookDetails;
