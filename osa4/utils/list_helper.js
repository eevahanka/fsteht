const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)
} 

const vertaa = (current, largest) => {
    return current.likes > largest.likes
}

const favouriteBlog = (arr) => {
    return arr.reduce((largest, current) =>
        (vertaa(current, largest) ? current : largest), arr[0]);
}

const blogToAuthor  = (blog) => {
    return blog.author
}

const vertaa2 = (current, largest) => {
    return current.blogs > largest.blogs
}

const emt = (arr) => {
    return arr.reduce((largest, current) =>
        (vertaa2(current, largest) ? current : largest), arr[0]);
}

const blogsToAuthors = (blogs) => {
    return blogs.map(blogToAuthor)
}

const findMostCommonAuthor = (authors) => {
    var currentAuthor = authors.shift()
    var blogs = 1
    const authorAmounts = []
    for (const author of authors) {
        // console.log(authorAmounts)
        if (currentAuthor === author) {
            blogs += 1
        } else {
            // console.log([{author:currentAuthor, amount:amount}])
            authorAmounts.push({author:currentAuthor, blogs:blogs})
            currentAuthor = author
            blogs = 1
        }
    }
    authorAmounts.push({author:currentAuthor, blogs:blogs})
    // console.log(12345543)
    // console.log(authorAmounts)
    return emt(authorAmounts)

}

const mostBlogs = (blogs) => {
    const authors  = blogsToAuthors(blogs)
    // console.log(authors)
    authors.sort()
    return findMostCommonAuthor(authors)
}

const mostLikes  = (blogs) => {
    pass
}


module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
    }