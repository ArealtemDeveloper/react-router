import { useCallback, useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router";
import { INITIAL_INFO, ROUTE_SLUGS } from "../../constants";
import { CATEGORIES_DATA } from "../../data";

import styles from './CategoryPage.module.css'
import VCard from "../../components/VCard/VCard";
import { ICategoryItem } from "../../types/constants";

const ORDERING_TYPES = {
  asc: 'asc',
  desc: 'desc',
};

function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams({order: ORDERING_TYPES.desc});
  const order = searchParams.get('order') || ORDERING_TYPES.desc;

  const { slug } = useParams();

  const [sortOrder, setSortOrder] = useState<any>(order);
  const [data, setData] = useState<ICategoryItem>(
    slug && CATEGORIES_DATA[slug] 
      ? CATEGORIES_DATA[slug]
      : INITIAL_INFO
  )

  const sortByCreated = useCallback((isInitial: boolean = false, arr:ICategoryItem['info']) => {
    let newOrder = sortOrder === ORDERING_TYPES.asc || isInitial
      ? ORDERING_TYPES.desc 
      : ORDERING_TYPES.asc;

    setSortOrder(newOrder);

    const sorted = [...arr].sort((a, b) => {
      const aTime = new Date(a.created).getTime();
      const bTime = new Date(b.created).getTime();

      return newOrder === ORDERING_TYPES.asc ? aTime - bTime : bTime - aTime;
    });
  
    setData(prev => ({
      ...prev,
      info: sorted
    }));

    setSearchParams({order: newOrder});
  }, [sortOrder, setSearchParams]);

  useEffect(() => {
    if (slug) {
      sortByCreated(true, CATEGORIES_DATA[slug].info);
    }
  },[slug])

  return (
    <div className={styles.container}>
      <button
        className={styles.button} 
        onClick={() => sortByCreated(false, data.info)}
      >
          Отсортировать по дате создания
      </button>
        <h1 className={styles.heading}>
            {slug ? ROUTE_SLUGS[slug] : 'Категория '}
        </h1>
        <div className={styles.wrapper}>
          { data.info.map(item => (
            <VCard
                key={item.id}
                type={data.type}
                data={item}
            />
          ))}
        </div>
    </div>
  )
}

export default CategoryPage;