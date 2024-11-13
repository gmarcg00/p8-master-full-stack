const pool = require("../config/db");

async function findAll(){
    const [result] = await pool.query('SELECT * FROM posts;');
    return result;
}

async function findById(id){
    const [result] = await pool.query('SELECT * FROM posts WHERE id = ?;', [id]);
    if(result.length === 0) return null;
    return result[0];

}

async function findByAuthorId(id){
    const [result] = await pool.query('SELECT * FROM posts WHERE author_id = ?;', [id]);
    return result;
}

async function create(post){
    const [result] = await pool.query('INSERT INTO posts (title, description, creation_date, category, author_id) VALUES (?, ?, ?, ?, ?);' +
        '', [post.title, post.description, post.creation_date, post.category, post.author_id]);
    return result.insertId;
}

module.exports = {
    findAll,
    findById,
    findByAuthorId,
    create
}

