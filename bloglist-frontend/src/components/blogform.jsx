import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2>add blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Blog title</Form.Label>
          <Form.Control
            value={title}
            onChange={handleTitleChange}
            placeholder="blog name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Blog Author</Form.Label>
          <Form.Control
            value={author}
            onChange={handleAuthorChange}
            placeholder="blog author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Blog Url</Form.Label>
          <Form.Control
            value={url}
            onChange={handleUrlChange}
            placeholder="url"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          add
        </Button>
      </Form>
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
  url: PropTypes.string.isRequired,
}

export default BlogForm
