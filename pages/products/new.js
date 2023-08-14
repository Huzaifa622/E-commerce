import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NewProduct = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [prevPage, setPrevPage] = useState(false);
  const addProduct = async (e) => {
    e.preventDefault();
    const data = { title, price, description };
    await axios.post("/api/products", data);
    setPrevPage(true);
  };

  if (prevPage == true) {
    router.push("/products");
  }
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={addProduct} className="w-full flex flex-col">
          <h1 className="m-7 ml-0 mr-0">Add Product</h1>

          <h3>Title</h3>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
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
    </Layout>
  );
};

export default NewProduct;
