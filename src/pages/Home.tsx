import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { NewsCard, NewsArticle } from "@/components/news/NewsCard";
import { CategoryFilter } from "@/components/news/CategoryFilter";
import { mockNewsData, getNewsByCategory, searchNews } from "@/data/mockNews";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Filter articles based on category and search
    let filtered = searchQuery 
      ? searchNews(searchQuery)
      : getNewsByCategory(selectedCategory);
    
    setArticles(filtered);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when changing category
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("All"); // Reset category when searching
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleToggleFavorite = (id: string) => {
    // In a real app, this would sync with backend/localStorage
    console.log("Toggle favorite for article:", id);
  };

  const handleReadMore = (article: NewsArticle) => {
    // In a real app, this would navigate to article detail page or open in-app browser
    window.open(article.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main className="pb-20 md:pb-4">
        {/* Hero Section */}
        <section className="news-gradient py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Latest News
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the most recent news from trusted sources around the world
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Refresh Button */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {searchQuery ? `Search results for "${searchQuery}"` : selectedCategory} News
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onToggleFavorite={handleToggleFavorite}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found{searchQuery ? ` for "${searchQuery}"` : ` in ${selectedCategory}`}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4"
              >
                View All News
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};