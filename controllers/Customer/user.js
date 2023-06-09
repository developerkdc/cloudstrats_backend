import { getCustomerModel } from "../../middlewares/admindb.js";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";
import { getUserModelCustomer } from "../../middlewares/customerdb.js";

export const createUser = catchAsyncErrors(async (req, res, next) => {
  let customerId = req.query.customerId;
  let customerModel = await getCustomerModel();
  let customer = await customerModel.findOne({ id: customerId });
  if (!customer) res.sendStatus(404); // customer not found. Register customer

  let UserModel = await getUserModelCustomer(customerId);
  let user = new UserModel(req.body);

  await user.save();
  user.password = undefined;
  res.json(user);
});

export const getUser = catchAsyncErrors(async(req,res,next) =>{
  const customerId = req.query.customerId
  const UserModel = await getUserModelCustomer(customerId);
  const data = await UserModel.find()
  res.json(data)
})
