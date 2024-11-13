class PostResponse{
    constructor(post, author){
        this.id = post.id;
        this.title = post.title;
        this.description = post.description;
        this.creation_date = post.creation_date;
        this.category = post.category;
        this.author = {
            id: author.id,
            name: author.name,
            email: author.email,
            image: author.image
        }
    }
}

module.exports = PostResponse;