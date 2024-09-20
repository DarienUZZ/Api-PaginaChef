import express, { Router } from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import path from "path";

const cors = require("cors");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "gtxm1317.siteground.biz",
  port: 465,
  secure: true,
  auth: {
    user: "info@privatechefjacocostarica.com",
    pass: "5)g1f42xiIck",
  },
});

const api = express();
const router = Router();

api.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => res.send("API!"));

router.get("/list-emails", (req, res) => {
  res.json({ emails: ["juan@gmail.com", "roberto@gmail.com"], total: 0 });
});

router.post("/send", (req, res) => {
  let mailOptions = {
    from: "info@privatechefjacocostarica.com",
    to: "dariumana04@gmail.com",
    subject: "Formulario de Contacto",
    html: `Nueva consulta:<br/>
    <p>Name: ${req.body.name}</p>
    Email: ${req.body.email} <br>
    Asunto: ${req.body.subject} <br>
    Location: ${req.body.location} <br>
    Message: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.send("error" + JSON.stringify(err));
    } else {
      res.send("success");
    }
  });

  // save on db mongo
});

api.use("/api/", router);

export const handler = serverless(api);
