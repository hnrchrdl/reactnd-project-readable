import './PostList.css'

import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Post } from '../../components'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions'
import { sortBy } from '../../utils/helper'

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

  constructor(){
    
    super()

    // set default state
    const posts = []
    const match = {}
    const { key: sortKey, reverse: sortReverse, primer: sortPrimer } = SORT_OPTIONS[0]
    this.state = { posts, match, sortKey, sortReverse,sortPrimer}
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {

    let { posts = [], match = {} } = this.props
    const { sortKey, sortReverse, sortPrimer } = this.state
    
    // filter and sort posts
    posts = posts
      .filter(post => {
        if (match.params && match.params.category) {
          return post.category === match.params.category
        }
        return true
      })
      .sort(sortBy(sortKey, sortReverse, sortPrimer))


    return (
      <div className="post-list">
        { this._renderSortBar(posts) }
        { this._renderPostList(posts) }
      </div>
    )
  }

  _renderPostList(posts) {
    
    if (posts.length > 0) {
      return (
        <div>
          { posts.map(post => (
            <Post key= { post.id } post={ post } 
                  showDetails={ false }/>
          ))}
        </div>
      )
    }
    return;
  }

  _renderSortBar(posts) {
    if (posts.length > 0) {
      return (
        <div className="options sort-posts">
          { posts.length } post{ posts.length === 1 ? '' : 's' }.
          { posts.length > 1 ? <span> sort by </span> : '' }
          { SORT_OPTIONS.map((option, idx) => (
             posts.length > 1
               ? (
                 <span key={option.key}>
                   <span className="option" onClick={ _ => this._sortPosts(option) }>{ option.display }</span>
                   <span>{ idx !== SORT_OPTIONS.length - 1 ? ' | ' : '' }</span>
                 </span> )
               : ''
           )) }
        </div>
      )
    } else {
      return (
        <div className="options">
          0 posts. <Link to="edit">Add a new one</Link>!
        </div>
      )
    }
  }

  _sortPosts(option) {
    this.setState((prev) => {
      const sortReverse = prev.sortKey === option.key
        ? !prev.sortReverse
        : option.reverse
      
      return {
        sortKey: option.key,
        sortReverse,
        sortPrimer: option.primer
      }
    })
  }
  
}
const mapStateToProps = (state, props) => ({
  posts: state.post.posts
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: fetchPosts(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
