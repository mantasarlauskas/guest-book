import React, { Component } from 'react';


class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderTextarea = this.renderTextarea.bind(this);
    }

    componentDidUpdate(prevState) {
        if(this.props.value !== prevState.value) {
            this.setState({
                value: this.props.value
            })
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
        this.props.onChange(this.props.id, event.target.value);
    }

    renderInput() {
        const { id, type, editing } = this.props;
        const { value } = this.state;
        return (
            <input value={value} 
                   onChange={this.handleChange} 
                   id={id} 
                   type={type}
                   required
                   className={editing ? "edit-input" : undefined} />
        )
    }

    renderTextarea() {
        const { id, editing } = this.props;
        const { value } = this.state;
        return (
            <textarea value={value} 
                      onChange={this.handleChange} 
                      id={id}
                      required
                      className={editing ? "edit-input" : undefined} />
        )
    }

    render() {
        const { id, name, input } = this.props;
        return (
            <div className="review-input">
                <label htmlFor={id}>{name}</label>
                {input === "normal" ?  this.renderInput() : input === "textarea" ? this.renderTextarea() : null}
             </div>
        )
    }
}

export default Input;