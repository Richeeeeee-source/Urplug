import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { NewsCard, NewsArticle } from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Heart, BookmarkPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const Favorites = () => {
  // Mock favorites data - in real app this would come from backend/localStorage
  const [favoriteArticles, setFavoriteArticles] = useState<NewsArticle[]>([
    {
      id: "1",
      title: "Revolutionary AI Technology Breakthrough Changes Everything",
      description: "Scientists have developed a new form of artificial intelligence that can process information at unprecedented speeds, potentially revolutionizing multiple industries.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      category: "Technology",
      publishedAt: "2024-01-15T10:30:00Z",
      source: "Tech News Daily",
      url: "https://example.com/ai-breakthrough",
      isFavorite: true
    },
    {
      id: "5",
      title: "Medical Researchers Discover Promising Treatment",
      description: "A team of international researchers has identified a potential breakthrough treatment that could help millions of patients worldwide.",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      category: "Health",
      publishedAt: "2024-01-13T14:30:00Z",
      source: "Medical Journal",
      url: "https://example.com/medical-breakthrough",
      isFavorite: true
    }
  ]);

  const handleToggleFavorite = (id: string) => {
    setFavoriteArticles(prev => 
      prev.filter(article => article.id !== id)
    );
  };

  const handleReadMore = (article: NewsArticle) => {
    window.open(article.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-4">
        {/* Header Section */}
        <section className="news-gradient py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 primary-gradient rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Your Favorites
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access your saved articles anytime, anywhere
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {favoriteArticles.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Saved Articles ({favoriteArticles.length})
                </h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookmarkPlus className="h-4 w-4" />
                  Export List
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favoriteArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onToggleFavorite={handleToggleFavorite}
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto primary-gradient rounded-full flex items-center justify-center mb-6 opacity-50">
                <Heart className="h-12 w-12 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">No Favorites Yet</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Start saving articles you love by tapping the heart icon on any news story
              </p>
              
          <Button asChild className="primary-gradient">
            <Link to="/">
              Explore News
            </Link>
          </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};