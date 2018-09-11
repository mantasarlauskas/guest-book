import React from 'react';
import { FaStar, FaPencilAlt, FaTrashAlt, FaReply } from 'react-icons/fa';
import Form from '../containers/FormContainer';
import { reviewFields, reviewValues } from '../../fields';
import ReviewContainer from '../containers/ReviewContainer';

const Review = ({ onDelete, data, onToggleEdit, onToggleReply, onRate, onEdit, reviews, onReply }) => {
    let editingValues = {};
    const { firstName, lastName, date, comment, logo, children, editing, replying, stars, id } = data;

    Object.keys(reviewValues).forEach(name => editingValues[name] = data[name]);

    const checkDate = dateTime => dateTime < 10 ? `0${dateTime}` : dateTime;

    const getDate = date => `${date.getFullYear()}/${checkDate(date.getMonth()+1)}/${checkDate(date.getDate())} 
    ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`;

    const showStars = count => <FaStar onClick={() => onRate(count)} className={stars >= count ? 'active-star' : undefined} />;

    const editReview = review => onEdit({ ...review, date: new Date(), editing: false });
    
    const addReply = reply => onReply({ 
        ...reply,
        id: reviews[Object.keys(reviews).length - 1].id + 1,
        date: new Date(),
        children: [],
        stars: 0,
        editing: false,
        replying: false
    });

    const displayReview = id => <ReviewContainer key={id} data={reviews[id]} editing={editing} />;

    const displayForm = () => (
        <div>
            <div className="section-title">{ editing ? "Redagavimo" : "Atsakymo" } forma</div>
            <Form editing={editing}
                    grid={true}
                    name={id.toString()}
                    fields={reviewFields}
                    data={editing ? editingValues : reviewValues} 
                    onSubmit={editing ? editReview : addReply} />
        </div>
    )

    return (
        <div>
            <div className={replying || editing ? "review-dark-wrapper" : undefined}>
                <div key="review" className="review">
                    <div className="review-logo">
                        <img src={logo ? logo : 'img/avatar.png'} alt="Logo" />
                    </div>
                    <div className="review-name">
                        { `${firstName} ${lastName}` }
                    </div>
                    <div className="review-stars">
                        { showStars(1) }
                        { showStars(2) }
                        { showStars(3) }
                        { showStars(4) }
                        { showStars(5) }
                    </div>
                    <div className="review-action">
                        { (!editing  && !replying) && <FaTrashAlt onClick={onDelete} /> }
                        <FaPencilAlt onClick={onToggleEdit} /> 
                        <FaReply onClick={onToggleReply} />
                    </div>
                    <div className="review-date">
                        { getDate(new Date(date)) }
                    </div>
                    <div className="review-comment">
                        { comment }
                    </div>
                </div>
                <div key="reply-form">
                    { (replying || editing) && displayForm() }
                </div>
            </div>
            <div key="children" className="children">
                { children.length > 0 && children.map(displayReview) }
            </div>
        </div>
    ); 
} 

export default Review;