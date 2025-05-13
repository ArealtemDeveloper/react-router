import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { CATEGORIES_DATA } from "../../data";
import { DICTIONARY } from "../../constants";

import styles from './DetailPage.module.css'

const EXCEPTION_FIELDS = ['image', 'id'];


function DetailPage() {
  const { slug, id } = useParams();

  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (slug) {
      const info = CATEGORIES_DATA[slug].info.find(item => String(item.id) === id);

      if (info) {
        const arr = [];

        for (const [key, value] of Object.entries(info)) {
          if (!EXCEPTION_FIELDS.includes(key) && value) {
            arr.push(`${DICTIONARY[key]}: ${value}`);
          }
        };

        setData(arr);
      }
    }
  }, [slug, id])

  return (
    <ul className={styles.list}>
        {data.map(item => (
          <li 
            className={styles.row}
            key={item}
          >
            {item}
          </li>
        ))}
    </ul>
  )
}

export default DetailPage;