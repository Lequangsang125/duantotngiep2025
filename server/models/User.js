import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Tên người dùng là bắt buộc"],
    unique: true,
    minlength: [3, "Tên người dùng phải có ít nhất 3 ký tự"],
    maxlength: [30, "Tên người dùng không được vượt quá 30 ký tự"],
  },
  email: {
    type: String,
    required: [true, "Email là bắt buộc"],
    unique: true,
    // Custom validator cho định dạng email
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không đúng định dạng"],
  },
  password: {
    type: String,
    required: [true, "Mật khẩu là bắt buộc"],
    minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Chỉ cho phép giá trị "user" hoặc "admin"
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
