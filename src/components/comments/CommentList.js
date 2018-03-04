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
import { sortBy } from '../../utils/helper'

//////// COMPONENT //////////////////////////////

class CommentList extends Component {

    state = {
        // editCommments is a list of comment ids that are in edit mode.
        editComments: []
    }
    // Fetch Comments from Post ID.
    componentDidMount() {
        const { postId, fetchComments, upvoteComment, downvoteComment, addComment } = this.props;
        fetchComments(postId);
    }

    render() {
        const { comments, postId, upvoteComment, downvoteComment, deleteComment, updateComment } = this.props;
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
                                del={_ => deleteComment(comment.id)}
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
        addComment({ body, author, parentId })
    }

    updateCommentHelper = ({ id, body }) => {
        const { updateComment } = this.props;
        this.disableEdit(id);
        updateComment({ id, body })
    }

    enableEdit = (id) => {
        this.setState(state => ({
            editComments: [...state.editComments, id]
        }))
    }

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
    updateComment: updateComment(dispatch)
});

//////// EXPORTS //////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);