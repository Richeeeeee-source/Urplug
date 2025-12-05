import { useEffect, useState } from 'react';
import { fetchNews, Article } from '@/lib/api/newsApi';

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={`${article.source.id || 'source'}-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(article.publishedAt).toLocaleDateString()} • {article.source.name}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {article.description || article.content?.substring(0, 150)}...
              </p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
