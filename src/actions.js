import C from './constants';
import { normalize, schema } from 'normalizr';

export const addReview = review => ({
    type: C.ADD_REVIEW,
    payload: review
});

export const editReview = (id, review) => ({
    type: C.EDIT_REVIEW,
    payload: { id, review }
});

export const addStars = (id, stars) => ({
    type: C.ADD_STARS,
    payload: { id, stars }
});

export const deleteReview = id => ({
    type: C.DELETE_REVIEW,
    payload: id
});

export const addReply = (id, reply) => ({
    type: C.ADD_REPLY,
    payload: { id, reply }
});

export const toggleEditing = id => ({
    type: C.TOGGLE_EDITING,
    payload: id
});

export const toggleReplying = id => ({
    type: C.TOGGLE_REPLYING,
    payload: id
});

export const filterReviews = (pageNumber, begin, end, reviews, reviewIds) => ({
    type: C.FILTER_REVIEWS,
    payload: { pageNumber, begin, end, reviews, reviewIds }
});

const fetchData = people => ({
    type: C.FETCH_DATA,
    payload: people
});

export const getData = value => dispatch => {
    fetch('https://randomapi.com/api/zpw4acqb?key=ZGJL-LPK9-YXW8-9E3V&results=' + value)
        .then(response => response.json())
        .then(people => {
            if(people.results) {
                const review = new schema.Entity('reviews');
                dispatch(fetchData(normalize(people.results.map((review, index) => ({ ...review.customer, id: index })), [review])));
            }
        });
};
