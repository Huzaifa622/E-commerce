import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const categories = () => {
  const [name, setName] = useState("");
  const [edittedCategory, setEdittedCategory] = useState(null);

  const [categories, setCategories] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleNewCategory = async (e) => {
    e.preventDefault();
    // console.log(parentCategory)
    if(edittedCategory){
      const _id = edittedCategory._id;
      // console.log(_id)
      if(parentCategory){
      await axios.put('/api/categories' , { _id,name , parentCategory }  )
      setName("");
      setParentCategory("");
      setEdittedCategory(null)
      fetchCategories();
      }else{
        await axios.put('/api/categories' , { _id,name }  )
      setName("");
      setParentCategory("");
      setEdittedCategory(null)
      fetchCategories();
      }
    }else{
    if (parentCategory) {
      await axios.post("/api/categories", { name, parentCategory });
      setName("");
      setParentCategory("");
      fetchCategories();
    } else {
      await axios.post("/api/categories", { name });
      setName("");
      setParentCategory("");
      fetchCategories();
    }
    }
  };

  const editCategory = (category) => {
    setEdittedCategory(category);
    setName(category.name);
    if (category.parent) {
      setParentCategory(category?.parent._id);
    } else {
      setParentCategory("");
    }
  };

  const deleteCategory = (category) =>{
    swal({
      title: "Are you sure?",
      icon: "warning",
      text: `Are you sure that you want to Delete ${category.name}?`,
      buttons:[ 'Cancel','Yes Delete!!'],
    }).then(async (result) => {
      console.log(result)
      if(result){
        
        const {_id} = category;
       await axios.delete('/api/categories?_id=' + _id);
       swal("Category has been deleted!", {
        icon: "success",
      });
       fetchCategories();
      }
    })
  }
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
        <h3>
          {edittedCategory
            ? `Edit category ${edittedCategory.name}`
            : "Add new Category"}
        </h3>
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
              <option value="">No parent caetgory</option>

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
                <tr className="border flex justify-between items-center">
                  <tr>
                    <td>{category.name}</td>
                  </tr>
                  <tr>
                    <td>{category?.parent?.name}</td>
                  </tr>
                  <tr className="flex justify-between m-2 w-[10rem]">
                    <td className="text-white bg-slate-600 p-3 py-1 mx-2 rounded-lg">
                      {" "}
                      <button onClick={() => editCategory(category)}>
                        edit
                      </button>
                    </td>
                    <td className="text-white bg-slate-600 p-3 py-1 mx-2 rounded-lg">
                      <button onClick={()=>deleteCategory(category)}>delete</button>
                    </td>
                  </tr>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default categories;
