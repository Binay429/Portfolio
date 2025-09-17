// server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API: Send Email
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Transporter (use Gmail or SMTP)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",      // 👉 replace with your email
        pass: "your_app_password",        // 👉 use Gmail App Password
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: "yourgmail@gmail.com",          // 👉 your inbox
      subject: `Portfolio Contact from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
