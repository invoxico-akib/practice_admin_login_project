const express = require("express");
const router = new express.Router();
const conn = require("../db/conn")
const User = require("../db/user")
const path = require("path");
const bcrypt = require("bcrypt");
const internal = require("stream");
const Jwt = require("jsonwebtoken");
const jwtKey = "invoxico-key";
const SubAdmin = require("../db/subadmin");
const subadmin = require("../db/subadmin");


//get api
router.get("/user", async (req, res) => {
    try {
        let result = await User.find();
        res.send(result);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//post api
router.post("/newuser", async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        email,
        password: hashPassword,
    })
    const result = await user.save()
    // result = result.toObject();
    delete result.password
    // res.send(result)
    res.status(200).json({ message: "New User Register Successfully" });

})

//login api

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            const matchPassword = await bcrypt.compare(req.body.password, user.password)

            if (matchPassword) {
                Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {

                    if (err) {
                        res.send({ result: "something went wrong" })
                    } else {
                        res.send({ user, auth: token })
                    }
                });
            } else {
                res.send({ result: "Incorrect Password" })
            }
        } else {
            res.send({ result: "No user found" })
        }
    }
});


//delete api 

router.delete("/userremove/:id", async (req, res) => {
    const result = await User.deleteOne()
    res.send(result)
})




router.post("/update_credential/:_id", async (req, res) => {
    try {
        const { password, ...otherFields } = req.body;
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);

            const result = await User.updateOne(
                { _id: req.params._id },
                { $set: { password: hashPassword, ...otherFields } }
            );

            if (result.nModified === 1) {
                res.json({ message: "User credentials updated successfully" });
            } else {
                res.status(200).json({ message: "User credentials updated successfully" });
            }
        } else {
            const result = await User.updateOne(
                { _id: req.params._id },
                { $set: { ...otherFields } }
            );

            if (result.nModified === 1) {
                res.json({ message: "User information updated successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//subadmin api 

//get api 

router.get("/subadmins", async (req, res) => {
    try {
        const result = await SubAdmin.find()
        res.send(result)

    } catch (error) {
        res.status(500).json(("internal server error", error))
    }
})



//create api 

router.post("/create-subadmin", async (req, res) => {

    const { first_name, last_name, email_id, password, status } = req.body

    const subadmin = new SubAdmin({
        first_name,
        last_name,
        email_id,
        password,
        status
    })
    const result = await subadmin.save()
    // res.send(result)
    res.status(200).json({ message: "new admin register sussessfully" })
})


//delete api 

router.delete("/subadmin/:_id", async (req, res) => {
    try {
        const result = await SubAdmin.deleteOne(req.params)
        if (result.deletedCount == 1) {
            res.status(200).json({ message: "User Delete Successfully" })

        } else {
            res.status(400).json({ error: "User Not Found" })
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})








//update api 

router.post("/update_subadmin/:id", async (req, res) => {
    const { first_name, last_name, email_id, password, status } = req.body
    let result = await User.updateOne({
        first_name,
        last_name,
        email_id,
        password,
        status
    })
})


module.exports = router