// ap
const models = require('../database/models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = (req, res) => { // signUp function
    models.User.findOne({where: {email:req.body.email}}).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already exists",
            })
        }
        else { // genSalt = salt generator, with 10 rounds
            bcryptjs.genSalt(10, (err, salt) => { // salt adds random string to password
                bcryptjs.hash(req.body.password, salt, (err, hash) => {
                    
                    const user = { // user credentials
                        name: req.body.name,
                        email:req.body.email,
                        password: hash
                    }

                    const schema = { // signUp data validation
                        name: {type:"string", optional: false, max: "100"},
                        email: {type: "string", optional: false, max: "100"}
                    }   
                    const v = new Validator();
                    const validationResponse = v.validate(user, schema);
                    if (validationResponse !== true) {
                        return res.status(400).json( {
                            message: "Validation failed",
                            errors: validationResponse
                        }) 
                    }   

                    models.User.create(user).then(result => { // account creation
                        res.status(201).json( {
                            message: "User created successfully",
                        })
                    })
                    .catch(error => {
                        res.status(500).json( {
                            message: "Something went wrong",
                        })
                    })
                })
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        })
    })
}

const login = (req, res) => {
    models.User.findOne({where:{email: req.body.email}}).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Invalid credentials",
            })
        }
        else {
            bcryptjs.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, (err, token) => {
                        res.status(200).json({
                            message: "Authentication successful",
                            token: token
                        })
                    })
                }
                else {
                    res.status(401).json({
                        message: "Invalid credentials",
                    })
                }
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        })
    })
}

module.exports = {signUp: signUp, login: login}
