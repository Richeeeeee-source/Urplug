const API_KEY = '62473925f16d4bda89289e8080f80b5a';
const IS_PRODUCTION = import.meta.env.PROD;
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const BASE_URL = IS_PRODUCTION 
  ? `${CORS_PROXY}${encodeURIComponent('https://newsapi.org/v2')}`
  : 'https://newsapi.org/v2';

// For development: Mock data when API fails
const MOCK_ARTICLES = [
  {
    source: { id: 'example', name: 'Example News' },
    author: 'Author',
    title: 'Example News 1',
    description: 'This is a sample news article description.',
    url: '#',
    urlToImage: 'https://via.placeholder.com/300x200?text=News+1',
    publishedAt: new Date().toISOString(),
    content: 'This is the full content of the sample news article.'
  },
  {
    source: { id: 'example', name: 'Example News' },
    author: 'Author',
    title: 'Example News 2',
    description: 'Another sample news article about technology.',
    url: '#',
    urlToImage: 'https://via.placeholder.com/300x200?text=News+2',
    publishedAt: new Date().toISOString(),
    content: 'This is another sample news article content.'
  },
  {
    source: { id: 'example', name: 'Example News' },
    author: 'Author',
    title: 'Example News 3',
    description: 'Latest updates in the world of technology.',
    url: '#',
    urlToImage: 'https://via.placeholder.com/300x200?text=News+3',
    publishedAt: new Date().toISOString(),
    content: 'Stay updated with the latest tech news and trends.'
  }
];

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// Helper function to handle API responses
async function handleResponse(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type');
  
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response:', text);
    throw new Error('Received non-JSON response from server');
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    console.error('API Error:', data);
    throw new Error(data.message || 'Failed to fetch news. Please try again later.');
  }
  
  return data;
}

// Function to fetch news from NewsAPI.org
export async function fetchNews(query: string = '', category: string = ''): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      language: 'en',
      pageSize: '10',
      sortBy: 'publishedAt',
      country: 'us' // Default country for top-headlines
    });

    // Use 'everything' endpoint for searches, 'top-headlines' for categories
    const endpoint = query ? '/everything' : '/top-headlines';
    
    // Add query or category to params
    if (query) {
      params.append('q', query);
    } else if (category && category !== 'all') {
      // Only add category if it's not 'all'
      params.append('category', category);
    }

    // Build the URL for the actual NewsAPI
    const apiUrl = `https://newsapi.org/v2${endpoint}?${params.toString()}`;
    // Use the CORS proxy in production
    const url = IS_PRODUCTION 
      ? `${CORS_PROXY}${encodeURIComponent(apiUrl)}`
      : apiUrl;
      
    console.log('Fetching news from:', url);
    
    const headers = IS_PRODUCTION
      ? { 'Accept': 'application/json' }
      : { 
          'Accept': 'application/json',
          'X-Api-Key': API_KEY
        };
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('NewsAPI Error:', error);
      throw new Error('Failed to fetch news. Please try again later.');
    }

    try {
      const data: NewsApiResponse = await response.json();
      
      if (!data.articles || data.articles.length === 0) {
        console.warn('No articles found for query:', { query, category });
        // Return mock data with category information for development
        return MOCK_ARTICLES.map(article => ({
          ...article,
          title: `${category && category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) + ' ' : ''}${article.title}`,
        }));
      }
      
      return data.articles;
    } catch (error) {
      console.error('Error parsing response:', error);
      throw new Error('Error processing news data');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // In development, return mock data with category context
    if (import.meta.env.DEV) {
      console.warn('Using mock data due to API error');
      return MOCK_ARTICLES.map(article => ({
        ...article,
        title: `${category && category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) + ' ' : ''}${article.title}`,
      }));
    }
    
    throw new Error('Failed to load news. Please try again later.');
  }
}
