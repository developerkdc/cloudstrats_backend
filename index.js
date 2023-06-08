import express from "express";
import { getTenantModel, getUserModelAdmin } from "./middlewares/admindb.js";
import { getUserModelTenant } from "./middlewares/tenantdb.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import customerRoutes from "./routes/admin/customerRoutes.js";
import userRoutes from "./routes/Tenant/userRoutes.js";
import individualDossierRoutes from "./routes/Tenant/individualDossierRoutes.js";
import organizationDossierRoutes from "./routes/Tenant/organizationDossierRoutes.js";
import jailProformaRoutes from "./routes/Tenant/jailProformaRoutes.js";
const app = express();
const port = 3000;

app.use("/cloudstrat/user", adminUserRoutes); // login , register , delete , update , logout
app.use("/cloudstrat/customer", customerRoutes); // create,update,list,delete

app.use("/user", userRoutes); // login , register , delete , update , logout
app.use("/individual-dossier", individualDossierRoutes); // crud
app.use("/organization-dossier", organizationDossierRoutes); // crud
app.use("/jailproforma", jailProformaRoutes); // crud

app.get("/tenant", async (req, res) => {
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

app.get("/adminUser", async (req, res) => {
  const userName = req.query.name;
  const UserModel = await getUserModelAdmin();

  // Check if the user already exists
  let user = await UserModel.findOne({ name: userName });

  if (!user) {
    // User doesn't exist, create a new one
    user = new UserModel({ name: userName });

    // Save the user
    user.save(function (err) {
      if (err) {
        // Handle the error appropriately
        console.error(err);
        return res.status(500).json({ error: "Failed to save user" });
      }

      // User saved successfully
      res.send(JSON.stringify(user));
    });
  } else {
    // User already exists
    res.send(JSON.stringify(user));
  }
});

app.get("/tenantUser", async (req, res) => {
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
});

// app.get('/customer', async (req, res) => {
//     let tenantId = req.query.tenantId;
//     let customerName = req.query.customer;
//     let tenantModel = await getTenantModel();
//     let tenant = await tenantModel.findOne({ id: tenantId })
//     if (!tenant)
//         res.sendStatus(404) // tenant not found. Register tenant
//     let customerModel = await getCustomerModel(tenantId);
//     const customer = new customerModel({ customerName });
//     let doc = await customerModel.findOneAndUpdate({ customerName }, { customerName });
//     if (!doc) {
//         customer.save(function (err) {
//             // if (err) return handleError(err);
//             // saved!
//         });
//     }

//     res.send(JSON.stringify(customer))
// })

app.get("/userList", async (req, res) => {
  let tenantId = req.query.tenantId;
  let userModel = await getUserModelTenant(tenantId);
  const data = await userModel.find();
  res.send(data);
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});

//I am going to add/register two tenants.
//Now I am goint to add customer for each tenant.
