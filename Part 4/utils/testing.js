const dummy = (blogs) => {
    return 1
}

const TestLikes = (blog) => {
    return blog[0].likes
}

const favoriteBlog = (blogs) => {
    let bestBlog = {
        title: "",
        author: "",
        likes: -1
    }
    for (const blog of blogs) {
        if (blog.likes >= bestBlog.likes) {
            bestBlog = { 
                title: blog.title, 
                author: blog.author, 
                likes: blog.likes 
            }
        }
    }
    return bestBlog
}

module.exports = {
    dummy,
    TestLikes,
    favoriteBlog,
}