import bcrypt from "bcrypt";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

const Signup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res
        .status(400)
        .json({ success: false, message: "Người dùng đã tồn tại" });

    const hashpass = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashpass,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: false,
      message: "Đã xảy ra lỗi",
      error: error.message,
    });
  }
};

const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "user khong chinh sac",
      });
    const checkpass = await bcrypt.compare(password, checkUser.password);
    if (!checkpass) {
      return res.json({
        success: false,
        message: "khong dung pass",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      // khoa bi mat de ma hoa token
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );
    // httpOnly: true: Thiết lập thuộc tính HttpOnly cho cookie. Điều này có
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "da dang xuat",
  });
};
const ResetsPage = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: " het quyen truy cap ",
    });
  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "het quyen truy cap ",
    });
  }
};

export { Signup, Signin, Logout, ResetsPage };
