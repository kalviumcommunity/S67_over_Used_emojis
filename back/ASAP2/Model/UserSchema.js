const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    symbol:{type:String,required:true,unique:true
    },
    name:{
        type:String,required:true
    },
    usageCount: {
        type: Number,
        default: 0,      // This will track how often it has been used or reported
      },
      lastUsed: {
        type: Date,
        default: Date.now,
      },
      overused: {
        type: Boolean,
        default: false,  // Whether this emoji is "overused"
      }
    })

      const Emoji = mongoose.model("Emoji",UserSchema)

      module.exports = Emoji
