import AddNewProduct from "@/components/AddNewProduct";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const [info ,setInfo] = useState();
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setInfo(response.data);
      
    });
  }, [id]);
  return (
  <Layout>
    <h1 className="m-6 mt-6 mb-0">Edit Product</h1>
    {info && 
     <AddNewProduct {...info}/>}
     </Layout>
  );
}
