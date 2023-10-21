import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const categories = () => {
  const [name, setName] = useState("");
  const [edittedCategory, setEdittedCategory] = useState(null);

  const [categories, setCategories] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleNewCategory = async (e) => {
    e.preventDefault();
    // console.log(parentCategory)
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (edittedCategory) {
      data._id = edittedCategory._id;
      // console.log(_id)

      await axios.put("/api/categories", data);

      setEdittedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setProperties([]);
    setName("");
    setParentCategory("");
    fetchCategories();
  };

  const editCategory = (category) => {
    setEdittedCategory(category);
    setName(category.name);
      setParentCategory(category?.parent?._id);
    setProperties(category.properties.map(({name , values})=>({name , values: values.join(",")})))
  };

  const deleteCategory = (category) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      text: `Are you sure that you want to Delete "${category.name}"?`,
      buttons: ["Cancel", "Yes Delete!!"],
    }).then(async (result) => {
      console.log(result);
      if (result) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        swal("Category has been deleted!", {
          icon: "success",
        });
        fetchCategories();
      }
    });
  };
  const fetchCategories = async () => {
    await axios.get("/api/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  };
  const setProperty = () => {
    setProperties((prev) => [...prev, { name: "", values: "" }]);
  };
  const handlePropertyNameChange = (index, property, newName) => {
    // console.log(index , property , newName)
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValueChange = (index, property, newValue) => {
    // console.log(index , property , newName)
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  };
  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
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
              className="w-[70%] "
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
            {/* {!!categories && } */}
          </div>
          <div className="mb-2">
            <h3 className="">Properties</h3>
            <button
              className="bg-slate-100 w-52 h-10 rounded-sm text-slate-700 border border-1 drop-shadow-lg"
              type="button"
              onClick={setProperty}
            >
              Add Property
            </button>
            {properties &&
              properties.map((property, index) => (
                <div className="mt-2 flex gap-2 w-full">
                  <input
                    className="w-[40%]"
                    type="text"
                    value={property.name}
                    placeholder="property name"
                    onChange={(e) =>
                      handlePropertyNameChange(index, property, e.target.value)
                    }
                  ></input>
                  <input
                    className="w-[40%]"
                    type="text"
                    value={property.values}
                    placeholder="property value"
                    onChange={(e) =>
                      handlePropertyValueChange(index, property, e.target.value)
                    }
                  ></input>
                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="bg-violet-400 w-52 h-10 rounded-sm text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          {edittedCategory && (
            <div className="mb-2">
              <button
                type="button"
                className="bg-red-300 w-52 h-10 rounded-sm text-white"
                onClick={() => {
                  setEdittedCategory(null);
                  setName("");
                  setParentCategory("");
                  setProperties([])
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <button
            type="submit"
            className=" w-52 bg-violet-300 hover:bg-violet-400 drop-shadow-lg  text-violet-700 p-3 rounded-sm"
          >
            Save
          </button>
        </form>
      </div>
      {!edittedCategory && (
        <table className=" m-12 overflow-hidden drop-shadow-2xl">
          <thead className="border">
            <tr>
              <td className="p-4 text-slate-400 bg-slate-50 pb-4 rounded-sm">
                <h1 className="text-base font-bold">CATEGORY</h1>
              </td>
            </tr>
           
          </thead>
          <tbody>
            {!!categories &&
              categories.map((category) => {
                return (
                  <tr className=" bg-white flex justify-between items-center">
                    <tr>
                      <td className="px-2">{category.name}</td>
                    </tr>
                    <tr>
                      <td>{category?.parent?.name}</td>
                    </tr>
                    <tr className="flex justify-between m-2 w-[12rem]">
                      <td className="flex items-center p-2  m-2 rounded-sm text-black bg-slate-50 hover:bg-slate-200 border border-1 border-black">
                        {" "}
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
                        <button onClick={() => editCategory(category)}>
                          edit
                        </button>
                      </td>
                      <td className="flex items-center p-2 py-1 m-2 rounded-sm  hover:bg-red-400  text-red-800 bg-red-200 cursor-pointer">
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                        <button onClick={() => deleteCategory(category)}>
                          delete
                        </button>
                      </td>
                    </tr>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default categories;
