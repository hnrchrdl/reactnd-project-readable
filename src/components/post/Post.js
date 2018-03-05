import './Post.css';

import Button from '../button/Button';
import CommentList from '../comments/CommentList';
import { Link } from 'react-router-dom';
import React from 'react';
import { timestampToDateString } from '../../utils/helper';

export default ({ post, upvote, downvote, edit, del, showDetails, comments, addComment }) => (

  <div className={`post${showDetails ? ' details' : ''}`}>
    <div className="options edit-post">
      <Link to={`/__edit/${post.id}`} ><span className="option">edit</span></Link>
      {' | '}
      <span className="option" onClick={_ => del()}>delete</span>
    </div>
    <div className="vote-wrapper">
      <div className="votes">
        <Button text="+" onClick={_ => upvote(post.id)} />
        <div className="vote-score">
          {post.voteScore}
        </div>
        <Button text="-" onClick={_ => downvote(post.id)} />
      </div>
    </div>
    <div className="post-wrapper">
      {showDetails
        ? (<div className="title">
          {post.title}
        </div>)
        : (<div className="title">
          <Link to={`${post.category}/${post.id}`}>{post.title}</Link>
        </div>)
      }
      {showDetails && (
        <div className="body">
          <pre>{post.body}</pre>
        </div>)
      }
      <div className="credit">
        {timestampToDateString(post.timestamp)} by <b>{post.author}</b> in <Link to={'/' + post.category}>{post.category}</Link>.
          </div>
      <div className="credit">
        {post.commentCount} comments.
      </div>
      {showDetails
        ? <CommentList postId={post.id} />
        : null
      }
    </div>
  </div>
)