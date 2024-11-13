const pool = require("../config/db");

async function findAll(){
    const [result] = await pool.query('SELECT * FROM authors;');
    return result;
}

async function findById(id){
    const [result] = await pool.query('SELECT * FROM authors WHERE id = ?;', [id]);
    if(result.length === 0) return null;
    return result[0];

}

async function findByEmail(email){
    const [result] = await pool.query('SELECT * FROM authors WHERE email = ?;', [email]);
    if(result.length === 0) return null;
    return result[0];
}

async function create (author){
    const [result] = await pool.query('INSERT INTO authors (name, email, image) VALUES (?, ?, ?);', [author.name, author.email, author.image]);
    return result.insertId;
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create
}