import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Define the NewsArticle type
type NewsArticle = {
  sentiment: string;
  description: string;
  title: string;
  content: string;
  url: string; // Added the missing 'url' property
};

const NEWS_QUERY = gql`
  query MyQuery($offset: Int, $limit: Int) {
    news_processed(offset: $offset, limit: $limit) {
      sentiment
      description
      title
      content
      url
    }
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [limit] = useState(12);

  const { loading, error, data, fetchMore } = useQuery(NEWS_QUERY, {
    variables: { offset, limit },
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = () => {
    fetchMore({
      variables: { offset: data.news_processed.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          news_processed: [...prev.news_processed, ...fetchMoreResult.news_processed],
        };
      },
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-blue-600';
      case 'neutral':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex justify-between items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Home page</CardTitle>
            <CardDescription>
              You are authenticated. You now have access to the authorised part of the application.
            </CardDescription>
          </CardHeader>
        </Card>
        <Button 
          className="ml-4"
          onClick={() => navigate('/preferences')}
        >
          Preferences
        </Button>
      </div>

      {/* News Articles Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">News Articles</h2>
        {loading && !data ? <p>Loading articles...</p> : null}
        {error ? <p>Error loading articles: {error.message}</p> : null}

        {/* Display news articles in cards */}
        <div className="flex flex-col gap-6">
          {data?.news_processed?.map((news: NewsArticle, index: number) => (
            <Card key={index} className="w-full p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{news.title}</CardTitle>
                <CardDescription className="text-lg mb-4">{news.description}</CardDescription>
                <p className={`text-sm font-semibold ${getSentimentColor(news.sentiment)}`}>
                  Sentiment: {news.sentiment}
                </p>
                <p className="mt-4 text-base text-gray-800">{news.content}</p>
                <CardFooter>{news.url}</CardFooter>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {data && (
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
