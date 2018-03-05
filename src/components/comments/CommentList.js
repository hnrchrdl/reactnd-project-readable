import './CommentList.css'

import React, { Component } from 'react'
import {
    addComment,
    deleteComment,
    downvoteComment,
    fetchComments,
    updateComment,
    upvoteComment
} from '../../actions/comment'

import Comment from '../comments/Comment'
import CommentAdd from '../comments/CommentAdd'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/post'
import { sortBy } from '../../utils/helper'

//////// COMPONENT //////////////////////////////

class CommentList extends Component {

    state = {
        // EditCommments is a list of comment ids that are in edit mode.
        // So we can have multiple comments in edit mode at the same time. Because why not.
        editComments: []
    }
    // Fetch Comments from Post ID.
    componentDidMount() {
        const { postId, fetchComments } = this.props;
        fetchComments(postId);
    }

    render() {

        const { comments, upvoteComment, downvoteComment } = this.props;

        return (
            <div className="comment-list">
                {
                    comments &&
                    comments.map(comment => (
                        (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                upvote={_ => upvoteComment(comment.id)}
                                downvote={_ => downvoteComment(comment.id)}
                                del={_ => this.deleteCommentHelper(comment.id)}
                                update={body => this.updateCommentHelper({ id: comment.id, body })}
                                enableEditMode={_ => this.enableEdit(comment.id)}
                                disableEditMode={_ => this.disableEdit(comment.id)}
                                isEditModeEnabled={this.state.editComments.includes(comment.id)}
                            />
                        )
                    ))
                }
                <div className="credit">Add Comment</div>
                <CommentAdd addComment={(body, author) => this.addCommentHelper(body, author)} />
            </div >
        );
    }

    addCommentHelper = (body, author) => {
        const { postId: parentId, addComment } = this.props;
        addComment({ body, author, parentId }).then(_ => {
            this.reloadPost();
        })
    }

    updateCommentHelper = ({ id, body }) => {
        const { updateComment } = this.props;
        if (body) {
            this.disableEdit(id);
            updateComment({ id, body })
        }
    }

    deleteCommentHelper = id => {
        const { deleteComment } = this.props;
        deleteComment(id).then(_ => {
            this.reloadPost();
        })
    }

    // Enables edit mode for comment.
    // This could be refactored to a toggle function
    enableEdit = (id) => {
        this.setState(state => ({
            editComments: [...state.editComments, id]
        }))
    }

    // Disables edit mode for comment.
    // This could be refactored to a toggle function
    disableEdit = (id) => {
        this.setState(state => ({
            editComments: state.editComments.filter(_id => {
                if (id === _id) {
                    return false;
                }
                return true;
            })
        }));
    }

    reloadPost() {
        // Reload the post list to update the comment count.
        // Consider only fetching a single post here, but it works for now.
        const { fetchPosts } = this.props;
        fetchPosts();
    }
}


//////// MAP TO PROPS //////////////////////////////

const mapStateToProps = (state, props) => ({
    comments: state.comment.list
        .sort(sortBy('voteScore', true))
        .filter(comment => !comment.deleted && comment.parentId === props.postId)
});

const mapDispatchToProps = dispatch => ({
    fetchComments: fetchComments(dispatch),
    upvoteComment: upvoteComment(dispatch),
    downvoteComment: downvoteComment(dispatch),
    addComment: addComment(dispatch),
    deleteComment: deleteComment(dispatch),
    updateComment: updateComment(dispatch),
    fetchPosts: fetchPosts(dispatch)
});

//////// EXPORTS //////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);   