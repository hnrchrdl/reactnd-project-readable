import './PostEdit.css';

import React, { Component } from 'react';

import Button from '../button/Button'
import { connect } from 'react-redux'
import { fetchCategories } from '../../utils/api';
import { upsertPost } from '../../actions/post'

class PostEdit extends Component {

  formElements = {
    title: null,
    body: null,
    category: null,
    author: null
  }
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }
  render() {

    const { categories, post } = this.props;

    return (
      <div className="container post-edit">
        <input placeholder="title" ref={el => this.formElements.title = el} />
        <textarea placeholder="content" ref={el => this.formElements.body = el}></textarea>
        <select ref={el => this.formElements.category = el}>
          {(categories || []).map((c, idx) => (
            <option key={idx} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input placeholder="author" ref={el => this.formElements.author = el} />
        <Button className="submit" text="save" onClick={_ => this.handleSave()} />
      </div >
    );
  }
  handleSave = () => {
    const { upsertPost } = this.props;
    const title = this.formElements.title.value;
    const body = this.formElements.body.value;
    const category = this.formElements.category.value;
    const author = this.formElements.author.value;
    upsertPost({ title, body, category, author })
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.category.list,
  post: state.post.posts.find(post => post.id === props.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: _ => fetchCategories(dispatch),
  upsertPost: upsertPost(dispatch)
})

// passing {pure: false } to connect ensures correct rendering of currently active NavLink
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(PostEdit);

