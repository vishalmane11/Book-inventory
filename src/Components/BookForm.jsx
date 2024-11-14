// src/components/BookForm.jsx
import React, { useState, useEffect } from "react";
import { createBook, updateBook, getBookById } from "../api/bookApi";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    publisher: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBookById(id).then((response) => setFormData(response.data));
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    else if (formData.title.length < 2)
      newErrors.title = "Title should be at least 2 characters long";

    if (!formData.author) newErrors.author = "Author is required";
    else if (formData.author.length < 2)
      newErrors.author = "Author should be at least 2 characters long";

    if (!formData.publishedDate)
      newErrors.publishedDate = "Published Date is required";

    if (!formData.publisher) newErrors.publisher = "Publisher is required";
    else if (formData.publisher.length < 2)
      newErrors.publisher = "Publisher should be at least 2 characters long";

    if (formData.description && formData.description.length < 10)
      newErrors.description =
        "Description should be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        await updateBook(id, formData);
      } else {
        await createBook(formData);
      }
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {id ? "Edit Book" : "Add New Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Author
            </label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Published Date
            </label>
            <input
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              type="date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.publishedDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publishedDate}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Publisher
            </label>
            <input
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.publisher && (
              <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
          >
            {id ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
