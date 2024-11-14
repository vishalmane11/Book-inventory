import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./Components/BookList";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/edit/:id" element={<BookForm />} />
        <Route path="/add" element={<BookForm />} />{" "}
        {/* Route for adding a new book */}
      </Routes>
    </Router>
  );
}

export default App;
