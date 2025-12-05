import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { NewsCard } from "@/components/news/NewsCard";
import { CategoryFilter } from "@/components/news/CategoryFilter";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";
import { fetchNews, Article } from "@/lib/api/newsApi";

// Available news categories from NewsAPI
const CATEGORIES = [
  'all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
];

export const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch news on component mount and when category changes
  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNews(searchQuery, selectedCategory === 'all' ? '' : selectedCategory);
        setArticles(data);
        setFilteredArticles(data);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [selectedCategory]);

  // Filter articles based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = articles.filter(
      article => 
        article.title?.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query)
    );
    
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('all');
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const data = await fetchNews(searchQuery, selectedCategory === 'all' ? '' : selectedCategory);
      setArticles(data);
      setFilteredArticles(data);
    } catch (err) {
      setError('Failed to refresh news. Please try again.');
      console.error('Error refreshing news:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    // In a real app, this would sync with backend/localStorage
    console.log("Toggle favorite for article:", id);
  };

  const handleReadMore = (article: Article) => {
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
              {filteredArticles.map((article, index) => {
                // Map the API response to match our NewsArticle interface
                const mappedArticle = {
                  id: article.url, // Use URL as unique ID
                  title: article.title || 'No title',
                  description: article.description || '',
                  content: article.content || '',
                  imageUrl: article.urlToImage || undefined,
                  category: selectedCategory,
                  publishedAt: article.publishedAt,
                  source: article.source?.name || 'Unknown Source',
                  url: article.url,
                  isFavorite: false
                };
                
                return (
                  <NewsCard
                    key={`${article.source?.id || 'source'}-${index}`}
                    article={mappedArticle}
                    onToggleFavorite={() => handleToggleFavorite(article.url)}
                    onReadMore={() => handleReadMore(article)}
                  />
                );
              })}
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