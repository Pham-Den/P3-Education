import { useRef, useState } from "react";

import styles from "./AddProductForm.module.css";
import { ApiProduct } from "../../utils/API";

const AddProductForm = () => {
  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const shortDescriptionRef = useRef();
  const longDescriptionRef = useRef();
  const imageRef = useRef();

  const [messageError, setMessageError] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);
  const [categoryIsValid, setCategoryIsValid] = useState(true);
  const [priceIsValid, setPriceIsValid] = useState(true);
  const [shortIsValid, setShortIsValid] = useState(true);
  const [longIsValid, setLongIsValid] = useState(true);
  const [imageIsValid, setImageIsValid] = useState(true);
  const [imageData, setImageData] = useState([]);

  const imageUpdateHandle = (e) => {
    setImageData(imageRef.current.files);
    //Object.values(e.target.files)
    console.log(imageData);
  };

  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      //validation data
      const data = {
        name: nameRef.current.value.trim(),
        category: categoryRef.current.value.trim(),
        price: priceRef.current.value,
        short_desc: shortDescriptionRef.current.value.trim(),
        long_desc: longDescriptionRef.current.value.trim(),
        files: imageRef.current.files,
      };

      if (!data.name) {
        setNameIsValid(false);
        setMessageError("Please enter name product!");
        return;
      } else {
        setNameIsValid(true);
      }
      if (!data.category) {
        setCategoryIsValid(false);
        setMessageError("Please enter category!");
        return;
      } else {
        setCategoryIsValid(true);
      }
      if (!data.price) {
        setPriceIsValid(false);
        setMessageError("Please enter price!");
        return;
      } else {
        setPriceIsValid(true);
      }
      if (!data.short_desc) {
        setShortIsValid(false);
        setMessageError("Please enter short description!");
        return;
      } else {
        setShortIsValid(true);
      }
      if (!data.long_desc) {
        setLongIsValid(false);
        setMessageError("Please enter long description!");
        return;
      } else {
        setLongIsValid(true);
      }
      if (data.files.length !== 5) {
        setImageIsValid(false);
        setMessageError("Please upload 5 photos!");
        return;
      } else {
        setImageIsValid(true);
        setMessageError("");
      }

      //vì gửi api có image - nên setup khác
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("short_desc", data.short_desc);
      formData.append("long_desc", data.long_desc);
      for (let i = 0; i < imageData.length; i++) {
        formData.append("image", imageData[i]);
      }

      // console.log(formData.getAll());
      // console.log(Object.values(imageRef.current.files) )
      /////////////////valid ok////////////////////
      const response = await fetch(ApiProduct.apiAddProduct, {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.containers} onSubmit={submitHandle}>
      <div className={styles.container}>
        <label htmlFor="name">Product Name</label>
        <input
          name="name"
          className={!nameIsValid ? styles["no-valid"] : ""}
          type="text"
          id="name"
          placeholder="Enter Product Name"
          ref={nameRef}
        ></input>
      </div>
      <div className={styles.container}>
        <label htmlFor="category">Category</label>
        <input
          className={!categoryIsValid ? styles["no-valid"] : ""}
          type="text"
          id="category"
          placeholder="Enter Category"
          ref={categoryRef}
        ></input>
      </div>
      <div className={styles.container}>
        <label htmlFor="category">Price</label>
        <input
          className={!priceIsValid ? styles["no-valid"] : ""}
          type="number"
          id="price"
          placeholder="Enter Price"
          min="1"
          ref={priceRef}
        ></input>
      </div>
      <div className={styles.container}>
        <label htmlFor="shortdescription">Short Description</label>
        <textarea
          className={`${styles.shortdescription} ${
            !shortIsValid ? styles["no-valid"] : ""
          }`}
          type="text"
          id="shortdescription"
          placeholder="Enter Short Description"
          ref={shortDescriptionRef}
        ></textarea>
      </div>
      <div className={styles.container}>
        <label htmlFor="longdescription">Long Description</label>
        <textarea
          className={`${styles.longdescription} ${
            !longIsValid ? styles["no-valid"] : ""
          }`}
          type="text"
          id="longdescription"
          placeholder="Enter Long Description"
          ref={longDescriptionRef}
        ></textarea>
      </div>
      <div className={styles.container}>
        <div>Upload image (5 images)</div>
        <input
          className={styles.file}
          type="file"
          id="image"
          placeholder="Enter Long Description"
          multiple
          accept="image/png, image/jpeg"
          ref={imageRef}
          onChange={imageUpdateHandle}
        ></input>
      </div>
      {/* hiện các file đã add */}
      {/* {imageData && imageData.length > 1 ? <p>{imageData.name}</p> : ""} */}
      {messageError && (
        <div className={styles["message-error"]}>{messageError}</div>
      )}
      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default AddProductForm;
