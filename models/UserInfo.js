const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema(
  {
    userAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      unique: true,
    },
    socialLinks: {
      linkedin: { type: String, default: null },
      github: { type: String, default: null },
      adobePortfolio: { type: String, default: null },
      custom: [
        {
          platform: { type: String, default: null },
          link: { type: String, default: null },
        },
      ],
    },
    personalPage: {
      about: { type: String, default: null },
      skills: { type: [String], default: [] },
      projects: [
        {
          title: { type: String, default: null },
          description: { type: String, default: null },
        },
      ],
    },
    customLink: { type: String, default: null },
    // Yeni eklenen alanlar
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    // Diğer yeni eklenen alanları ekleyebilirsiniz
  },
  {
    timestamps: true,
  }
);

// Diğer metotlar buraya eklenebilir

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
