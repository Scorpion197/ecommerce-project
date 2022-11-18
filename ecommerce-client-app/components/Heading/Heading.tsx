import styles from './Heading.module.css'
interface HeadingText{
    title:string;
    description:string;
}
const Heading = ({title,description}:HeadingText) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.description}>{description}</div>
    </div>
  )
}

export default Heading;