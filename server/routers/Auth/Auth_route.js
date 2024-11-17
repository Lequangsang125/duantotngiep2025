import express from "express";
import { Signup,Signin, Logout, ResetsPage } from "../../controllers/auth/auth_controller.js";
const router = express.Router();
router.post("/signup", Signup);
router.post("/signin",Signin)
router.post("/logout",Logout);
router.get('/check-auth',ResetsPage,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:'da xac thuc nguoi dung',
        user
    })
})
export { router };
