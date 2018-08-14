import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Menu from './Menu';
import Form from './Form';
import Review from './Review';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      itemsPerPage: 5,
      reviews: [],
      filteredReviews: [],
      editing: false,
      editID: undefined,
      fieldsChanged: false,
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
    this.addReview = this.addReview.bind(this);
    this.editReview = this.editReview.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.resetFormInputs = this.resetFormInputs.bind(this);
    this.addStars = this.addStars.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
    this.reply = this.reply.bind(this);
    this.changeChildren = this.changeChildren.bind(this);
    this.resetFieldsChanged = this.resetFieldsChanged.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.displayReview = this.displayReview.bind(this);
    this.displayPagination = this.displayPagination.bind(this);
  }

  componentDidMount() {
    let id = 0;
    fetch('https://randomapi.com/api/zpw4acqb?key=ZGJL-LPK9-YXW8-9E3V&results=1')
      .then(response => response.json())
      .then(people => {
        if(people.results) {
          this.setState({
            reviews: people.results.map(review => ({...review.customer, id: id++, children: []}))
          })
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.reviews !== prevState.reviews || this.state.pageNumber !== prevState.pageNumber) {
      const { pageNumber, itemsPerPage } = this.state, begin = pageNumber * itemsPerPage, end = begin + itemsPerPage;
      this.setState(prevState => {
        const reversedReviews = prevState.reviews.slice(0).reverse();
        return {
          filteredReviews: reversedReviews.length > itemsPerPage ? reversedReviews.slice(begin, end) : reversedReviews
        }
      });
    }
  }

  maxID(max, reviews) {
    reviews.forEach(review => {
      max = review.id > max ? review.id : max;
      max = review.children.length > 0 ? this.maxID(max, review.children) : max;
    });
    return max;
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
            id: this.maxID(-1, prevState.reviews) + 1,
            date: new Date(),
            children: []
          }
        ],
        fieldsChanged: true
      }
    ));
  }

  findReviewById(id, reviews) {
    for(let review of reviews) {
      if(review.id === id) return review;
      if(review.children.length > 0) {
        const review_ = this.findReviewById(id, review.children);
        if(review_) return review_;
      }
    }
  }

  editReview(id) {
    const review = this.findReviewById(id, this.state.reviews);     
    this.setState(prevState => ({
      editing: true,
      editID: review.id,
      fieldsChanged: true,
      formInputs: prevState.formInputs.map(input => {
        Object.keys(review).forEach(k => input.value = k === input.id ? review[k] : input.value);
        return input;
      })      
    }));
  }

  changeReviewData(newReview, oldReview) {
    return {
      ...newReview, 
      logo: oldReview.logo, 
      id: oldReview.id,
      stars: oldReview.stars, 
      date: new Date(),
      children: oldReview.children
    }
  }

  changeStarsCount(stars, oldReview) {
    return {
      ...oldReview, 
      stars: stars
    }
  }

  changeChildren(newReply, oldReview) {
    return {
      ...oldReview,
      children: [
        ...oldReview.children,
        {
          ...newReply,
          id: this.maxID(-1, this.state.reviews) + 1,
          date: new Date(),
          children: []
        }
      ]
    }
  }

  changeReview(id, newData, reviews, action) {
    return reviews.map(review => {
      if(review.id === id) return action(newData, review);  
      if(review.children.length > 0) return { ...review, children: this.changeReview(id, newData, review.children, action) };
      return review;
    });
  }

  submitEdit(id, review) {
    let newReview = {}; 
    review.forEach(reviewData => newReview[reviewData.id] = reviewData.value);
    this.setState(prevState => ({
      editing: false,
      editID: undefined,
      reviews: this.changeReview(id, newReview, prevState.reviews, this.changeReviewData)
    }), this.resetFormInputs);
  }

  resetFormInputs() {
    this.setState(prevState => ({
        formInputs: prevState.formInputs.map(input => ({...input, value: ''})),
        fieldsChanged: true
    }));
  }

  addStars(id, stars) {
    this.setState(prevState => ({
        reviews: this.changeReview(id, stars, prevState.reviews, this.changeStarsCount)
    }));
  }

  filterReviews(id, reviews) {
    return reviews.filter(review => review.id !== id).map(review => {
      if(review.children.length > 0) return { ...review, children: this.filterReviews(id, review.children) };
      return review;
    });
  }

  deleteReview(id) {
    this.setState(prevState => ({
      reviews: this.filterReviews(id, prevState.reviews)
    }))
  }

  reply(id, inputs) {
    let answers = {}; 
    inputs.forEach(inputData => answers[inputData.id] = inputData.value);
    this.setState(prevState => ({
      reviews: this.changeReview(id, answers, prevState.reviews, this.changeChildren),
      fieldsChanged: true
    }));
  }

  resetFieldsChanged() {
    this.setState({
      fieldsChanged: false
    });
  }

  handlePageClick(data) {
    this.setState({
      pageNumber: data.selected
    });
  }

  displayForm() {
    const { editing, fieldsChanged, editID, formInputs } = this.state;
    return (
      <Form editing={editing}
            grid={true}
            fieldsChanged={fieldsChanged}
            editID={editID} 
            inputs={formInputs} 
            onLoad={this.resetFieldsChanged}
            onSubmit={this.addReview} 
            onEdit={this.submitEdit} />
    )
  }

  displayReview(review) {
    const { formInputs, editing } = this.state;
    return (
      <Review key={review.id}
              inputs={formInputs} 
              data={review}
              editing={editing} 
              onRate={this.addStars}
              onEdit={this.editReview}
              onDelete={this.deleteReview}
              onReply={this.reply} />
    )
  }

  displayPagination() {
    const { reviews, itemsPerPage } = this.state;
    return (
      <ReactPaginate previousLabel=""
                     nextLabel=""
                     pageCount={Math.ceil(reviews.length/itemsPerPage)}
                     marginPagesDisplayed={1}
                     pageRangeDisplayed={5}
                     onPageChange={this.handlePageClick}
                     containerClassName={"pagination"}
                     activeClassName={"active"} />
    )
  }

  render() {
    const { reviews, filteredReviews, itemsPerPage } = this.state;
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
            { reviews.length ? filteredReviews.map(this.displayReview) : <div className="empty-list">Atsiliepimų nėra</div> }
          </div>
          <div className="pagination-wrapper">
            { reviews.length > itemsPerPage && this.displayPagination() }
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
