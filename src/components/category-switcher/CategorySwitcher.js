import './CategorySwitcher.css'

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchCategories } from '../../actions/category'

class CategorySwitcher extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategoryList() {
    console.log(this.props)
    const { categories } = this.props

    if(categories) {
      return (
        <ul>
        { categories.map((category, idx) => (
          <li key={idx}>
            <a href={`category/${category.path}`}>{category.name}</a>
          </li>
        )) }
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="category-switcher">
        { this.renderCategoryList() }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.category.list
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: _ => fetchCategories()(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorySwitcher);
