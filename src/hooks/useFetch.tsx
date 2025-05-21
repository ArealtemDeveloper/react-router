import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ICategory } from "../types/constants";

type QueryParams = Record<string, any>;

interface RefetchQuery {
  params?: QueryParams;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: (query?: RefetchQuery) => Promise<void>;
  sortByCreated: (posts: ICategory) => void;
  sortOrder?: string;
  hasMore: boolean;
  clearData: () => void;
}

const ORDERING_TYPES = {
  asc: 'asc',
  desc: 'desc',
};

export function useFetch<T extends ICategory = ICategory>(apiUrl: string, sorted?: boolean): UseFetchResult<T> {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order') || ORDERING_TYPES.asc;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sortOrder, setSortOrder] = useState(order);
  const [hasMore, setHasMore] = useState(true);

  const clearData = useCallback(() => {
    setData(null);
  },[])

  const sortByCreated = useCallback((posts: ICategory) => {
    if (posts && posts.results) {
      const results = [...posts.results];

      const newOrder = sortOrder === ORDERING_TYPES.asc 
        ? ORDERING_TYPES.desc 
        : ORDERING_TYPES.asc;
      
      results.sort((a, b) => {
        const aTime = new Date(a.created).getTime();
        const bTime = new Date(b.created).getTime();
        
        return newOrder === ORDERING_TYPES.asc ? aTime - bTime : bTime - aTime;
      });

      setData(prev => prev ? { ...prev, results: [...results] } : prev);
      setSortOrder(newOrder);
      setSearchParams({order: newOrder});
    }
  }, [sortOrder, setSearchParams]);

  const refetch = useCallback(
    async (query: RefetchQuery = {}) => {
      const formattedQuery = query.params
        ? new URLSearchParams(query.params).toString()
        : "";

      const url = query.params ? `${apiUrl}?${formattedQuery}` : apiUrl;

      try {
         setIsLoading(true);
         setError(null);
    
         const response = await fetch(url);

         if (!response.ok) {
           throw new Error(`HTTP error!`);
         }

         const posts = await response.json();

         if (!sorted) {
          setData(posts);
         } else {
          setHasMore(posts.info.next);
          setData(prev => prev ? { ...prev, results: [...prev.results, ...posts.results] } : posts);

          setSortOrder(ORDERING_TYPES.asc);
          setSearchParams({order: ORDERING_TYPES.asc});
         }
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    hasMore,
    error,
    refetch,
    sortByCreated,
    clearData,
  };
}