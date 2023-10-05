import Layout from '@/components/Layout'
import axios from 'axios';
import React, { useState } from 'react'

const categories = () => {
  const [name , setName] = useState('');
  const handleNewCategory = async(e) =>{
    e.preventDefault();
    await axios.post("/api/categories" , {name})
    setName('');
  }
  return (
    <Layout>
      <h1 className='p-4'>Categories</h1>
      <div className="flex flex-col justify-start items-start h-full m-6">
        <h3>Add new Category</h3>
        <form onSubmit={handleNewCategory} className="w-full flex flex-col">
          <input type='text' required placeholder='Category name' onChange={e => setName(e.target.value)} />
          <button type='submit' className="bg-slate-600 w-52 h-10 rounded-lg text-white">Save</button>
        </form>
        </div>

    </Layout>
  )
}

export default categories