import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminReq } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminReq(req,res);
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  if (method === "POST") {
    const { title, price, description, parentCategory,images , properties } = req.body;
    const productDoc = await Product.create({
      title,
      price,
      description,
      category:parentCategory,
      images,
      properties
    });
    res.json(productDoc);
  }
  if (method === "PUT") {
    const { title, price, description, _id, images , parentCategory , properties } = req.body;
    // console.log(req.body)
    await Product.updateOne({ _id }, { title, price, description, category:parentCategory ,images , properties });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
