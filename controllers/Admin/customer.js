import { getTenantModel } from "../../middlewares/admindb.js";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";

export const createCustomer = catchAsyncErrors(async (req, res, next) => {
  let tenantId = req.query.tenantId;
  let tenantModel = await getTenantModel();
  console.log(tenantModel);
  const tenant = new tenantModel({ id: tenantId, name: tenantId });
  let doc = await tenantModel.findOneAndUpdate(
    { id: tenantId },
    { id: tenantId, name: tenantId }
  );
  if (!doc) {
    tenant.save(function (err) {
      // if (err) return handleError(err);
      // saved!
    });
  }

  res.send(JSON.stringify(tenant));
});
