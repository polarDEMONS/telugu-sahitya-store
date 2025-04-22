
import { useEffect, useState } from 'react';
import HomeBanner from '@/components/home/HomeBanner';
import BookGrid from '@/components/books/BookGrid';
import CategorySection from '@/components/home/CategorySection';
import books from '@/data/books';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
      console.log("Home component mounted");
      
      // Simulate data loading
      setTimeout(() => {
        setIsLoading(false);
        console.log("Home data loaded");
      }, 100);
    } catch (error) {
      console.error("Error in Home component:", error);
      setIsLoading(false);
    }
  }, []);

  // Filter books for different sections
  const featuredBooks = books.slice(0, 5);
  const newArrivals = [...books].sort(() => 0.5 - Math.random()).slice(0, 5);
  const bestSellers = [...books].sort((a, b) => b.rating - a.rating).slice(0, 5);

  console.log("Home rendering with", featuredBooks.length, "featured books");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HomeBanner />
      
      <div className="space-y-12 mb-12">
        <BookGrid books={featuredBooks} title="Featured Books" />
        <CategorySection />
        <BookGrid books={newArrivals} title="New Arrivals" />
        <BookGrid books={bestSellers} title="Best Sellers" />
      </div>
    </div>
  );
};

export default Home;
