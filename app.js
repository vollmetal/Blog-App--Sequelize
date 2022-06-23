const express = require('express')
const app = express()
const postRoutes = require('./routes/postRoutes')
//const accountRoutes = require('./routes/accountRoutes')

global.models = require('./models')

global.session = require('express-session')

const bcryptjs = require('bcryptjs')

const mustacheExpress = require('mustache-express')
const { Op } = require('sequelize')
// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
    // the pages are located in views directory
app.set('views', './views')
    // extension will be .mustache
app.set('view engine', 'mustache')

app.use(express.urlencoded())
app.use(express.static('public'))

app.use(session({
    secret: 'Super Seekret',
    resave: false,
    saveUninitialized: true
  }))

app.use('/posts', postRoutes)
//app.use('/account', accountRoutes)

app.get('/', async (req, res) => {

    const rawPosts = await models.Post.findAll({})
    console.log(rawPosts)
    res.render('main-page', {posts: rawPosts})
})

app.post('/sort', async (req, res) => {
    const category = req.body.category

    const rawPosts = await models.Post.findAll({
        where: {
            category: {
                [Op.eq]: category
            }
        }
    })
    console.log(rawPosts)
    res.render('main-page', {posts: rawPosts})
})

app.get('/update/:id', async (req, res) => {
    
    const postID = parseInt(req.params.id)

    // get the movie based on the movie id 

    const post = await models.Post.findByPk(postID)
    console.log(post.dataValues)
    res.render('update-post-page', {post: post.dataValues})
})

app.post('/update/confirm', async (req, res) => {
    const postId = parseInt(req.body.id)
    const postTitle = req.body.postTitle
    let category = req.body.category
    let contents = req.body.contents
    category = category.toLowerCase()

    const updatedPost = await models.Post.update({
        title: postTitle,
        description: contents,
        category: category
    }, {
        where: {
            id: postId
        }
    })

    res.redirect('/')
})

app.get('/delete/:id', async (req, res) => {
    const postId = parseInt(req.params.id)

    try {
        const _ = await models.Post.destroy({
            where: {
                id: postId
            }
        })
    } catch {

    }
    res.redirect('/')
})

app.listen(2070, () => {

})