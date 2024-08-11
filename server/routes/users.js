const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // Validate the user input
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with given email already exists!" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save the new user
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        // Return success response
        return res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        // Handle any server errors
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
