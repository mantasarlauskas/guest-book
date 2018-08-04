import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Menu from './Menu';
import Form from './Form';
import Review from './Review';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      filteredReviews: [],
      editing: false,
      editID: null,
      changed: false,
      formInputs: [
        {
          input: "normal",
          id: "firstName",
          name: "Vardas",
          type: "text",
          value: ''
        },
        {
          input: "normal",
          id: "lastName",
          name: "Pavardė",
          type: "text",
          value: ''
        },
        {
          input: "normal",
          id: "email",
          name: "El. paštas",
          type: "email",
          value: ''
        },
        {
          input: "textarea",
          id: "comment",
          name: "Atsiliepimas",
          value: ''
        },
      ]
    }
    this.pageNumber = 0;
    this.addReview = this.addReview.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.addStars = this.addStars.bind(this);
    this.setID = this.setID.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.filterReviewsByPage = this.filterReviewsByPage.bind(this);
    this.editReview = this.editReview.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
    this.setBaseState = this.setBaseState.bind(this);
    this.clearFieldsSuccess = this.clearFieldsSuccess.bind(this);
  }

  addReview(review) {
    let newReview = {}; 
    review.forEach(reviewData => newReview[reviewData.id] = reviewData.value);
    this.setState(prevState => (
        {
          reviews: [
            ...prevState.reviews,
            {
              ...newReview,
              id: this.setID(),
              date: new Date()
            }
          ],
          changed: true
        }
      )
    );
  }

  submitEdit(id, review) {
    let newReview = {}; 
    review.forEach(reviewData => newReview[reviewData.id] = reviewData.value);
    this.setState(prevState => ({
      editing: false,
      editID: null,
      reviews: prevState.reviews.map(review => review.id !== id ? review : {...newReview, id: review.id, date: new Date()})
    }), this.setBaseState);
  }

  setBaseState() {
    this.setState(prevState => ({
        formInputs: prevState.formInputs.map(input => ({...input, value: ''})),
        changed: true
    }));
  }

  deleteReview(id) {
    this.setState(prevState => ({
      reviews: prevState.reviews.filter(review => review.id !== id)
    }))
  }

  setID() {
    const { reviews } = this.state;
    return reviews.length === 0 ? 0 : reviews[reviews.length - 1].id + 1;
  }

  clearFieldsSuccess() {
    this.setState({
      changed: false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.reviews.length !== prevState.reviews.length || this.state.reviews !== prevState.reviews) {
      this.filterReviewsByPage();
    }
  }

  addStars(id, stars) {
    this.setState(prevState => ({
        reviews: prevState.reviews.map(review => review.id !== id ? review : {...review, stars: stars})
    }));
  }

  filterReviewsByPage() {
    const begin = this.pageNumber * 5, end = begin + 5;
    this.setState(prevState => ({
      filteredReviews: prevState.reviews.length > 5 ? prevState.reviews.slice(begin, end) : prevState.reviews
    }));
  }

  handlePageClick(data) {
    this.pageNumber = data.selected;
    this.filterReviewsByPage();
  }

  editReview(id) {
    const review = this.state.reviews.find(review => review.id === id);
    const inputs = this.state.formInputs;
    inputs.forEach(input => {
      Object.keys(review).forEach(k => {
        if(k === input.id) {
          input.value = review[k];
        }
      });
    });
    this.setState({
      editing: true,
      editID: review.id,
      formInputs: inputs       
    });
  }

  render() {
    const { editing, reviews, filteredReviews, formInputs, editID, changed } = this.state;
    return (
      <div className="app-main">
        <Menu />
        <header className="app-main-header">
          <div className="app-main-title">Svečių knyga</div>
        </header>
        <div className="app-main-container">
          <div className="section-title">Atsiliepimo forma</div>
          <Form editing={editing}
                grid={true}
                changed={changed}
                editID={editID} 
                inputs={formInputs} 
                onChange={this.clearFieldsSuccess}
                onSubmit={this.addReview} 
                onEdit={this.submitEdit} />
          <div className="section-title">Atsiliepimai</div>
          <div className="reviews">
            {
              reviews.length ? filteredReviews.map(review => <Review key={review.id} 
                                                                     data={review}
                                                                     editing={editing} 
                                                                     onRate={this.addStars}
                                                                     onEdit={this.editReview}
                                                                     onDelete={this.deleteReview} />) :
              <div className="empty-list">Atsiliepimų nėra</div>
            }
          </div>
          <div className="pagination-wrapper">
            {
              reviews.length > 5 ? <ReactPaginate previousLabel=""
                                                  nextLabel=""
                                                  pageCount={Math.ceil(reviews.length/5)}
                                                  marginPagesDisplayed={1}
                                                  pageRangeDisplayed={5}
                                                  onPageChange={this.handlePageClick}
                                                  containerClassName={"pagination"}
                                                  subContainerClassName={"pages pagination"}
                                                  activeClassName={"active"} /> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
