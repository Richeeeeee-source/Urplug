import { NewsArticle } from "@/components/news/NewsCard";

export const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "Revolutionary AI Technology Breakthrough Changes Everything",
    description: "Scientists have developed a new form of artificial intelligence that can process information at unprecedented speeds, potentially revolutionizing multiple industries.",
    content: "A groundbreaking advancement in artificial intelligence has been announced by researchers at a leading technology institute. The new AI system demonstrates capabilities that were previously thought impossible...",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    category: "Technology",
    publishedAt: "2024-01-15T10:30:00Z",
    source: "Tech News Daily",
    url: "https://example.com/ai-breakthrough"
  },
  {
    id: "2",
    title: "Championship Final Draws Record-Breaking Audience",
    description: "The highly anticipated championship match attracted millions of viewers worldwide, setting new records for sports broadcasting.",
    content: "Last night's championship final exceeded all expectations as viewers from around the globe tuned in to witness sporting history...",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
    category: "Sports",
    publishedAt: "2024-01-14T22:45:00Z",
    source: "Sports Central",
    url: "https://example.com/championship-final"
  },
  {
    id: "3",
    title: "Global Markets Show Strong Growth in Q4",
    description: "International financial markets have demonstrated remarkable resilience and growth, exceeding analyst predictions for the fourth quarter.",
    content: "Financial experts are celebrating as global markets close the quarter with impressive gains across multiple sectors...",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    category: "Business",
    publishedAt: "2024-01-14T16:20:00Z",
    source: "Financial Times",
    url: "https://example.com/market-growth"
  },
  {
    id: "4",
    title: "Hollywood's Biggest Stars Unite for Charity Gala",
    description: "A star-studded charity event brought together entertainment industry icons to raise funds for important humanitarian causes.",
    content: "The entertainment industry came together last evening for a glamorous charity gala that raised record-breaking funds...",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0c86ba8b137?w=500&h=300&fit=crop",
    category: "Entertainment",
    publishedAt: "2024-01-13T20:15:00Z",
    source: "Entertainment Weekly",
    url: "https://example.com/charity-gala"
  },
  {
    id: "5",
    title: "Medical Researchers Discover Promising Treatment",
    description: "A team of international researchers has identified a potential breakthrough treatment that could help millions of patients worldwide.",
    content: "Medical professionals are optimistic about new research findings that suggest a revolutionary approach to treatment...",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
    category: "Health",
    publishedAt: "2024-01-13T14:30:00Z",
    source: "Medical Journal",
    url: "https://example.com/medical-breakthrough"
  },
  {
    id: "6",
    title: "Space Mission Achieves Historic Milestone",
    description: "The latest space exploration mission has reached a significant milestone, advancing our understanding of the universe.",
    content: "Space agencies around the world are celebrating as the ambitious mission successfully completes its primary objectives...",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop",
    category: "Science",
    publishedAt: "2024-01-12T18:45:00Z",
    source: "Space News",
    url: "https://example.com/space-mission"
  },
  {
    id: "7",
    title: "Climate Summit Reaches Important Agreement",
    description: "World leaders have reached a consensus on key environmental policies during the international climate summit.",
    content: "Environmental advocates are cautiously optimistic about the agreements reached at the latest climate summit...",
    imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&h=300&fit=crop",
    category: "World",
    publishedAt: "2024-01-12T12:00:00Z",
    source: "Global News",
    url: "https://example.com/climate-summit"
  },
  {
    id: "8",
    title: "Economic Policy Changes Announced",
    description: "Government officials have unveiled new economic policies designed to stimulate growth and address current market challenges.",
    content: "The latest economic policy announcements have generated significant discussion among financial experts and analysts...",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
    category: "Politics",
    publishedAt: "2024-01-11T15:30:00Z",
    source: "Political Times",
    url: "https://example.com/economic-policy"
  }
];

export const getNewsByCategory = (category: string): NewsArticle[] => {
  if (category === "All") return mockNewsData;
  return mockNewsData.filter(article => article.category === category);
};

export const searchNews = (query: string): NewsArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockNewsData.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.description.toLowerCase().includes(lowercaseQuery) ||
    article.category.toLowerCase().includes(lowercaseQuery)
  );
};