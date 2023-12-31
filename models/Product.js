const { Schema, model, models, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    images: [{ type: String }],
    properties: { type: Object },
  },
  { timestamps: true }
);

export const Product = models?.Product || model("Product", productSchema);
