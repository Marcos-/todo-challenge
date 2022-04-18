const mongoose = require('mongoose');

// Setup mongodb
mongoose.connect("mongodb://root:MongoDB2019!@localhost:27017/myapp?authSource=admin", {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to DB");
})

module.exports = mongoose;