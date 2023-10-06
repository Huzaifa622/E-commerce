import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleNewCategory = async (e) => {
    e.preventDefault();
    // console.log(parentCategory)
    if(parentCategory){
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    setParentCategory('')
    fetchCategories();
    }else{
      await axios.post("/api/categories", { name});
      setName("");
      setParentCategory('')
      fetchCategories();
    }
  };

  const fetchCategories = async () => {
    await axios.get("/api/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  };
  return (
    <Layout>
      <h1 className="p-4">Categories</h1>
      <div className="flex flex-col justify-start items-start h-full m-6">
        <h3>Add new Category</h3>
        <form onSubmit={handleNewCategory} className="w-full flex flex-col">
          <div className="flex justify-between">
            <input
              className="w-[70%]"
              type="text"
              required
              value={name}
              placeholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
            <select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="w-[20%] bg-slate-100 "
            >
              <option value=''>No parent caetgory</option>

              {!!categories &&
                categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-600 w-52 h-10 rounded-lg text-white"
          >
            Save
          </button>
        </form>
      </div>
      <table className="border m-12 overflow-hidden">
        <thead className="border">
          <tr>
            <td className="p-4 text-white bg-slate-600 pb-4 rounded-lg">
              <h1>Category Name</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          {!!categories &&
            categories.map((category) => {
              return (
                <tr className="border">
                  <td>{category.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default categories;
