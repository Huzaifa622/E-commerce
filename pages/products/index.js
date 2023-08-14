import Layout from '@/components/Layout'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Products = () => {
const [products , setProducts] = useState();
  useEffect(()=>{
    axios.get('/api/products').then(response =>{
      setProducts(response.data)
    })
  },[])
  return (
    <Layout>
      <div className='m-3'>
       <Link className='bg-slate-600 text-white p-3 rounded-lg h-full' href={'/products/new'}>Add Products</Link>
       </div>
    </Layout>
  )
}

export default Products