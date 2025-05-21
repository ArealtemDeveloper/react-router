import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";

import { BASE_FETCH_URL } from "../../constants";
import { DICTIONARY } from "../../constants";

import styles from './DetailPage.module.css'

import VLoader from "../../components/VLoader/VLoader";

const EXCEPTION_FIELDS = ['image', 'id', 'residents', 'characters', 'episode', 'location', 'origin', 'url'];

function DetailPage() {
  const { slug, id } = useParams();

  const {    
    data,
    isLoading,
  } = useFetch(`${BASE_FETCH_URL}/${slug}/${id}`, false);

  const [formattedData, setFormattedData] = useState<string[]>([]);

  useEffect(() => {
    if (slug && data) {
        const arr = [];

        for (const [key, value] of Object.entries(data)) {
          if (!EXCEPTION_FIELDS.includes(key) && value && DICTIONARY[key]) {
            arr.push(`${DICTIONARY[key]}: ${value}`);
          }
        };

        setFormattedData(arr);
    }
  }, [data, slug, id])

  return (
    <ul className={styles.list}>
      {
      isLoading 
        ?  <VLoader/> 
        :  formattedData.map(item => (
            <li 
              className={styles.row}
              key={item}
            >
              {item}
            </li>
          ))
      }
    </ul>
  )
}

export default DetailPage;