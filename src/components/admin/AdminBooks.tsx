import { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import BookCard from '@/components/books/BookCard';
import { Book } from '@/data/books';

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: '',
    title: '',
    author: '',
    price: 0,
    originalPrice: 0,
    coverImage: '',
    description: '',
    category: '',
    rating: 0,
    reviewCount: 0,
    language: 'Telugu',
    publisher: '',
    publicationDate: '',
    pages: 0,
    isbn: '',
    availability: true,
    featured: false,
    slug: ''
  });
  const [editBookId, setEditBookId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof Book) => {
    setNewBook({ ...newBook, [key]: e.target.value });
  };

  const handleSelectChange = (value: string, key: keyof Book) => {
    setNewBook({ ...newBook, [key]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Book) => {
    setNewBook({ ...newBook, [key]: e.target.checked });
  };

  // Mock function to demonstrate adding a book
  const handleAddBook = () => {
    const bookWithId = {
      ...newBook,
      id: `book-${Date.now()}`,
      slug: newBook.title.toLowerCase().replace(/\s+/g, '-'),
      publicationDate: new Date().toISOString().split('T')[0],
      rating: 0,
      reviewCount: 0
    };
    setBooks([...books, bookWithId]);
    
    // Reset form
    setNewBook({
      id: '',
      title: '',
      author: '',
      price: 0,
      originalPrice: 0,
      coverImage: '',
      description: '',
      category: '',
      rating: 0,
      reviewCount: 0,
      language: 'Telugu',
      publisher: '',
      publicationDate: '',
      pages: 0,
      isbn: '',
      availability: true,
      featured: false,
      slug: ''
    });
  };

  const handleEditBook = (book: Book) => {
    setEditBookId(book.id);
    setNewBook(book);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Book Management</h2>
        
        {/* Add Book Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Book</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={newBook.title}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={newBook.price}
                    onChange={(e) => setNewBook({...newBook, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input 
                    id="originalPrice" 
                    type="number"
                    value={newBook.originalPrice}
                    onChange={(e) => setNewBook({...newBook, originalPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newBook.description}
                  onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newBook.category} 
                    onValueChange={(value) => setNewBook({...newBook, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="poetry">Poetry</SelectItem>
                      <SelectItem value="children">Children's Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input 
                    id="coverImage" 
                    value={newBook.coverImage}
                    onChange={(e) => setNewBook({...newBook, coverImage: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input 
                    id="language" 
                    value={newBook.language}
                    onChange={(e) => setNewBook({...newBook, language: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input 
                    id="publisher"
                    value={newBook.publisher}
                    onChange={(e) => setNewBook({...newBook, publisher: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input 
                    id="pages" 
                    type="number"
                    value={newBook.pages}
                    onChange={(e) => setNewBook({...newBook, pages: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input 
                  id="isbn"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBook}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <Card key={book.id} className="overflow-hidden">
            <div className="p-4">
              <BookCard book={book} />
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    // Open edit dialog with this book
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    // Delete this book
                    setBooks(books.filter(b => b.id !== book.id));
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {books.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No books added yet. Click "Add New Book" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
