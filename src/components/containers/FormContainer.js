import Form from '../ui/Form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';

const mapStateToProps = (state, props) => ({
    form: props.name,
    initialValues: props.data
})

const mapDispatchToProps = (dispatch, { data, name }) => ({
    changeFieldValues() {
        Object.keys(data).forEach(field => dispatch(change(name, field, data[field])));
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm()
)(Form);