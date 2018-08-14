import React, { Component } from 'react';
import { FaStar, FaPencilAlt, FaTrashAlt, FaReply } from 'react-icons/fa';
import defaultLogo from '../img/avatar.png';
import Form from './Form';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replying: false
        }
        this.toggleReply = this.toggleReply.bind(this);
        this.reply = this.reply.bind(this);
        this.displayReplyForm = this.displayReplyForm.bind(this);
        this.displayReview = this.displayReview.bind(this);
    }

    checkDate(dateTime) {
        return dateTime < 10 ? `0${dateTime}` : dateTime;
    }

    getDate(date) {
        return `${date.getFullYear()}/${this.checkDate(date.getMonth()+1)}/${this.checkDate(date.getDate())} 
        ${this.checkDate(date.getHours())}:${this.checkDate(date.getMinutes())}`;
    }

    showStars(count) {
        const { onRate, data } = this.props;
        const { id, stars} = data;
        return <FaStar onClick={onRate.bind(null, id, count)} className={stars >= count ? 'active-star' : undefined} />;
    }

    toggleReply() {
        this.setState(prevState => ({
            replying: !prevState.replying
        }));
    }

    reply(inputs) {
        this.props.onReply(this.props.data.id, inputs);
        this.toggleReply();
    }

    displayReplyForm() {
        return [
            <div key="title" className="section-title">Atsakymo forma</div>,
            <Form grid={true}
                  reply={true}
                  key="reply-form"
                  inputs={this.props.inputs.map(input => ({...input, value: ''}))} 
                  onSubmit={this.reply} />
        ];
    }

    displayReview(review) {
        const { inputs, editing, onRate, onEdit, onDelete, onReply } = this.props;
        return (
            <Review key={review.id}
                    inputs={inputs} 
                    data={review}
                    editing={editing} 
                    onRate={onRate}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReply={onReply} />
        )
    }

    render() {
        const { onDelete, onEdit, data, editing } = this.props;
        const { firstName, lastName, date, comment, id, logo, children } = data;
        return [
            <div key="review" className="review">
                <div className="review-logo">
                    <img src={logo ? logo : defaultLogo} alt="Logo" />
                </div>
                <div className="review-name">
                    { `${firstName} ${lastName}` }
                </div>
                <div className="review-stars">
                    { this.showStars(1) }
                    { this.showStars(2) }
                    { this.showStars(3) }
                    { this.showStars(4) }
                    { this.showStars(5) }
                </div>
                <div className="review-action">
                    { !editing && <FaTrashAlt onClick={onDelete.bind(null, id)} /> }
                    <FaPencilAlt onClick={onEdit.bind(null, id)} /> 
                    <FaReply onClick={this.toggleReply} />
                </div>
                <div className="review-date">
                    { this.getDate(new Date(date)) }
                </div>
                <div className="review-comment">
                    { comment }
                </div>
            </div>,
            <div key="children" className="children">
                { children.length > 0 && children.map(this.displayReview) }
            </div>,
            <div key="reply-form">
                { this.state.replying && this.displayReplyForm() }
            </div>
        ];
    }
}

export default Review;