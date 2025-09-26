import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const categories = [
  "All",
  "Technology",
  "Sports",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Politics",
  "World",
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
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={cn(
                "cursor-pointer whitespace-nowrap transition-smooth px-4 py-2 text-sm font-medium",
                selectedCategory === category
                  ? "primary-gradient text-white shadow-news"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};