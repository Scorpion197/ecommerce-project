import { useRouter } from "next/router";
import Input from "../Input/Input";
import styles from "./ProductDetails.module.css";
//@ts-ignore
import ImageGallery from "react-image-gallery";
import Button from "../Button/Button";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { BiNotepad } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";

const wilayas = ["بجاية 06", "شلف 02", "ادرار 01", "بليدة 09"];
interface PropType {
  title: string;
  description: string;
  price: number;
  images: string[];
  colors: { name: string; code: string }[];
}
const ProductDetails = ({
  title,
  colors,
  description,
  images: imgs,
  price,
}: PropType) => {
  console.log(imgs);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const images = imgs.map((img) => {
    return {
      original: `http://localhost:8000/media/${img}`,
      thumbnail: `http://localhost:8000/media/${img}`,
      originalWidth: "100%",
      originalHeight: "100%",
    };
  });
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [payment, setPayment] = useState(0);
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmitOrder = async () => {
    const endpoint = "http://localhost:8000/orders/";
    const data = {
      client_fullname: name,
      status: "PENDING",
      wilaya: "tlemcen",
      client_phone: phone,
      address: address,
      product_id: router?.query?.productId,
      payment_amount: price * quantity,
    };

    console.log("Data to submit: ", data);
    axios
      .post(endpoint, data)
      .then((res) => {
        console.log("order created successfully");
      })
      .catch((err) => {
        console.log("Error while creating orders");
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>{title}</div>

        <div className={styles.price}>دج{price}</div>

        <div className={styles.note}>
          <span>
            {" "}
            للطلب أدخل معلوماتك في الخانات أسفله، أو إتصل بنا عبر الهاتف
            0798872905
          </span>
          <BiNotepad />
        </div>
        <div className={styles.stackedInputs}>
          <Input
            placeholder="الاسم"
            onChange={(event) => {
              event.preventDefault();
              setName(event.target.value);
            }}
          />
          <Input
            placeholder="رقم الهاتف"
            onChange={(event) => {
              event.preventDefault();
              setPhone(event.target.value);
            }}
          />
          <Input
            placeholder="العنوان"
            onChange={(event) => {
              event.preventDefault();
              setAddress(event.target.value);
            }}
          />
          {/* <Input placeholder='الولاية'/> */}
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={{ label: wilayas[0], value: wilayas[0] }}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={true}
            isSearchable={false}
            name="color"
            options={wilayas.map((el) => ({ label: el, value: el }))}
          />
        </div>

        <div className={styles.requestRecap}>
          <div className={styles.recapElement}>
            <span>
              دج{price * quantity}{" "}
              {quantity > 0 && (
                <span className={styles.byAmountLabel}>x{quantity}</span>
              )}
            </span>
            <span>سعر المنتوج</span>
          </div>
          <div className={styles.recapElement}>
            <span>دج700</span>
            <span>سعر التوصيل</span>
          </div>
          <div className={styles.recapElement}>
            <span style={{ color: "var(--primary)" }}>
              دج{price * quantity}{" "}
            </span>
            <span>السعر الاجمالي</span>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <Button
            className={styles.buttonTalab}
            onClick={(event) => {
              event.preventDefault();
              handleSubmitOrder();
            }}
          >
            اظغط للطلب
          </Button>
          <QuantitySelector
            quantity={quantity}
            incQuantity={() => setQuantity((q) => q + 1)}
            decQuantity={() => setQuantity((q) => (q === 0 ? 0 : q - 1))}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.carouselContainer}>
          <ImageGallery showNav={false} items={images} />
        </div>
        <div className={styles.colorsContainer}>
          {colors.map((color, index) => {
            return (
              <div
                onClick={() => setSelectedColor(index)}
                style={{ backgroundColor: color.code }}
                className={styles.color}
              >
                {selectedColor === index && (
                  <BsCheck
                    style={{
                      color: color.code === "white" ? "black" : "white",
                      fontSize: "24px",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
