import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DeleteProduct = () => {
    const [prevPage , setPrevPage] = useState(false);
    const [info , setInfo] = useState();
    const router = useRouter();
    const { id } = router.query;
    console.log(router.query)
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get("/api/products?id=" + id).then((response) => {
        console.log(response.data);
        setInfo(response.data)
        
      });
    }, [id]);
    const deleteProduct = async  (e) =>{

    e.preventDefault();
    await axios.delete('/api/products?id='+id);
      setPrevPage(true);
   }
   if(prevPage){
    router.push('/products');
   }
  return (
    <Layout>
    <div className='flex flex-col justify-center w-full items-center'>
     <h1>Do you really want to delete <span>'{info?.title}'</span>?</h1>
      <div className='flex justify-between'>
        <button className='bg-slate-600 text-white p-10 pt-2 pb-2 m-4 rounded-lg' onClick={deleteProduct}>Yes</button>
        <button className='bg-slate-600 text-white p-10 pt-2 pb-2 m-4 rounded-lg' onClick={()=>setPrevPage(true)}>No</button>
      </div>
    </div>
    </Layout>
  )
}

export default DeleteProduct