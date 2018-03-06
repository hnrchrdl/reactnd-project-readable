import './PostEdit.css';

import React, { Component } from 'react';
import { fetchCategories, fetchPosts } from '../../utils/api';

import Button from '../button/Button';
import { connect } from 'react-redux';
import { upsertPost } from '../../actions/post';

///////////// COMPONENT ////////////////////////7

class PostEdit extends Component {

  // Form elements are referenced for getting the values.
  formElements = {
    title: null,
    body: null,
    category: null,
    author: null
  }

  // Some local state for input validation.
  state = {
    formErrMsg: null
  }

  componentDidMount() {

    const { fetchCategories } = this.props;
    const { fetchPosts } = this.props;
    const { postId } = this.props.match.params;

    fetchCategories();

    if (postId) {
      // Refetch all posts to populate the input fields if post id is set.
      // This could be needed if the route is called directly.
      // Maybe consider fetching a single post here, but this works just as fine.
      fetchPosts()
    }
  }

  render() {

    const { categories, post = {} } = this.props;
    const { formErrMsg } = this.state;

    return (
      <div className="container post-edit">
        {formErrMsg && <div class="error">{formErrMsg}</div>}
        <input
          placeholder="title"
          defaultValue={post && post.title}
          ref={el => this.formElements.title = el}
        />
        <textarea
          placeholder="content"
          defaultValue={post && post.body}
          ref={el => this.formElements.body = el}
        ></textarea>
        {!post.id && (
          <div>
            <select
              defaultValue={post && post.category}
              ref={el => this.formElements.category = el}
            >
              {(categories || []).map((c, idx) => (
                <option
                  key={idx}
                  value={c.name}
                >{c.name}</option>
              ))}
            </select>
            <input
              placeholder="author"
              defaultValue={post && post.author}
              ref={el => this.formElements.author = el}
            />
          </div>
        )}
        <Button
          className="submit"
          text="save"
          onClick={_ => this.handleSave()}
        />
      </div >
    );
  }

  handleSave = () => {
    post

    const { upsertPost, post = {} } = this.props;

    let formIsValid = false;
    const id = post.id

    // Get all the input values
    post.title = this.formElements.title.value;
    post.body = this.formElements.body.value;

    if (!post.id) {
      // New Post. Category and author are also needed.
      post.category = this.formElements.category.value;
      post.author = this.formElements.author.value;

      // We need all items to be defined
      formIsValid = post.title && post.body && post.category && post.author;
    } else {
      // Editing a post
      // No category and author, but we have a post id.
      formIsValid = post.title && post.body;
    }

    if (formIsValid) {
      // reset error and save post
      this.setState({ formErrMsg: null });
      upsertPost(post).then(res => {
        this.props.history.push(`/${post.category}/${res.post.id}`)
      })
    } else {
      // not saving because of form error.
      this.setState({ formErrMsg: 'You screwed up.' });
    }
  }
}


////////////////// MAP PROPS /////////////////////////

const mapStateToProps = (state, props) => ({
  categories: state.category.list,
  post: state.post.posts.find(post => post.id === props.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: _ => fetchCategories(dispatch),
  fetchPosts: _ => fetchPosts(dispatch),
  upsertPost: upsertPost(dispatch)
})

/////////////////////// EXPORTS ////////////////////////////

// Passing {pure: false } to connect ensures correct rendering of currently active NavLink.
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(PostEdit);

