import './PostDetails.css';

import React, { Component } from 'react';
import { downvotePost, fetchPosts, upvotePost } from '../../actions';

import Post from '../post/Post';
import { connect } from 'react-redux';

//////// COMPONENT //////////////////////////////

class PostDetails extends Component {

    componentDidMount() {
        // fetch a fresh list of all posts
        this.props.fetchPosts();
    }

    render() {
        // get the post from the props
        const { post } = this.props;
        return (
            <div className="container post-details">
                {post && (
                    <Post
                        post={post}
                        showDetails={true}
                        upvote={this.props.upvotePost}
                        downvote={this.props.downvotePost}
                        comments={this.props.commments}
                    />
                )}
            </div>
        );
    }
}


//////// MAP TO PROPS //////////////////////////////

const mapStateToProps = (state, props) => ({
    // from the list of posts, find the one matching the id from url params
    post: props.match.params
        ? state.post.posts.find(post => post.id === props.match.params.postid)
        : null,
    comments: state.comment.comments
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: fetchPosts(dispatch),
    upvotePost: upvotePost(dispatch),
    downvotePost: downvotePost(dispatch)
});

//////// EXPORTS //////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
