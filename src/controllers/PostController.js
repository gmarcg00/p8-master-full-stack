const router = require('express').Router();
const {findAll, findById, create} = require("../models/PostModel");
const {findById: findAuthorById} = require("../models/AuthorModel");
const {checkCreatePostPayload} = require("../utils/Middlewares");
const PostResponse = require("./models/PostResponse");

router.get('', async (req,res,next) => {
    try{
        const posts = await findAll();
        const response = await Promise.all(posts.map(async post => {
            let author = await findAuthorById(post.author_id);
            return new PostResponse(post, author);
        }))
        return res.status(200).json(response);
    }catch(error){
        next(error)
    }
});

router.get('/:id', async (req,res,next) => {
    const id = req.params.id;
    try{
        const post = await findById(id);
        if(post === null) return res.status(404).json({code: 'NOT_FOUND', message: `Post with id ${id} not found.`});
        const author = await findAuthorById(post.author_id);
        return res.status(200).json(new PostResponse(post, author));
    }catch (error){
        next(error);
    }
});

router.post('', checkCreatePostPayload ,async (req,res,next) => {
    const {title, description, creation_date, category, author_id} = req.body;
    try{
        const id = await create({title, description, creation_date, category, author_id});
        const post = await findById(id);
        const author = await findAuthorById(post.author_id);
        return res.status(201).json(new PostResponse(post, author));
    }catch (error){
        next(error);
    }
});

module.exports = router;