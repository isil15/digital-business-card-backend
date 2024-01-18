require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cardappcluster.qp4j2vs.mongodb.net/${process.env.DB_NAME}`

module.exports = {
  uri
}