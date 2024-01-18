const express = require('express');
const router = express.Router();
const UserAccount = require('../models/userAccountModel');
const UserInfo = require('../models/userInfoModel');

// Kullanıcı hesaplarını getir
router.get('/user-accounts', async (req, res) => {
  try {
    const userAccounts = await UserAccount.find();
    res.json(userAccounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kullanıcı bilgilerini getir
router.get('/user-info', async (req, res) => {
    const username = req.query.username
  try {
    const userInfos = await UserInfo.find(username);
    res.json(userInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {router} 
