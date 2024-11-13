const router = require('express').Router();
const {findAll, findById, create} = require("../models/AuthorModel");
const {findByAuthorId} = require("../models/PostModel");
const {checkCreateAuthorPayload} = require("../utils/Middlewares");
const PostResponse = require("./models/PostResponse");

router.get('',async (req,res,next) => {
    try{
        const authors = await findAll();
        return res.status(200).json(authors);
    }catch(error){
        next(error)
    }
});

router.get('/:id',async (req,res,next) => {
    const id = req.params.id;
    try{
        const author = await findById(id);
        if(author === null) return res.status(404).json({code: 'NOT_FOUND', message: `Author with id ${id} not found.`});
        return res.status(200).json(author);
    }catch (error){
        next(error);
    }
});

router.get('/:id/posts',async (req,res,next) => {
    const id = req.params.id;
    try{
        const author = await findById(id);
        if(author === null) return res.status(404).json({code: 'NOT_FOUND', message: `Author with id ${id} not found.`});
        const posts = await findByAuthorId(author.id);
        const response = await Promise.all(posts.map(async post => {
            let author = await findById(post.author_id);
            return new PostResponse(post, author);
        }))
        return res.status(200).json(response);
    }catch (error){
        next(error);
    }
});

router.post('', checkCreateAuthorPayload ,async (req,res,next) => {
    const {name, email, image} = req.body;
    try{
        const id = await create({name, email, image});
        const author = await findById(id);
        return res.status(201).json(author);
    }catch (error){
        next(error);
    }
});

module.exports = router;