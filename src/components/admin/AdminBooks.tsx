import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/books/BookCard";
import books from '@/data/books';

const AdminBooks = () => {
  const [allBooks, setAllBooks] = useState(books);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [bookForm, setBookForm] = useState({
    id: '',
    title: '',
    author: '',
    price: '',
    discountedPrice: '',
    imageUrl: '',
    description: '',
    category: '',
    stock: '',
  });

  const handleEditBook = (book: any) => {
    setSelectedBook(book);
    setBookForm({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      discountedPrice: book.discountedPrice?.toString() || '',
      imageUrl: book.imageUrl,
      description: book.description,
      category: book.category,
      stock: book.stock?.toString() || '100',
    });
    setEditMode(true);
  };

  const handleAddNewBook = () => {
    setSelectedBook(null);
    setBookForm({
      id: `book-${Date.now()}`,
      title: '',
      author: '',
      price: '',
      discountedPrice: '',
      imageUrl: '/placeholder.svg',
      description: '',
      category: '',
      stock: '100',
    });
    setEditMode(true);
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedBook = {
      id: bookForm.id,
      title: bookForm.title,
      author: bookForm.author,
      price: parseFloat(bookForm.price),
      discountedPrice: bookForm.discountedPrice ? parseFloat(bookForm.discountedPrice) : undefined,
      imageUrl: bookForm.imageUrl,
      description: bookForm.description,
      category: bookForm.category,
      stock: parseInt(bookForm.stock),
    };

    if (selectedBook) {
      setAllBooks(allBooks.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      ));
    } else {
      setAllBooks([...allBooks, updatedBook]);
    }

    setEditMode(false);
    setSelectedBook(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteBook = (bookId: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setAllBooks(allBooks.filter(book => book.id !== bookId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Books</h2>
        <Button onClick={handleAddNewBook}>Add New Book</Button>
      </div>

      {editMode ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">{selectedBook ? 'Edit Book' : 'Add New Book'}</h3>
          <form onSubmit={handleSaveBook} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  type="text" 
                  name="title" 
                  value={bookForm.title} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <Input 
                  type="text" 
                  name="author" 
                  value={bookForm.author} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <Input 
                  type="number" 
                  name="price" 
                  value={bookForm.price} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Discounted Price (₹)</label>
                <Input 
                  type="number" 
                  name="discountedPrice" 
                  value={bookForm.discountedPrice} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input 
                  type="text" 
                  name="imageUrl" 
                  value={bookForm.imageUrl} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input 
                  type="text" 
                  name="category" 
                  value={bookForm.category} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <Input 
                  type="number" 
                  name="stock" 
                  value={bookForm.stock} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={bookForm.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit">Save Changes</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="h-16 w-12 object-cover" 
                  />
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  ₹{book.price}
                  {book.discountedPrice && (
                    <span className="line-through text-gray-500 ml-2">
                      ₹{book.discountedPrice}
                    </span>
                  )}
                </TableCell>
                <TableCell>{book.stock || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditBook(book)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminBooks;
