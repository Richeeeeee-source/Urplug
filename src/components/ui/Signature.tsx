import { cn } from "@/lib/utils";

interface SignatureProps {
  className?: string;
  name: string;
  title?: string;
}

export const Signature = ({ 
  className, 
  name = "Richard Olu", 
  title = "News Feed" 
}: SignatureProps) => {
  return (
    <div className={cn("flex flex-col items-end mt-8", className)}>
      <div className="h-px w-16 bg-gray-300 mb-2"></div>
      <p className="text-sm text-muted-foreground font-medium">{name}</p>
      {title && (
        <p className="text-xs text-muted-foreground">{title}</p>
      )}
    </div>
  );
};
