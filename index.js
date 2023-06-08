import express from "express";
const app = express()
const port = 3000

import { getTenantModel,getUserModelAdmin } from "./admindb.js";
import { getCustomerModel, getUserModelTenant } from "./tenantdb.js";

app.get('/tenant', async (req, res) => {
    let tenantId = req.query.tenantId;
    let tenantModel = await getTenantModel();
    console.log(tenantModel)
    const tenant = new tenantModel({ id: tenantId, name: tenantId });
    let doc = await tenantModel.findOneAndUpdate({ id: tenantId }, { id: tenantId, name: tenantId });
    if (!doc) {
        tenant.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }

    res.send(JSON.stringify(tenant))
})

app.get('/adminUser', async (req, res) => {
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
          return res.status(500).json({ error: 'Failed to save user' });
        }
  
        // User saved successfully
        res.send(JSON.stringify(user));
      });
    } else {
      // User already exists
      res.send(JSON.stringify(user));
    }
  });
  

app.get('/tenantUser', async (req, res) => {
    let tenantId = req.query.tenantId;
    let userName = req.query.name;
    let tenantModel = await getTenantModel();
    let tenant = await tenantModel.findOne({ id: tenantId })
    if (!tenant)
        res.sendStatus(404) // tenant not found. Register tenant
    let UserModel = await getUserModelTenant(tenantId);
    const user = new UserModel({ name: userName });
    let doc = await UserModel.findOneAndUpdate({ name: userName }, { name: userName });
    if (!doc) {
        user.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }

    res.send(JSON.stringify(user))
})

app.get('/customer', async (req, res) => {
    let tenantId = req.query.tenantId;
    let customerName = req.query.customer;
    let tenantModel = await getTenantModel();
    let tenant = await tenantModel.findOne({ id: tenantId })
    if (!tenant)
        res.sendStatus(404) // tenant not found. Register tenant
    let customerModel = await getCustomerModel(tenantId);
    const customer = new customerModel({ customerName });
    let doc = await customerModel.findOneAndUpdate({ customerName }, { customerName });
    if (!doc) {
        customer.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }
     

    res.send(JSON.stringify(customer))
})

app.get('/customerlist', async (req, res) => {
    let tenantId = req.query.tenantId;
    // let tenantModel = await getTenantModel();
    // let tenant = await tenantModel.findOne({ id: tenantId })
    let customerModel = await getCustomerModel(tenantId);
    const data = await customerModel.find()
    res.send(data)
})


app.listen(port, () => {
    console.log(`listening ${port}`)
})

//I am going to add/register two tenants.
//Now I am goint to add customer for each tenant.