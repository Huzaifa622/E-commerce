import { Category } from "@/models/Category";
import { storage } from "@/utils/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { GridLoader } from "react-spinners";
const AddNewProduct = ({
  _id,
  title: existingTitle,
  price: existingPrice,
  description: existingDescription,
  category: existingCategory,
  images: existingImages,
  properties : existingProperties
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);
  const [productProperties, setProductProperties] = useState( existingProperties||{});
  const [category, setCategory] = useState(existingCategory || "");
  const [prevPage, setPrevPage] = useState(false);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
     axios.get("/api/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data)
    
    })
  }, []);
  const saveProduct = async (e) => {
    e.preventDefault();
    console.log(category)
    const data = { title, price, description, category, images , properties:productProperties };
    console.log(data);
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setPrevPage(true);
  };

  if (prevPage == true) {
    router.push("/products");
  }
  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // const photo = uploadImage(file)
    // if (files?.length > 0) {
    //   const data = new FormData();
    //   for (const file of files) {
    //     data.append("file", file);
    //   }
    //   const res = await axios.post("/api/upload", data);
    //   setImages((prevImages) => {
    //     return [...prevImages, ...res.data.links];
    //   });
    //   console.log(res.data)
    //   console.log(images.length)
    //   console.log(images)
    // }

    setIsLoading(true);
    const storageRef = ref(storage, "userImages/" + file.name);
    await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    //  return downloadURL
    setImages((prevImages) => {
      return [...prevImages, downloadURL];
    });

    setIsLoading(false);
  };
  const updateImagesOrder = (images) => {
    setImages(images);
  };

  // const fetchCategories = async () => {
  //   await axios.get("/api/categories").then((response) => {
  //     setCategories(response.data);
  //   });
  // };
 const setProductProp = (prodName , value) =>{
 setProductProperties(prev =>{
  const newProductProperties = {...prev};
  newProductProperties[prodName] = value;
  return newProductProperties
 })
 }
  const fillProperty = [];
  if (!!categories && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    console.log(catInfo?.parent)
      if(catInfo && catInfo.properties){

        fillProperty.push(...catInfo?.properties);
      }
    while(catInfo?.parent?._id){
      const parentCat = categories.find(({_id})=>(_id === catInfo?.parent?._id))
      fillProperty.push(...parentCat?.properties)
      catInfo = parentCat;
    }
  }
  return (
    <div className="flex justify-center items-center h-full m-6">
      <form onSubmit={saveProduct} className="w-full flex flex-col">
        <h3>Title</h3>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Category</h3>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {!!categories &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
        </select>
        {!!fillProperty && fillProperty.map((p) => (
    <div className="flex gap-1 ">   
     <div>{p.name}</div>
        <select
        value={productProperties[p.name]}
        onChange={(e)=>setProductProp(p.name , e.target.value)}>
          {p.values.map((v)=>(
            <option  value={v}>{v}</option>

          ))}
        </select>
        </div>        ))}
        <h3>Photos </h3>
        <div className="flex gap-2 my-2 flex-wrap">
          <ReactSortable
            className="flex flex-wrap gap-1"
            list={images}
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images?.map((link) => (
                <div className="flex h-24" key={link}>
                  <img className="max-h-full rounded-md" src={link} alt="" />
                </div>
              ))}
          </ReactSortable>
          {loading && (
            <div className="flex justify-center items-center p-4 ">
              <GridLoader size={10} color="gray" />
            </div>
          )}
          <label className="hover:scale-90 w-[6rem] h-[6rem] flex justify-center items-center rounded-sm cursor-pointer text-slate-400 bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
            <input type="file" className="hidden" onChange={handleImage} />
          </label>
        </div>
        <div>{!images?.length && <div>No photos</div>}</div>
        <h3>Price</h3>
        <input
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <h3>Description</h3>
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-slate-600 w-52 h-10 rounded-lg text-white"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default AddNewProduct;
