// import { models } from "mongoose";

import mongoose, { Schema, model } from "mongoose";
import { models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId , ref: 'Category'},
  properties : [{type : Object}]
});

export const Category = models?.Category || model("Category", CategorySchema);
