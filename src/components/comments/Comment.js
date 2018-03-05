import './Comment.css'

import React, { Component } from 'react';

import Button from '../button/Button'
import { timestampToDateString } from '../../utils/helper';

export default class Comment extends Component {

    // the textarea element ref
    bodyInputRef

    render() {
        const {
            comment,
            upvote,
            downvote,
            del,
            update,
            enableEditMode,
            disableEditMode,
            isEditModeEnabled
        } = this.props;

        return (
            <div className="comment" >
                <div className="vote-wrapper">
                    <div className="votes">
                        <Button muted={true} text="+" onClick={_ => upvote()} />
                        <div className="vote-score">
                            {comment.voteScore}
                        </div>
                        <Button muted={true} text="-" onClick={_ => downvote()} />
                    </div>
                </div>
                <div className="comment-wrapper">
                    {isEditModeEnabled
                        ? (<div>
                            <textarea
                                defaultValue={comment.body}
                                ref={el => this.bodyInputRef = el}
                            ></textarea>
                            <div className="edit-buttons">
                                <Button
                                    text="cancel"
                                    onClick={_ => disableEditMode()}
                                />
                                <Button
                                    text="ok"
                                    onClick={_ => update(this.bodyInputRef.value)}
                                />
                            </div>
                        </div>
                        )
                        : <div className="comment-body"><pre>{comment.body}</pre></div>
                    }
                    <div className="credit">
                        {timestampToDateString(comment.timestamp)} by <b>{comment.author}</b>.
            </div>
                    <div className="options">
                        <span className="option" onClick={_ => enableEditMode()}>edit</span> |
                <span className="option" onClick={_ => del()}>delete</span>
                    </div>
                </div>
            </div >
        );
    }
}