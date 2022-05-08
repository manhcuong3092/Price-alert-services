const config = require("./config");
const nodemailer = require("nodemailer");
const { default: axios } = require("axios");
const BOT_TOKEN = process.env.BOT_TOKEN;

exports.SendEmail = async (req, res) => {
    try {
        const { notice_type, destination, message, title } = req.body;
        console.log(req.body)

        if(notice_type === 'email') {
          const smtpEndpoint = "smtp.gmail.com";  //SMTP server
    
          const port = 465;
      
          const senderAddress = config.USERNAME;
      
          var toAddress = destination;
      
          const smtpUsername = config.USERNAME;
      
          const smtpPassword = config.PASSWORD;
      
          var subject = title;
      
          var body_html = `<html><p>${message}</p></html>`;
      
          // Create the SMTP transport.
          let transporter = nodemailer.createTransport({
            host: smtpEndpoint,
            port: port,
            secure: true, // true for 465, false for other ports
            auth: {
              user: smtpUsername,
              pass: smtpPassword,
            },
          });
      
          // Specify the fields in the email.
          let mailOptions = {
            from: senderAddress,
            to: toAddress,
            subject: subject,
            html: body_html,
          };
      
          await transporter.sendMail(mailOptions);  //Send the mail.
        } else if (notice_type === 'telegram') {
          await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${destination}&text=${message}`);
        } else if (notice_type === 'discord') {
          await axios.post(destination, {
            content: message
          });
        }
    
        return res.send({ error: false, message: "Send notice successfully!" }) ;
      } catch (error) {
        console.error("send-email-error", error);
        return res.send({ error: true, message: "Couldn't send notice" })
      }
};
