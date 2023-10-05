import { Category } from "@/models/Category";

export default async function handler(req,res){
const {method} = req;
if(method === 'POST'){
    const {name} = req.body;
   const cat = await Category.create({name})
   res.json(cat)
}
}