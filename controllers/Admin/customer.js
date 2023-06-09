import { getCustomerModel } from "../../middlewares/admindb.js";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";

export const createCustomer = catchAsyncErrors(async (req, res, next) => {
  let customerId = req.query.customerId;
  let customerModel = await getCustomerModel();
  const customer = new customerModel({ id: customerId, name: customerId });
  let doc = await customerModel.findOneAndUpdate(
    { id: customerId },
    { id: customerId, name: customerId }
  );
  if (!doc) {
    customer.save(function (err) {
      // if (err) return handleError(err);
      // saved!
    });
  }

  res.send(JSON.stringify(customer));
});
