import { deleteReview, addReply, addStars, editReview, toggleEditing, toggleReplying } from '../../actions';
import { connect } from 'react-redux';
import Review from '../ui/Review';

const mapStateToProps = state => ({
    reviews: state.reviews.list
});

const mapDispatchToProps = (dispatch, { data: { id } }) => ({
    onDelete() {
        dispatch(deleteReview(id));
    },
    onRate(stars) {
        dispatch(addStars(id, stars));
    },
    onReply(reply) {
        dispatch(addReply(id, reply));
        dispatch(toggleReplying(id));
    },
    onEdit(review) {
        dispatch(editReview(id, review));
    },
    onToggleEdit() {
        dispatch(toggleEditing(id));
    },
    onToggleReply() {
        dispatch(toggleReplying(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);