import Link from 'next/link';
import Button from '../../Button/Button';
import styles from './Product.module.css'

interface ProductProps{
    title:string;
    price:number;
}
const Product = ({title,price}:ProductProps) => {
  return (
    <div className={styles.container}>
        <figure className={styles.imageContainer}>
            <img src="/tshirt1.jpg" width="100%" height="100%" style={{objectFit:"cover"}}/>
        </figure>
        <div className={styles.metaData}>
            <div className={styles.title}>{title}</div>
            <div className={styles.price}>دج{price}</div>
            
        </div>
       <Link href="/products/dsasgh"> <Button>اضغط هنا للطلب</Button></Link>
    </div>
  )
}

export default Product