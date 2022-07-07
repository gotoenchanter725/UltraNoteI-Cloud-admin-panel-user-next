const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const juice = require("juice");

const smtp = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendMail = ({
  from,
  to,
  subject,
  templateVars,
  templateName = "massMail",
}) => {
  return new Promise((resolve, reject) => {
    const templatePath = `templates/${templateName}.html`;
    const options = {
      from,
      to,
      subject,
    };
    let tmp = path.join(__dirname, templatePath);
    if (fs.existsSync(tmp)) {
      const template = fs.readFileSync(tmp, "utf-8");
      const html = ejs.render(template, templateVars);
      const inline = juice(html);
      options.html = inline;
    }
    resolve(smtp.sendMail(options));
  });
};

module.exports = sendMail;
