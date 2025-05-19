import { ICategoryType } from '../../types/constants'
import styles from './VCard.module.css'

import { NavLink } from 'react-router'

interface ICardProps {
    type: ICategoryType,
    data: {[key: string]: string},
}


function VCard({ type, data }: ICardProps) {
  return (
    <NavLink
        to={String(data.id)} 
        className={styles.container}
    >
        <div>
            {
                data.image &&
                <img
                    className={styles.image} 
                    src={data.image} 
                    alt="Картинка персонажа" 
                />
            }
        </div>

        <p className={styles.text}>
            <span className={styles.name}>
                {data.name}
            </span>
        </p>
    </NavLink>
  )
}

export default VCard