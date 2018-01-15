import './CategorySwitcher.css'

import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../../actions/category'

class CategorySwitcher extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {

    let { categories } = this.props
    categories = [ { path: null, name: 'all' }, ...categories];

    return (
      <div className="category-switcher">
        { this._renderCategoryList(categories) }
      </div>
    );
  }

  _renderCategoryList(categories) {

    if(categories) {
      return (
        <ul>
          { categories.map((category, idx) => this._renderCategory(category, idx)) }
        </ul>
      )
    }
    return;
  }

  _renderCategory (category, idx) {
    return (
      <li key={idx}>
        <NavLink to={ category.path ? `/${category.path}` : '/' } exact={ true }>{category.name}</NavLink>
      </li>
    )
  }

}

const mapStateToProps = (state, props) => ({
  categories: state.category.list
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: _ => fetchCategories(dispatch)
})

// passing { pure: false } to connect ensures correct rendering of currently active NavLink 
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(CategorySwitcher);

