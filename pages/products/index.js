import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const Products = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
   fetchProducts();
  }, []);
  const fetchProducts = async() =>{
    await axios.get("/api/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }

  const deleteProduct = (product) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      text: `Are you sure that you want to Delete "${product.title}"?`,
      buttons: ["Cancel", "Yes Delete!!"],
    }).then(async (result) => {
      console.log(result);
      if (result) {
        const { _id } = product;
        await axios.delete('/api/products?id='+_id);
        swal("Category has been deleted!", {
          icon: "success",
        });
        fetchProducts();
      }
    });
  };
  return (
    <Layout>
    
      <div className="m-3 mt-6 text-center ">
        <Link
          className="bg-violet-300 hover:bg-violet-400 drop-shadow-lg  text-violet-700 p-3 rounded-sm "
          href={"/products/new"}
        >
          Add Products
        </Link>
      </div>

      <table className="border m-12 overflow-hidden drop-shadow-2xl">
        <thead className="">
          <tr>
            <td className="p-4 text-slate-400 bg-slate-50 pb-4 rounded-sm  font-bold "><h1 className="text-base">PRODUCTS</h1></td> 
            </tr>
        </thead>
        <tbody className=" ">
          <tr className="  ">
            {products &&
              products.map((product) => {
                return (
                  <tr className="border bg-white ">
                    <td className="w-full px-2 ">{product.title}</td>
                    <td className="flex justify-between" key={product._id}>
                   <Link className="flex p-2 py-1 m-2 rounded-sm items-center text-black bg-slate-50 hover:bg-slate-200 border border-1 border-black" href={'/products/edit/'+product._id}>
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

                      Edit</Link>
                      <div className="flex p-2 pt-1 pb-1 m-2 rounded-sm items-center  hover:bg-red-400  text-red-800 bg-red-200 cursor-pointer" onClick={()=>deleteProduct(product)}>
                      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                        Delete</div>
                      </td>  </tr>
                );
              })}
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
