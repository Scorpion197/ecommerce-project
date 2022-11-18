import Product from '../Layout/Product/Product'
import styles from './Products.module.css'

const Products = () => {
    const products = new Array(30).fill(0).map((_,index)=>{
        return {
            id:index,
            title:"حقيبة يد فخمة للسفر و الرياضة (لون بني)",
            price:3500
        }
    })
  return (
    <div className={styles.container}>
        {
            products.map((p)=>{
                return (
                    <Product
                        key={p.id}
                        title={p.title}
                        price={p.price}

                    />
                )
            })
        }
    </div>
  )
}

export default Products