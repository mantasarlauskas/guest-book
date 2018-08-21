import React from 'react';

export default ({ input, textarea, editing, id, label, type, meta: { touched, error } }) =>  (
    <div className="review-input">
        <label htmlFor={id}>{ label }</label>
        { textarea ? <textarea {...input} id={id} className={editing ? "edit-input" : undefined} /> :
        <input {...input} id={id} type={type} className={editing ? "edit-input" : undefined} /> }
        { touched && error && <div className="message-error">{ error }</div> }
    </div>
);