import validator from 'validator';

export const required = value => !value.toString().trim().length ? "Laukelis negali būti tuščias" : undefined;
export const email = value => !validator.isEmail(value) ? "Neteisingas el.pašto formatas" : undefined;
const maxLength = max => value => value && value.length > max ? `Laukelis negali viršyti ${max} simbolių` : undefined;
export const maxLength50 = maxLength(50), maxLength20 = maxLength(20), maxLength250 = maxLength(250);