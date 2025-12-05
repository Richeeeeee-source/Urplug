import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'technology', name: 'Technology' },
  { id: 'sports', name: 'Sports' },
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'politics', name: 'Politics' },
  { id: 'general', name: 'World' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="py-4">
      <ScrollArea>
        <div className="flex gap-2 pb-2 px-4">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className={cn(
                "cursor-pointer whitespace-nowrap transition-smooth px-4 py-2 text-sm font-medium",
                selectedCategory === category.id
                  ? "primary-gradient text-white shadow-news"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};