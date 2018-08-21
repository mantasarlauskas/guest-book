import React, { Component } from 'react';
import { Field } from 'redux-form';
import { required, email, maxLength20, maxLength50, maxLength250 } from '../../formValidation';
import renderField from './Field';

class Form extends Component {
    componentDidUpdate(prevProps) {
        if(prevProps.initialValues !== this.props.initialValues) {
            const { changeFieldValues } = this.props;
            changeFieldValues();
        }
    }

    displayField(isTextarea, field) {
        const { editing } = this.props;
        return (
            <Field key={field.id}
                   label={field.name} 
                   name={field.id}
                   editing={editing}
                   textarea={isTextarea} 
                   id={field.id}
                   component={renderField} 
                   validate={isTextarea ? [required, maxLength250] :
                             field.type === "email" ? [required, email, maxLength50] :
                             field.type === "password" ? [required] : 
                             [required, maxLength20]}
                   type={!isTextarea && field.type} />
        )
    }

    render() {
        const { handleSubmit, fields, grid, editing, onSubmit, reset } = this.props;
        return (
            <form className="review-form clearfix" onSubmit={handleSubmit((data) => { onSubmit(data); reset(); })} noValidate>
                <div className={grid ? "input-grid" : undefined}>
                    { fields.filter(field => field.component === "input").map(this.displayField.bind(this, false)) }
                </div>
                { fields.filter(field => field.component === "textarea").map(this.displayField.bind(this, true)) }
                <button className="button" type="submit">{ editing ? "Redaguoti" : "Siųsti" }</button>
            </form>
        )
    }
}

export default Form;
