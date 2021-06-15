console.clear()
const express = require("express");
const joi = require("joi");
const app = express();
const cors = require('cors');

app.use(express.json());
const products = [
{id:1,number1:1234,name:"atta",email:"abc@gmial.com",gender:"m",number2: 1234 ,Address:
  {
  street:"n1",city:"lhr",country:"pak"
  }
},
{id:2,number1:12234,name:"lila",email:"abc@gmial.com",gender:"f",number2: 1234,Address:
  {
  street:"n1",city:"lhr",country:"pak"
  }
},
{id:3,number2:122234,name:"atta",email:"abc@gmial.com",gender:"m",number2:1234,Address:
  {
  street:"n1",city:"lhr",country:"pak"
  }
},

];

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/search", function (req, res) {
  res.send("API Search");
});

//first parameter is url
app.get("/api/products", function (req, res) {
  res.send(products);
});
//get one resource
app.get("/api/products/:id", function (req, res) {
  const prod= products.find(c=> c.id === parseInt(req.params.id));
  if (!prod)
    return res.status(400).send("Product not found");
  res.send(prod);
});
//update one resource with id e.g. index
app.put("/api/products/:id", function (req, res) {
  const prod= products.find(c=> c.id === parseInt(req.params.id));
  if (!prod)
    return res.status(400).send("Product not found");
  const {error} =valide(req.body);
    if(error)
    {
     res.status(400).send(error.details[0].message);
     return;
    }
  prod.number1=req.body.number1;
  prod.name=req.body.name;
  prod.email=req.body.email;
  prod.gender=req.body.gender;
  prod.Address["street"]=req.body.street;
  prod.Address["city"]=req.body.city;
  prod.Address["country"]= req.body.country;
  res.send(prod);
});
//delete one resource
app.delete("/api/products/:id", function (req, res) {
  const prod= products.find(c=> c.id === parseInt(req.params.id));
  if(!prod) return res.status(404).send("product not found");
  const index= products.indexOf(prod);
  products.splice(index, 1);
  res.send(prod);
});
//create one resource
app.post("/api/products", function (req, res) {
    const {error} =valide(req.body);
    if(error)
    {
     res.status(400).send(error.details[0].message);
     return;
    }
    if(!products)
    {
      res.status(400).send("smt went wrong");
     return;
    }
  const prod ={
    id: products.length + 1,
    number1 :req.body.number1,
    name: req.body.name,
    email : req.body.email,
    gender : req.body.gender,
    Address :
    {
      street:req.body.street,
      city: req.body.city,
      country: req.body.country,
    }
  };
  products.push(prod);
  res.send(prod);
});
//Vlaidate routes
function valide(prod)
{
const schema =joi.object({
  id :joi.number().integer(),
  number1 : joi.string(),
  name : joi.string().min(3).required(),
  email : joi.string().email(),
  gender : joi.string().valid("M", "F").insensitive().required(),
  street : joi.string(),
  city : joi.string(),
  country : joi.string()
});
return schema.validate(prod);
}
app.listen(80);