import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url }) => {
  return (
    <div>
      <h2>add blog</h2>
      <form onSubmit={handleSubmit}>
        <div>Blog title<input
          value={title}
          onChange={handleTitleChange}
        />
        </div>
        <div>Blog Author<input
          value={author}
          onChange={handleAuthorChange}
        />
        </div>
        <div>Blog Url<input
          value={url}
          onChange={handleUrlChange}
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