import { getUserModelAdmin } from "../../middlewares/admindb.js";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";
import Errorhandler from "../../utils/errorHandler.js";

export const addUser = catchAsyncErrors(async (req, res, next) => {
  const UserModel = await getUserModelAdmin();

  let user = new UserModel(req.body);

  await user.save();
  user.password = undefined;
  res.json(user);
});

export const getUser = catchAsyncErrors(async(req,res,next) =>{
    const UserModel = await getUserModelAdmin();
    const data = await UserModel.find()
    res.json(data)
})

// export const deleteUser = catchAsyncErrors(async(req,res,next)=>{
//     const UserModel = await getUserModelAdmin();
// })
