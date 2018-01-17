import './Post.css';

import React, { Component } from 'react';
import { downvotePost, upvotePost } from '../../actions';

import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { timestampToDateString } from '../../utils/helper';

class Post extends Component {

  render() {

    const { post } = this.props;
    
    return (
      <div className={`post${this.props.showDetails ? ' details' : ''}`}>
        <div className="options edit-post">
          <span className="option" onClick={ _ => _}>edit</span>
          {' | '}
          <span className="option" onClick={ _ => _}>delete</span>
        </div>
        <div className="vote-wrapper">
          <div className="votes">
            <Button text="+" onClick={ _ => this.props.upvotePost(post.id) } />
            <div className="vote-score">
              { post.voteScore }
            </div>
            <Button text="-" onClick={ _ => this.props.downvotePost(post.id) } />
          </div>
        </div>
        <div className="post-wrapper">
          { this.props.showDetails
            ? ( <div className="title">
                { post.title }
              </div> )
            : ( <div className="title">
                <Link to={`${post.category}/${post.id}`}>{ post.title }</Link>
              </div> )
          }
          { this.props.showDetails && ( 
            <div className="body">
              { post.body }
            </div> )
          }
          <div className="credit">
            {timestampToDateString(post.timestamp)} by <b>{post.author}</b> in <Link to={ '/' + post.category }>{ post.category }</Link>.
          </div>
          <div className="credit">
            {post.commentCount} comments.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
  upvotePost: upvotePost(dispatch),
  downvotePost: downvotePost(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
