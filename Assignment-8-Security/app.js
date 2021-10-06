require('dotenv').config();
const express = require("express");
const app = express();
const sgMail = require('@sendgrid/mail');



app.use(express.urlencoded({ extended: true }));
// console.log(process.env.API_KEY);


sgMail.setApiKey(process.env.API_KEY);
const port = process.env.PORT || 2323;

app.get("/", (req, res) => {
  res.send("home page");
});
app.get("/entry", (req, res) => {
  console.log("entry page");
  res.render("index.ejs");
});

app.post("/entry", (req, res) => {
  const info = {
    ...req.body,
  };
  console.log(info.email);
  const msg = {
    to: info.email,
    from: 'kinshuk0486.cse19@chitkara.edu.in',
    subject: 'Welcome',
    text: `Hello ${info.firstname}, you entred at ${info.entryTime} ` 
  }
  sgMail.send(msg)
        .then((result) => {
            console.log('email sent sucessfully')
        })
        .catch((err) => {
            console.log('error: ', err);
            
        });

  res.redirect("/entry/welcome");
});

app.get("/entry/welcome", (req, res) => {
  res.render('welcome.ejs');
});

app.listen(port, () => {
  console.log("server started at 2323");
});
