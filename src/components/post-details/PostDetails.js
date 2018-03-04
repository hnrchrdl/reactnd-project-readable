import './PostDetails.css';

import React, { Component } from 'react';
import { downvotePost, fetchPosts, upvotePost } from '../../actions';

import { Link } from 'react-router-dom';
import { Post } from '../../components';
import { connect } from 'react-redux';

class PostDetails extends Component {
    componentDidMount() {
        // fetch a fresh list of all posts
        this.props.fetchPosts();
    }

    render() {
        // get the post from the props
        const { post } = this.props;
        return (
            <div className="post-details">
                {post && (
                    <Post
                        post={post}
                        showDetails={true}
                        upvote={this.props.upvotePost}
                        downvote={this.props.downvotePost}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = (state, props) => ({
    // from the list of posts, find the one matching the id from url params
    post: props.match.params
        ? state.post.posts.find(post => post.id === props.match.params.postid)
        : null
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: fetchPosts(dispatch),
    upvotePost: upvotePost(dispatch),
    downvotePost: downvotePost(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
