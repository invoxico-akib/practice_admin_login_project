const mongoose = require("mongoose")

const subadminSchema = ({

    first_name: {
        type: String,
        requird: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        requird: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("subadmins", subadminSchema)