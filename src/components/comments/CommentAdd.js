import './CommentAdd.css'

import React, { Component } from 'react';

import Button from '../button/Button'

export default class AddComment extends Component {
    state = {
        body: '',
        author: ''
    }
    render() {
        return (
            <div className="comment-add">
                <input
                    placeholder="Name"
                    value={this.state.author}
                    onChange={evt => this.handleUpdateUserInput(evt, 'author')} />
                <textarea
                    placeholder="Comment"
                    value={this.state.body}
                    onChange={evt => this.handleUpdateUserInput(evt, 'body')}
                ></textarea>
                <Button
                    muted={true}
                    text="Send"
                    onClick={_ => this.handleAdd()}
                ></Button>
            </div>
        );
    }

    handleAdd() {
        const { addComment } = this.props;
        if (this.state.body && this.state.author) {
            this.setState({
                author: '',
                body: ''
            })
            addComment(this.state.body, this.state.author);
        }
    }

    handleUpdateUserInput(evt, key) {
        this.setState({
            [key]: evt.target.value
        });
    }
}