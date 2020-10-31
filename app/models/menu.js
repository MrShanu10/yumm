const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({

    name: { 
        type: String,
        reuired: true
    },
    image: { 
        type: String,
        reuired: true
    },
    price: { 
        type: Number,
        reuired: true
    },
    size: { 
        type: String,
        reuired: true
    }
})

module.exports = mongoose.model("Menu", menuSchema);