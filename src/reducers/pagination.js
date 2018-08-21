import C from '../constants';

const initialState = {
    pageNumber: 0,
    itemsPerPage: 5,
    filteredReviews: []
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case C.FILTER_REVIEWS : 
            const { pageNumber, begin, end, reviews, reviewIds } = payload;
            return {
                ...state,
                pageNumber: pageNumber,
                filteredReviews: reviewIds.length > state.itemsPerPage ?
                reviewIds.filter((x, index) => index >= begin && index < end).map(index => reviews[index]) : 
                reviewIds.map(index => reviews[index])
            }
        default:
            return state
    }
}