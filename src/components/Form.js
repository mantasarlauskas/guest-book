import React, { Component } from 'react';
import Input from './Input';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.displayInput = this.displayInput.bind(this);
        this.displayTextarea = this.displayTextarea.bind(this);
    }

    componentWillMount() {      
        this.setState({ inputs: this.props.inputs });
    }

    componentDidUpdate() {
        if(this.props.changed === true) {
            this.setState({ inputs: this.props.inputs });
            this.props.onChange();
        }
    }

    handleFieldChange(name, value) {
        this.setState(prevState =>({
            inputs: prevState.inputs.map(input => name === input.id ? {...input, value: value} : input)
        }));
    }

    submitForm(e) {
        e.preventDefault();
        this.props.editing ? this.props.onEdit(this.props.editID, this.state.inputs) : this.props.onSubmit(this.state.inputs);
    }

    displayInput(input) {
        return input.input === "normal" ?  (
            <Input key={input.id}
                   input={input.input}
                   id={input.id}
                   name={input.name}
                   type={input.type}
                   onChange={this.handleFieldChange}
                   value={input.value}
                   editing={this.props.editing} />
        ) : null;
    }

    displayTextarea(input) {
        return input.input === "textarea" ? (
            <Input key={input.id}
                    input={input.input}
                    id={input.id}
                    name={input.name}
                    onChange={this.handleFieldChange}
                    value={input.value}
                    editing={this.props.editing} />
        ) : null;
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="review-form clearfix">
                <div className={this.props.grid ? "input-grid" : undefined}>
                    {this.state.inputs.map(this.displayInput)}
                </div>
                {this.state.inputs.map(this.displayTextarea)}
                <button className="button">{this.props.editing ? "Redaguoti" : "Siųsti"}</button>
            </form>
        )
    }
}

export default Form;