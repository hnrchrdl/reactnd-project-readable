import './PostList.css';

import React, { Component } from 'react';
import { downvotePost, fetchPosts, receive_sorting, upvotePost } from '../../actions';

import { Link } from 'react-router-dom';
import { Post } from '../../components';
import { connect } from 'react-redux';
import { sortBy } from '../../utils/helper';

const SORT_OPTIONS = [{
  key: 'voteScore',
  display: 'votes',
  reverse: true,
  primer: x => parseInt(x)
}, {
  key: 'timestamp',
  display: 'date',
  reverse: true,
  primer: x => new Date(x)
}, {
  key: 'title',
  display: 'title',
  reverse: false,
  primer: x => x
}];

class PostList extends Component {

  componentDidMount() {
    // fetch all posts
    this.props.fetchPosts()
  }

  render() {
    // grab the post list from props
    const { posts } = this.props;

    return (
      <div className="post-list">
        {this.renderSortBar(posts)}
        {this.renderPostList(posts)}
      </div>
    );
  }

  renderPostList(posts) {
    if (posts.length > 0) {
      return (
        <div>
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              showDetails={true}
              upvote={this.props.upvotePost}
              downvote={this.props.downvotePost}
            />
          ))}
        </div>
      );
    }
  }


  renderSortBar(posts) {
    if (posts.length > 0) {
      return (
        <div className="options sort-posts">
          <span>
            {posts.length} post{posts.length === 1 && 's'}.
          </span>
          {posts.length > 1 && <span> sort by </span>}
          {SORT_OPTIONS.map((option, idx) => (
            posts.length > 1 && (
              <span
                key={option.key}
                className={`option${this.props.sorting.key === option.key ? ' active' : ''}`}
                onClick={_ => this.sortPosts(option)}>
                {option.display}
              </span>
            )
          ))}
        </div>
      );
    } else {
      return (
        <div className="options">
          0 posts. <Link to="/edit">Add a new one</Link>!
        </div>
      );
    }
  }

  sortPosts({ key, reverse }) {
    reverse = this.props.sorting.key === key
      ? !this.props.sorting.reverse
      : reverse;
    this.props.sortPosts({ key, reverse });
  }
}

// filter posts based on the category props from router
const getFilteredPosts = (posts, match) => {
  return posts.filter(post => {
    const filterCategory = match.params.category;
    if (filterCategory) {
      return post.category === filterCategory; // filter set
    }
    return true; // no filter
  });
};

// sort posts based on the sorting props
const getSortedPosts = (posts, sorting) => {
  if (sorting.key) {
    return posts.sort(sortBy(sorting.key, sorting.reverse,
      SORT_OPTIONS.find(o => o.key === sorting.key).primer));
  }
  return posts;
};

const mapStateToProps = (state, props) => ({
  posts: getSortedPosts(getFilteredPosts(state.post.posts, props.match), state.post.sorting),
  sorting: state.post.sorting
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: fetchPosts(dispatch),
  sortPosts: (sortOption) => dispatch(receive_sorting(sortOption)),
  upvotePost: upvotePost(dispatch),
  downvotePost: downvotePost(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
