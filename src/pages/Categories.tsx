import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { categories } from "@/components/news/CategoryFilter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Laptop, 
  Trophy, 
  Briefcase, 
  Film, 
  Heart, 
  Microscope, 
  Vote,
  Globe
} from "lucide-react";
import { mockNewsData } from "@/data/mockNews";
import { useNavigate } from "react-router-dom";

const categoryIcons = {
  Technology: Laptop,
  Sports: Trophy,
  Business: Briefcase,
  Entertainment: Film,
  Health: Heart,
  Science: Microscope,
  Politics: Vote,
  World: Globe,
};

export const Categories = () => {
  const navigate = useNavigate();
  
  const getCategoryCount = (category: string) => {
    if (category === "All") return mockNewsData.length;
    return mockNewsData.filter(article => article.category === category).length;
  };

  const handleCategoryClick = (category: string) => {
    // Navigate to home with category filter
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-4">
        {/* Header Section */}
        <section className="news-gradient py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Categories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover news that matters to you across different topics
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.filter(cat => cat !== "All").map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Globe;
              const count = getCategoryCount(category);
              
              return (
                <Card 
                  key={category}
                  className="news-card p-6 cursor-pointer group hover:scale-105 transition-transform duration-200"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="text-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto primary-gradient rounded-2xl flex items-center justify-center group-hover:shadow-news transition-shadow">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Category Name */}
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                    
                    {/* Article Count */}
                    <Badge variant="secondary" className="text-sm">
                      {count} articles
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* All News Card */}
        <div className="container mx-auto px-4 pb-8">
          <Card 
            className="news-card p-8 cursor-pointer group hover:scale-[1.02] transition-transform duration-200 border-2 border-primary/20"
            onClick={() => handleCategoryClick("All")}
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:shadow-news transition-shadow">
                <Globe className="h-10 w-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">
                  All News
                </h3>
                <p className="text-muted-foreground">
                  Browse all articles from every category
                </p>
              </div>
              
              <Badge className="text-base px-4 py-2 primary-gradient text-white">
                {getCategoryCount("All")} total articles
              </Badge>
            </div>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};