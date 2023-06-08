import { getTenantModel } from "../../middlewares/admindb.js";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";
import { getUserModelTenant } from "../../middlewares/tenantdb.js";

export const createUser = catchAsyncErrors(async(req,res,next)=>{
    let tenantId = req.query.tenantId;
    let userName = req.query.name;
    let tenantModel = await getTenantModel();
    let tenant = await tenantModel.findOne({ id: tenantId });
    if (!tenant) res.sendStatus(404); // tenant not found. Register tenant
    let UserModel = await getUserModelTenant(tenantId);
    const user = new UserModel({ name: userName });
    let doc = await UserModel.findOneAndUpdate(
      { name: userName },
      { name: userName }
    );
    if (!doc) {
      user.save(function (err) {
        // if (err) return handleError(err);
        // saved!
      });
    }
  
    res.send(JSON.stringify(user));
})