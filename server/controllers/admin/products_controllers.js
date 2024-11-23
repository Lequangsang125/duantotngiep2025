import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";
export const handelImageUppload = async (req, res) => {
  try {
    // Chuyển đổi dữ liệu file trong req.file.buffer (Buffer) thành chuỗi Base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    // Tạo URL Base64 kết hợp MIME type của file (ví dụ: image/jpeg) với chuỗi Base64 đã mã hóa
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    // Gọi hàm `imageUploadUtil` để upload file bằng URL Base64 vừa tạo, kết quả được lưu trong `result`
    const result = await imageUploadUtil(url);
    // Nếu upload thành công, trả về phản hồi JSON chứa thông tin ảnh
    res.json({
      success: true, // Đánh dấu upload thành công
      result, // Trả về kết quả từ `imageUploadUtil` (thông tin ảnh đã upload)
    });
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình trên
    console.log(error); // Ghi log lỗi ra console để kiểm tra
    // Trả về phản hồi JSON thông báo lỗi
    res.json({
      success: false, // Đánh dấu upload thất bại
      message: error.message, // Thông báo lỗi cho client
    });
  }
};
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    const savedProduct = await newCreatedProduct.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
    });
  } catch (e) {
    console.log(e);

    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "co loi ",
    });
  }
};
//  lay san pham

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
    });
  }
};
// lay san pham theo id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "ko tim thay san pham",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "co loi ",
    });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "ko tim thay san pham",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "co loi",
    });
  }
};
// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedProduct = await Product.findByIdAndDelete(id); // Xóa sản phẩm theo ID

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "khong tim thay san pham",
      });
    }

    res.status(200).json({
      success: true,
      message: "xoa san pham thanh cong",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "co loi ",
    });
  }
};