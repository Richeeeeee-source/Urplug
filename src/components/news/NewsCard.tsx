import { Clock, Heart, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
  source: string;
  url: string;
  isFavorite?: boolean;
}

interface NewsCardProps {
  article: NewsArticle;
  onToggleFavorite?: (id: string) => void;
  onReadMore?: (article: NewsArticle) => void;
  className?: string;
}

export const NewsCard = ({ article, onToggleFavorite, onReadMore, className }: NewsCardProps) => {
  const [isFavorite, setIsFavorite] = useState(article.isFavorite || false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(article.id);
  };

  const handleReadMore = () => {
    onReadMore?.(article);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <article className={cn("news-card p-4 animate-fade-in", className)}>
      {/* Image */}
      {article.imageUrl && (
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {article.category}
            </Badge>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-primary cursor-pointer transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {article.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="font-medium">{article.source}</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className={cn(
                "h-8 px-2",
                isFavorite && "text-news-danger hover:text-news-danger"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReadMore}
              className="h-8 text-xs"
            >
              Read More
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 px-2"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};