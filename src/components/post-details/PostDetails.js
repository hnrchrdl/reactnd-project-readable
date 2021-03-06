import './PostDetails.css';

import React, { Component } from 'react';
import { deletePost, downvotePost, fetchPosts, upvotePost } from '../../actions';

import NotFound404 from '../404/404'
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
        const { post, upvotePost, downvotePost, comments } = this.props;

        if (post) {
            return (
                <div className="container post-details">
                    {post && (
                        <Post
                            post={post}
                            showDetails={true}
                            upvote={_ => upvotePost(post.id)}
                            downvote={_ => downvotePost(post.id)}
                            del={_ => this.deletePost(post.id)}
                            comments={comments}
                        />
                    )}
                </div>
            );
        } else {
            return <NotFound404 />
        }
    }

    deletePost(id) {
        const { deletePost, history } = this.props;
        deletePost(id);
        history.push('/'); // Back to start, nothing to show here anymore.
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
    downvotePost: downvotePost(dispatch),
    deletePost: deletePost(dispatch)
});

//////// EXPORTS //////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
