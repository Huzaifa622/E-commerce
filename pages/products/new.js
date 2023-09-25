import AddNewProduct from "@/components/AddNewProduct";
import Layout from "@/components/Layout";

import React, { useState } from "react";

const NewProduct = () => {
 return(
  <Layout>
    <h1 className="m-6 mt-6 mb-0">Add Product</h1>
  <AddNewProduct/>
  </Layout>
 )
 }

export default NewProduct;
