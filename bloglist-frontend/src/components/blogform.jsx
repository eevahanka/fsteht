import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({
      title,
      author,
      url
    })
  }

  return (
    <div>
      <h2>add blog</h2>
      <form onSubmit={onSubmit}>
        <div>Blog title
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder='blog name'
          />
        </div>
        <div>Blog Author
          <input
            value={author}
            onChange={handleAuthorChange}
            placeholder='blog author'
          />
        </div>
        <div>Blog Url
          <input
            value={url}
            onChange={handleUrlChange}
            placeholder='url'
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm
