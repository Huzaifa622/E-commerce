import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req,res){
const {method} = req;
await mongooseConnect();
if(method === 'POST'){
    const {name , parentCategory ,properties} = req.body;
   const cat = await Category.create({name , parent: parentCategory || undefined  , properties})
   res.json(cat)
}
if(method === 'GET'){
    const resCat = await Category.find().populate('parent');
    res.json(resCat)
}
if(method === 'PUT'){
    const {name , parentCategory , _id , properties} = req.body;
    // console.log(_id)
    const putCat = await Category.updateOne({_id} , {name , parent : parentCategory|| undefined , properties})
    res.json(putCat)
}
if(method === 'DELETE'){
    const {_id} = req.query;
    console.log(_id)
     await Category.deleteOne({_id})
     res.json(true)
}
}