// İlgili modelleri içe aktarın
const UserAccount = require('../models/UserAccount');
const UserInfo = require('../models/UserInfo');

const createUserAndUserInfo = async (email, username, password) => {
  try {
    // Create UserAccount
    const userAccount = new UserAccount({ email, username, password });
    await userAccount.save();

    // UserInfo kaydını oluştur
    const userInfo = new UserInfo({ userAccountId: userAccount._id});
    await userInfo.save();

    console.log('User and UserInfo created successfully:', userAccount, userInfo);
    return { userAccount, userInfo };
  } catch (error) {
    console.error('Error creating User and UserInfo:', error.message);
    throw error;
  }
};

module.exports = { createUserAndUserInfo, UserAccount };
