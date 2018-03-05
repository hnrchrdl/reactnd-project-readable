import './CommentAdd.css'

import React, { Component } from 'react';

import Button from '../button/Button'

export default class AddComment extends Component {

    // some local state for form fields and validation
    state = {
        body: '',
        author: '',
        formErrMsg: null
    }

    render() {

        const { formErrMsg: err } = this.state;

        return (
            <div className="comment-add">
                {err && <div className="error">{err}</div>}
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
        const { body, author } = this.state;

        if (body && author) {
            // clear form fields and err msg
            this.setState({
                author: '',
                body: '',
                formErrMsg: null
            })
            // adds the comment
            addComment(this.state.body, this.state.author);
        } else {
            // some form error, show a error message
            this.setState({ formErrMsg: 'Cmon.' })
        }
    }

    handleUpdateUserInput(evt, key) {
        this.setState({
            [key]: evt.target.value
        });
    }
}