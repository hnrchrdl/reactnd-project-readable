import './PostDetails.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Post } from '../../components';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

class PostDetails extends Component {

    componentDidMount() {
        if(this.props.match.params && this.props.match.params.postid)
        this.props.fetchPost(this.props.match.params.postid)
    }

    render() {

        const { post } = this.props;
        return (
            <div className="post-details">
                { post && <Post post={post} showDetails={true}/> }
            </div>
        );
    }
}
const mapStateToProps = (state, props) => ({
    post: state.post.details
});

const mapDispatchToProps = dispatch => ({
    fetchPost: fetchPost(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
