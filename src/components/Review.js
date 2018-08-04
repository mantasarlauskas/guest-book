import React, { Component } from 'react';
import { FaStar, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import logo from '../img/avatar.png';

class Review extends Component {
    constructor(props) {
        super(props);
        this.getDate = this.getDate.bind(this);
        this.showStars = this.showStars.bind(this);
    }

    getDate(date) {
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }

    showStars(count) {
        const { onRate, data } = this.props;
        const { id, stars} = data;
        return <FaStar onClick={onRate.bind(null, id, count)} className={stars >= count ? 'active-star' : undefined } />;
    }

    render() {
        const { onDelete, onEdit, data, editing } = this.props;
        const { firstName, lastName, date, comment, id } = data;
        return (
            <div className="review">
                <div className="review-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="review-name">
                    {firstName + " " + lastName}
                </div>
                <div className="review-stars">
                    {this.showStars(1)}
                    {this.showStars(2)}
                    {this.showStars(3)}
                    {this.showStars(4)}
                    {this.showStars(5)}
                </div>
                <div className="review-action">
                    {!editing ? <FaTrashAlt onClick={onDelete.bind(null, id)} /> : null}
                    <FaPencilAlt onClick={onEdit.bind(null, id)} /> 
                </div>
                <div className="review-date">
                    {this.getDate(date)}
                </div>
                <div className="review-comment">
                    {comment}
                </div>
            </div> 
        );
    }
}

export default Review;