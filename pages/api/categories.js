import { Category } from "@/models/Category";

export default async function handler(req,res){
const {method} = req;
if(method === 'POST'){
    const {name , parentCategory} = req.body;
   const cat = await Category.create({name , parent:parentCategory})
   res.json(cat)
}
if(method === 'GET'){
    const resCat = await Category.find();
    res.json(resCat)
}
}