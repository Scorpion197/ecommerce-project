import styles from './QuantitySelector.module.css'

interface PropType{
    quantity:number;
    incQuantity:()=>void;
    decQuantity:()=>void;

}
const QuantitySelector = ({quantity,decQuantity,incQuantity}:PropType) => {
  return (
    <div className={styles.container}>
                    <button className={styles.button}  onClick={()=>decQuantity()}>-</button>
                    <span>{quantity}</span>
                    <button className={styles.button} onClick={()=>incQuantity()}>+</button>
    </div>
  )
}

export default QuantitySelector