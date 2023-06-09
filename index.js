import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import { getCustomerModel, getUserModelAdmin } from "./middlewares/admindb.js";
import { getUserModelCustomer } from "./middlewares/customerdb.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import customerRoutes from "./routes/admin/customerRoutes.js";
import userRoutes from "./routes/customer/userRoutes.js";
import individualDossierRoutes from "./routes/customer/individualDossierRoutes.js";
import organizationDossierRoutes from "./routes/customer/organizationDossierRoutes.js";
import jailProformaRoutes from "./routes/customer/jailProformaRoutes.js";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const port = 3000;

app.use("/cloudstrat/user", adminUserRoutes); // login , register , delete , update , logout
app.use("/cloudstrat/customer", customerRoutes); // create,update,list,delete

app.use("/user", userRoutes); // login , register , delete , update , logout
app.use("/individual-dossier", individualDossierRoutes); // crud
app.use("/organization-dossier", organizationDossierRoutes); // crud
app.use("/jailproforma", jailProformaRoutes); // crud

app.get("/customer", async (req, res) => {
  let customerId = req.query.customerId;
  let customerModel = await getCustomerModel();
  console.log(customerModel);
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

app.get("/customerUser", async (req, res) => {
  let customerId = req.query.customerId;
  let userName = req.query.name;
  let customerModel = await getCustomerModel();
  let customer = await customerModel.findOne({ id: customerId });
  if (!customer) res.sendStatus(404); // customer not found. Register customer
  let UserModel = await getUserModelCustomer(customerId);
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
//     let customerId = req.query.customerId;
//     let customerName = req.query.customer;
//     let customerModel = await getCustomerModel();
//     let customer = await customerModel.findOne({ id: customerId })
//     if (!customer)
//         res.sendStatus(404) // customer not found. Register customer
//     let customerModel = await getCustomerModel(customerId);
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
  let customerId = req.query.customerId;
  let userModel = await getUserModelCustomer(customerId);
  const data = await userModel.find();
  res.send(data);
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`listening ${port}`);
});

//I am going to add/register two customers.
//Now I am goint to add customer for each customer.
