import './Post.css';

import React, { Component } from 'react';

import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { timestampToDateString } from '../../utils/helper';

// Presenter Component for a Post //
class Post extends Component {

  render() {

    const { post, upvote, downvote } = this.props;

    return (
      <div className={`post${this.props.showDetails ? ' details' : ''}`}>
        <div className="options edit-post">
          <span className="option" onClick={_ => _}>edit</span>
          {' | '}
          <span className="option" onClick={_ => _}>delete</span>
        </div>
        <div className="vote-wrapper">
          <div className="votes">
            <Button text="+" onClick={_ => this.props.upvote(post.id)} />
            <div className="vote-score">
              {post.voteScore}
            </div>
            <Button text="-" onClick={_ => this.props.downvote(post.id)} />
          </div>
        </div>
        <div className="post-wrapper">
          {this.props.showDetails
            ? (<div className="title">
              {post.title}
            </div>)
            : (<div className="title">
              <Link to={`${post.category}/${post.id}`}>{post.title}</Link>
            </div>)
          }
          {this.props.showDetails && (
            <div className="body">
              {post.body}
            </div>)
          }
          <div className="credit">
            {timestampToDateString(post.timestamp)} by <b>{post.author}</b> in <Link to={'/' + post.category}>{post.category}</Link>.
          </div>
          <div className="credit">
            {post.commentCount} comments.
          </div>
        </div>
      </div>
    );
  }
}




export default Post;
