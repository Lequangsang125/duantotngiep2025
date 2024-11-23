import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "URL hình ảnh là bắt buộc"],
    },
    title: {
      type: String,
      required: [true, "Tên sản phẩm là bắt buộc"],
      minlength: [3, "Tên sản phẩm phải có ít nhất 3 ký tự"],
      maxlength: [100, "Tên sản phẩm không được vượt quá 100 ký tự"],
    },
    description: {
      type: String,
      required: [true, "Mô tả là bắt buộc"],
      maxlength: [1000, "Mô tả không được vượt quá 1000 ký tự"],
    },
    category: {
      type: String,
      required: [true, "Danh mục là bắt buộc"],
    },
    brand: {
      type: String,
      required: [true, "Thương hiệu là bắt buộc"],
    },
    price: {
      type: Number,
      required: [true, "Giá sản phẩm là bắt buộc"],
      min: [0, "Giá phải lớn hơn hoặc bằng 0"],
    },
    salePrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "Giá khuyến mãi phải nhỏ hơn giá gốc",
      },
    },
    totalStock: {
      type: Number,
      required: [true, "Số lượng tồn kho là bắt buộc"],
      min: [0, "Tồn kho phải lớn hơn hoặc bằng 0"],
    },
    averageReview: {
      type: Number,
      min: [0, "Đánh giá trung bình phải lớn hơn hoặc bằng 0"],
      max: [5, "Đánh giá trung bình không được vượt quá 5"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
