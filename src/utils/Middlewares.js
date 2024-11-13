const {findById,findByEmail} = require("../models/AuthorModel");

const checkCreateAuthorPayload = async (req, res, next) => {
    const { name, email, image } = req.body;
    if (!name || !email || !image) {
        return res.status(400).json({
            code: 'BAD_REQUEST',
            message: 'The request body must contain the fields: name, email, and image'
        });
    }
    const author = await findByEmail(email);
    if(author != null) return res.status(409).json({code: 'CONFLICT', message: `Author with email ${author.email} already exists.`});
    next();
};

const checkCreatePostPayload = async (req, res, next) => {
    const { title, description, creation_date, category, author_id } = req.body;
    if (!title || !description || !creation_date || !category || !author_id) {
        return res.status(400).json({
            code: 'BAD_REQUEST',
            message: 'The request body must contain the fields: title, description, creation_date, category, and author_id'
        });
    }
    const author = await findById(author_id);
    if(author === null) return res.status(400).json({code: 'BAD_REQUEST', message: `Author with id ${author_id} not found.`});
    next();
}

module.exports = {
    checkCreateAuthorPayload,
    checkCreatePostPayload
}