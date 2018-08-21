import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Menu from './Menu';
import Review from '../containers/ReviewContainer';
import Form from '../containers/FormContainer';
import { reviewFields, reviewValues } from '../../fields';

class Main extends Component {
  constructor(props) {
    super(props);
    this.addReview = this.addReview.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.displayPagination = this.displayPagination.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { reviews, pageNumber, reviewIds } = this.props;
    if(prevProps.reviews !== reviews || prevProps.reviewIds !== reviewIds) {
      this.filterReviews(pageNumber);
    }
  }

  addReview(review) {
    const { reviews, onSubmit } = this.props;
    onSubmit({
      ...review,
      id: Object.keys(reviews).length > 0 ? reviews[Object.keys(reviews)[Object.keys(reviews).length - 1]].id + 1 : 0,
      date: new Date(),
      children: [],
      stars: 0,
      editing: false,
      replying: false
    });
  }

  filterReviews(page) {
    const { itemsPerPage, reviews, onPageChange, reviewIds } = this.props, begin = page * itemsPerPage, end = begin + itemsPerPage;
    onPageChange(page, begin, end, reviews, reviewIds);
  }

  displayForm() {
    return (
      <Form name={"reviewForm"} 
            grid={true} 
            onSubmit={this.addReview} 
            fields={reviewFields} 
            data={reviewValues} />
    )
  }

  displayPagination() {
    const { reviewIds, itemsPerPage } = this.props;
    return (
      <ReactPaginate previousLabel=""
                     nextLabel=""
                     pageCount={Math.ceil(reviewIds.length/itemsPerPage)}
                     marginPagesDisplayed={1}
                     pageRangeDisplayed={5}
                     onPageChange={data => this.filterReviews(data.selected)}
                     containerClassName={"pagination"}
                     activeClassName={"active"} />
    )
  }

  render() {
    const { reviewIds, filteredReviews, itemsPerPage } = this.props;
    return (
      <div className="app-main">
        <Menu />
        <header className="app-main-header">
          <div className="app-main-title">Svečių knyga</div>
        </header>
        <div className="app-main-container">
          <div className="section-title">Atsiliepimo forma</div>
            { this.displayForm() }
          <div className="section-title">Atsiliepimai</div>
          <div className="reviews">
          { reviewIds.length ? filteredReviews.map(review => <Review key={review.id} data={review} />) : 
            <div className="empty-list">Atsiliepimų nėra</div> }
          </div>
          <div className="pagination-wrapper">
            { reviewIds.length > itemsPerPage && this.displayPagination() }
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
