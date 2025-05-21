import { useParams } from "react-router-dom";
import { BASE_FETCH_URL, ROUTE_SLUGS } from "../../constants";

import styles from './CategoryPage.module.css'
import VCard from "../../components/VCard/VCard";
import { useFetch } from "../../hooks/useFetch";
import { ICategory } from "../../types/constants";
import VLoader from "../../components/VLoader/VLoader";
import { useCallback, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

const DEFAULT_PAGE_VALUE = 1;

function CategoryPage() {
  const { slug } = useParams();
  const observer = useRef<IntersectionObserver | null>(null);
  
  const [params, setParams] = useState({ slug, pageNumber: DEFAULT_PAGE_VALUE })

  const {    
    data,
    isLoading,
    hasMore,
    sortByCreated,
    clearData,
  } = useFetch<ICategory>(`${BASE_FETCH_URL}/${params.slug}?page=${params.pageNumber}`, true);


  const lastNodeRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore) {
        setParams(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
      }
    })

    if(node) {
      observer.current.observe(node);
    }
  },[isLoading, hasMore])

  const handleSort = useCallback(() => {
    if (!data?.results) {
      return;
    }
  
    sortByCreated(data);
  },[data, sortByCreated])

  useEffect(() => {
      setParams({ slug, pageNumber: 1 });
      clearData();
  },[slug, clearData])

  return (
    <div className={styles.container}>
      <button
        className={styles.button} 
        onClick={() => handleSort()}
      >
          Отсортировать по дате создания
      </button>
        <h1 className={styles.heading}>
            {slug ? ROUTE_SLUGS[slug] : 'Категория '}
        </h1>
        <div className={styles.wrapper}>
          { isLoading 
            ? <VLoader/> 
            : data?.results.map((item, index) => {
              if(data?.results.length === index + 1) {
                return (
                  <div ref={lastNodeRef}>
                      <ErrorBoundary>
                        <VCard key={item.id} data={item}/>
                      </ErrorBoundary>
                  </div>
                )
              } else {
                return (
                  <ErrorBoundary>
                    <VCard key={item.id} data={item}/>
                  </ErrorBoundary>
                )
              }
            })
          }
        </div>
    </div>
  )
}

export default CategoryPage;