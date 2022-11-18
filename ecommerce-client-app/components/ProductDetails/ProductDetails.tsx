import Input from '../Input/Input'
import styles from './ProductDetails.module.css'
//@ts-ignore
import ImageGallery from 'react-image-gallery';
import Button from '../Button/Button';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import {BiNotepad} from 'react-icons/bi'
import {BsCheck} from 'react-icons/bs'
import { useState } from 'react';
import Select from 'react-select';


const wilayas =[
    'بجاية 06',
    'شلف 02',
    'ادرار 01',
    'بليدة 09'
]
interface PropType{
    title:string;
    description:string;
    price:number;
    images:string[];
    colors:{name:string, code:string}[];

}
const ProductDetails = ({title,colors,description,images:imgs,price}:PropType) => {
    
    const [quantity,setQuantity] = useState(0);
    const [selectedColor,setSelectedColor] = useState(0)
    const images = imgs.map(img=>{
        return {
            original: img,
            thumbnail: img,
            originalWidth:"100%",
            originalHeight:"100%"
        }
    })
    
 
  return (
    <div className={styles.container}>
     
       <div className={styles.left}>
            <div className={styles.title}>مصباح على شكل كاميرا مراقبة</div>
            <div className={styles.description}>تشحن بالطاقة الشمسية </div>
            <div className={styles.price}>دج{3500}</div>

            <div className={styles.note}>
               <span> للطلب أدخل معلوماتك في الخانات أسفله، أو إتصل بنا عبر الهاتف  0798872905</span>
                <BiNotepad/>
            </div>
            <div className={styles.stackedInputs}>
                
                <Input placeholder='الاسم'/>
                <Input placeholder='رقم الهاتف'/>
                <Input placeholder='العنوان'/>
                {/* <Input placeholder='الولاية'/> */}
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={{label:wilayas[0],value:wilayas[0]}}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={true}
                    isSearchable={false}
                    name="color"
                    options={wilayas.map(el=>({label:el,value:el}))}
                    />
            </div>


            <div className={styles.requestRecap}>
                <div className={styles.recapElement}>
                    <span>دج{700*quantity} {quantity > 0 &&<span className={styles.byAmountLabel}>x{quantity}</span>}</span>
                    <span>سعر المنتوج</span>
                </div>
                <div className={styles.recapElement}>
                    <span>دج700</span>
                    <span>سعر التوصيل</span>
                </div>
                <div className={styles.recapElement}>
                    <span style={{color:"var(--primary)"}}>دج700 </span>
                    <span >السعر الاجمالي</span>
                </div>
            </div>
            <div className={styles.actionButtons}>
                <Button className={styles.buttonTalab}>اظغط للطلب</Button>
                <QuantitySelector 
                    quantity={quantity}  
                    incQuantity={()=>setQuantity(q=>q+1)} 
                    decQuantity  = {()=>setQuantity(q=>q === 0 ?0:q-1)}
                />
            </div>

       </div>
       <div className={styles.right}>
            <div className={styles.carouselContainer}><ImageGallery showNav={false} items={images}/></div>
            <div className={styles.colorsContainer}>
                {
                    colors.map(((color,index)=>{
                        return <div onClick={()=>setSelectedColor(index)} style={{backgroundColor:color.code}} className={styles.color}>{selectedColor ===index &&<BsCheck style={{color:color.code === "white" ?"black":"white",fontSize:"24px"}}/>}</div>
                    })) 
                }
               
            </div>
       </div>
       
    
    </div>
  )
}

export default ProductDetails