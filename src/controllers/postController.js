const { Post } = require('../models/postSchema')
const { Comment } = require('../models/commentSchema')
const jwt = require("jsonwebtoken");

const createPost = (req, res, next) => {

    const { filename } = req.file
    const { title, show } = req.body
    const decoded = jwt.verify(req.cookies.access_token, "secret", (err, data) => {
        if (err) {
            return err
        }
        else {
            return data
        }
    })
    const post = Post.create({
        userid: decoded.loggedUser,
        image_url: filename,
        title: title,
        show: show
    })
        .then((data) => {
            return res.redirect('/api/v1/user/profile')
        })
        .catch((err) => {
            return res.send(err)
        })
}


const deletePost = (req, res, next) => {
    Post.destroy({
        where: {
            id: req.params.postid
        }
    })
        .then((deletedPost) => {
            return res.redirect('/api/v1/user/profile')
        })
        .catch((err) => {
            return res.status(400).json({ error: err })
        })
}


const editPostPage = (req, res, next) => {
    Post.findAll({
        where: {
            id: req.params.postid
        }
    })
        .then((post) => {

            return res.status(200).render('../views/edit/index.ejs', { post })
        })
        .catch((err) => {
            return res.status(400).json({ error: err })
        })
}


const editPost = (req, res, next) => {
    const { title, show } = req.body
    // const postid = req.params.postid.split(':')[1]
    const postid = req.params.postid

    res.send(req.file.filename)
    // if(req.file.filename){
    //     Post.update(
    //         { title,image_url: req.file.filename,show },
    //         { where: { id: postid } })
    //     .then((data) => {
    //        return res.redirect('/api/v1/user/home',204)
    //     })
    //     .catch((err) => {
    //         return res.status(400).json({messege:err})
    //     })
    // }
    // else{
    //     Post.update(
    //         { title,show },
    //         { where: { id: postid } })
    //     .then((data) => {
    //        return res.send(data)
    //     })
    //     .catch((err) => {
    //         return res.status(400).json({messege:err})
    //     })
    // }



}

const createComment = (req, res, next) => {
    const decoded = jwt.verify(req.cookies.access_token, "secret", (err, data) => {
        if (err) {
            return err
        }
        else {
            return data
        }
    })
    Comment.create({
        postid: req.params.postid,
        desc: req.body.comment,
        user: decoded.loggedUsername
    })
        .then((data) => {
            return res.redirect('/api/v1/user/home')
        })
        .catch((err) => {
            return res.status(400).json({ error: err })
        })
}

const deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.commentid
        }
    })
        .then((deletedcomment) => {
            return res.redirect('/api/v1/user/home')
        })
        .catch((err) => {
            return res.status(400).json({ error: err })
        })
}

const editCommentPage = (req, res, next) => {
    Comment.findAll({
        where: {
            id: req.params.commentid
        }
    })
        .then((comment) => {

            return res.status(200).render('../views/editComment/index.ejs', { comment })
        })
        .catch((err) => {
            return res.status(400).json({ error: err })
        })
}


const editComment = (req, res, next) => {
    const { editedComment } = req.body
    const commentId = req.params.commentid

    Comment.update(
        { desc: editedComment },
        { where: { id: Number(commentId) } })
        .then((val) => {
            return res.redirect('/api/v1/user/home')
        })
        .catch((err) => {
            return res.status(400).json({ messege: err })
        })
}

module.exports = { createPost, deletePost, editPostPage, editPost, createComment, deleteComment, editComment, editCommentPage }