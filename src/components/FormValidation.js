import React from 'react';
import validator from 'validator';

export const required = (value) => {
    if (!value.toString().trim().length) {
        return <div className="message-error">Laukelis negali būti tuščias</div>;
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return <div className="message-error">Neteisingas el.pašto formatas</div>;
    }
};

export const lt = (value, props) => {
    if (value.toString().trim().length > props.maxLength) {
        return <div className="message-error">Laukelio negali būti ilgesnis nei {props.maxLength} simbolių</div>;
    }
};
