require("dotenv").config();

const path = require("path");
const products = require(path.join(__dirname, "data", "products.json"));
const services = require(path.join(__dirname, "data", "services.json"));

const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 3001;

const whitelist = ["http://localhost:3000"];
const cors_options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Cors not allowed"), false);
    }
  },
};

const nodemailer = require("nodemailer");
const mailer = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

app.use(cors(cors_options));
app.use(express.json());

function get_name(name) {
  return `<b>Имя:</b> ${name}<br>`;
}

function get_email(email) {
  return `<b>Почта:</b> ${email}<br>`;
}

function get_address(address) {
  return address ? `<b>Адрес:</b> ${address}<br>` : ``;
}

function get_phone(phone) {
  return phone ? `<b>Телефон:</b> ${phone}<br>` : ``;
}

function get_message(message) {
  return message ? `<br>${message}<br>` : `Сообщений не оставлено<br>`;
}

async function send_mail(data) {
  const info = await mailer.sendMail({
    from: `LM Cameras ${process.env.SMTP_USER}`, // sender address
    to: "aleks.nekipelov78@gmail.com", // list of receivers
    subject: `Новая заявка: ${data.email}`, // Subject line
    html:
      get_name(data.name) +
      get_email(data.email) +
      get_address(data.address) +
      get_phone(data.phone) +
      get_message(data.message), // html body
  });
}

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/services", (req, res) => {
  res.json(services);
});

app.post("/send_mail", (req, res) => {
  console.log("sending mail");
  console.log(req.body.data);
  send_mail(req.body.data);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
