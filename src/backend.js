require("dotenv").config();

const https = require('https');
const fs = require('fs');

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/irkcam.ru/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/irkcam.ru/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

const path = require("path");
const products = require(path.join(__dirname, "data", "products.json"));
const services = require(path.join(__dirname, "data", "services.json"));


const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 3001;

const whitelist = ["http://localhost:3000", 'http://109.172.7.129:80', 'https://www.irkcam.ru', 'https://irkcam.ru', 'https://109.172.7.129:80', 'http://irkcam.ru'];
const cors_options = {
  origin: (origin, callback) => {
    console.log(origin)
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Cors not allowed"), false);
    }
  },
};

const nodemailer = require("nodemailer");
const mailer = nodemailer.createTransport({
  host: "connect.smtp.bz",
  port: 2525,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'aleks.nekipelov78@gmail.com',
    pass: 'wtwCoE0uyMtT',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: true,
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

function get_items(items) {
  var result = '';
  if (!items) {
    return '';
  }
  result += '<b>Товары:</b>\n\n'
  var total = 0;
  items.forEach((item, index) => {
    result += `${index + 1}. ${item.name} - ${item.price} ₽\n`
    total += item.price;
  })
  result += `Общая сумма: ${total}₽.\n`
  return result
}

async function send_mail(data) {
  const info = await mailer.sendMail({
	from: {
		name: "LM Video",
		address: "contact@irkcam.ru"
	  }, // sender address
    to: "aleks.nekipelov78@gmail.com", // list of receivers
    subject: `Новая заявка: ${data.email}`, // Subject line
    html:
      get_name(data.name) +
      get_email(data.email) +
      get_address(data.address) +
      get_phone(data.phone) +
      get_message(data.message) // html body
  });
}


async function send_order(data){
  const info = await mailer.sendMail({
    from: {
      name: "LM Video",
      address: "contact@irkcam.ru"
      }, // sender address
      to: "aleks.nekipelov78@gmail.com", // list of receivers
      subject: `Новый заказ: ${data.email}`, // Subject line
      html:
        get_name(data.name) +
        get_email(data.email) +
        get_address(data.address) +
        get_phone(data.phone) +
        get_message(data.message) +
        get_items(data.items), // html body
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

app.post("/send_order", (req, res) => {
  console.log("sending mail");
  console.log(req.body.data);
  send_order(req.body.data);
})

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
