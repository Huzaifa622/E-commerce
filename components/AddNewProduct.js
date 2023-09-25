import Layout from "@/components/Layout";
import { storage } from "@/utils/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
const AddNewProduct = ({
  _id,
  title: existingTitle,
  price: existingPrice,
  description: existingDescription,
  images,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [prevPage, setPrevPage] = useState(false);
  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, price, description };
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
    const image = e.target.files[0];
    const storageRef = ref(storage, "productImages/" + image.name);
    await uploadBytes(storageRef, image);

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    // return downloadURL;
    console.log(downloadURL)
  };
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
        <h3>Photos </h3>
        <div>
          <label className="w-[6rem] h-[6rem] flex justify-center items-center rounded-sm cursor-pointer text-slate-400 bg-slate-300">
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
