const mongoose = require("mongoose")
const uri = 'mongodb+srv://brototypeTest:vcbodheesh@clusterfortest.yvsxay2.mongodb.net/AdminCRUD?retryWrites=true&w=majority'

 const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    },()=>console.log("Mongo db connected"))
  } catch (error) {
    console.log(error.message)
  }
}

module.exports= {connectDb}