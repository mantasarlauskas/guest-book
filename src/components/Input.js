import React, { Component } from 'react';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import { required, email } from './FormValidation';


class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderTextarea = this.renderTextarea.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.value !== prevProps.value) {
            this.setState({
                value: this.props.value
            }); 
            this.props.onChange(this.props.id, this.props.value, this.userInput)
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
        this.props.onChange(this.props.id, event.target.value, this.userInput);
    }

    renderInput() {
        const { id, type, editing } = this.props;
        const { value } = this.state;
        return (
            <Input value={value} 
                   onChange={this.handleChange} 
                   ref={c => { this.userInput = c }}
                   id={id} 
                   name={id}
                   type={type}
                   isChanged
                   maxLength={type === "email" ? 50 : 20}
                   validations={type === "email" ? [required, email] : [required]}
                   className={editing ? "edit-input" : undefined} />
        )
    }

    renderTextarea() {
        const { id, editing } = this.props;
        const { value } = this.state;
        return (
            <Textarea value={value} 
                      onChange={this.handleChange} 
                      ref={c => { this.userInput = c }}
                      id={id}
                      name={id}
                      maxLength={250}
                      validations={[required]}
                      isChanged
                      className={editing ? "edit-input" : undefined} />
        )
    }

    render() {
        const { id, name, input } = this.props;
        return (
            <div className="review-input">
                <label htmlFor={id}>{ name }</label>
                { input === "normal" ?  this.renderInput() : input === "textarea" ? this.renderTextarea() : null }
             </div>
        )
    }
}

export default InputComponent;