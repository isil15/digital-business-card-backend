// server.js
const express = require("express");
const dbService = require("./services/dbService");
const cfg = require("./config/dbCfg");
const httpUtils = require("./utils/http");
require("dotenv").config();
const userServices = require('./services/userService');

const app = express();
const PORT = 8070;

//corsHandler execution
httpUtils.corsHandler(app);
//connect to db
dbService.connectToDb(cfg.uri);

app.post("/getCard", async (req, res) => {});

app.get("/getCard", (req, res) => {
  cardId = req.query.cardId;
  return cardId;
});


app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // creating userAcc
    const { userAccount, _ } = await userServices.createUserAndUserInfo(email, username, password);

    res.status(201).send({
      userId: userAccount._id,
      message: "Signup successful, please complete your profile.",
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kullanıcı adına göre kullanıcıyı bul
    const user = await userServices.UserAccount.findOne({ username });

    // Kullanıcı bulunamazsa
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Şifreyi karşılaştır
    const passwordMatch = await user.comparePassword(password);

    if (passwordMatch) {
      // Şifre doğruysa, kullanıcıyı giriş yapmış say
      return res.status(200).json({ message: "Login successful", user_id: user._id });
    } else {
      // Şifre yanlışsa
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
