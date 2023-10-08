import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req,res){
const {method} = req;
await mongooseConnect();
if(method === 'POST'){
    const {name , parentCategory} = req.body;
   const cat = await Category.create({name , parent: parentCategory})
   res.json(cat)
}
if(method === 'GET'){
    const resCat = await Category.find().populate('parent');
    res.json(resCat)
}
if(method === 'PUT'){
    const {name , parentCategory , _id} = req.body;
    // console.log(_id)
    const putCat = await Category.updateOne({_id} , {name , parent : parentCategory})
    res.json(putCat)
}
if(method === 'DELETE'){
    const {_id} = req.query;
    console.log(_id)
     await Category.deleteOne({_id})
     res.json(true)
}
}