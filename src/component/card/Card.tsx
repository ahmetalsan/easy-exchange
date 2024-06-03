import Image from 'next/image'

import styles from './Card.module.scss'

type CardProps = {
  image: string
  title: string
  description: string
}

const Card = ({ image, title, description }: CardProps) => (
  <div className={styles.card}>
    <Image width="230" height="250" src={image} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
)

export default Card
