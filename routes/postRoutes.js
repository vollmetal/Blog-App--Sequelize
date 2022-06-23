const express = require('express')
const postRouter = express.Router()

postRouter.get('/', (req, res) => {
    res.render('new-post-page')
})

postRouter.post('/submit', (req, res) => {
    const postTitle = req.body.postTitle
    const postDetails = req.body.contents
    let postCategory = req.body.category
    postCategory = postCategory.toLowerCase()

    const post = models.Post.build({
        title: postTitle,
        description: postDetails,
        category: postCategory
    })

    console.log(post)

    post.save().then(savedPost => {
        res.redirect('/')
    })

    
})

module.exports = postRouter