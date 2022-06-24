require('../config/.env')
const { User } = require('../models/userSchema')
const { Post } = require('../models/postSchema')
const { Comment } = require('../models/commentSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


const { comparepassword } = require("../utils/crypt");


const getLoginPage = (req, res) => {
    return res.status(200).render('../views/login/index.ejs')
}

const getHomepage = (req, res, next) => {
    const decoded = jwt.verify(req.cookies.access_token, "secret", (err, data) => {
        if (err) {
            return err
        }
        else {
            return data
        }
    })
    Post.findAll({
        where: {
            show: true
        },
        include: [{ model: Comment }]
    })
        .then((post) => {
            return res.render('../views/home/index.ejs', { post, username: decoded.loggedUsername })
        })
        .catch((err) => {
            return res.json({ error: err })
        })
}

const createUser = (req, res, next) => {

    const { email, username, password } = req.body
    var hash = bcrypt.hashSync(password, 8);
    const user = User.create({
        email, username, password: hash
    })
        .then((createdUser) => {
            const token = jwt.sign({
                loggedUser: createdUser.id,
                loggedUsername: createdUser.username
            }, 'secret', { expiresIn: '1h' })
            const updatedUser = User.update(
                { token: token },
                { where: { id: createdUser.id } })
                .then((user) => {
                    return res
                    .cookie("access_token", token, {
                        httpOnly: true,
                    })
                    .redirect('/api/v1/user/home')
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


const getProfilePage = (req, res) => {
    const decoded = jwt.verify(req.cookies.access_token, "secret", (err, data) => {
        if (err) {
            return err
        }
        else {
            return data
        }
    })
    Post.findAll({
        where: {
            userid: decoded.loggedUser
        }
    })
        .then((post) => {
            return res.render('../views/profile/index.ejs', { post })
        })
        .catch((err) => {
            return res.json({ error: err })
        })
}


const login = (req, res, next) => {
    const { email, password } = req.body
    User.findAll({
        where: {
            email: String(email)
        }
    })
        .then((data) => {

            if (data.length <= 0) {
                return res.json({ messege: "No such user " })
            }
            else {
                var foundUser = data[0]
                const validate = comparepassword(password, foundUser.password)
                if (validate) {
                    const token = jwt.sign({
                        loggedUser: foundUser.id,
                        loggedUsername: foundUser.username
                    }, "secret", { expiresIn: '1h' });
                    return res
                        .cookie("access_token", token, {
                            httpOnly: true,
                        })
                        .redirect('/api/v1/user/home');
                }
                else {
                    return res.json({ messege: "incorrect password" })
                }
            }
        })
        .catch((err) => {
            console.log(" :: eror :: ", err);
            return res.json(err)
        })

}



const logout = (req, res, next) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect('/api/v1/user');
}


module.exports = { getHomepage, createUser, login, logout, getProfilePage, getLoginPage }