import { addReview, filterReviews } from '../../actions';
import { connect } from 'react-redux';
import Main from '../ui/Main';

const mapStateToProps = ({ reviews: { list, visibleListIds }, pagination: { filteredReviews, pageNumber, itemsPerPage }}) => ({
    reviews: list,
    reviewIds: visibleListIds,
    filteredReviews,
    pageNumber,
    itemsPerPage
});

const mapDispatchToProps = dispatch => ({		
    onSubmit(review) {
        dispatch(addReview(review));
    },
    onPageChange(pageNumber, begin, end, reviews, reviewIds) {
        dispatch(filterReviews(pageNumber, begin, end, reviews, reviewIds));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);