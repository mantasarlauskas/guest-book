import React, { Component } from 'react';
import Input from './Input';
import Form from 'react-validation/build/form';

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            inputData: {}
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
        if(this.props.fieldsChanged === true) {
            this.setState({ inputs: this.props.inputs }, this.props.onLoad);
        }
    }

    handleFieldChange(name, value, input) {
        this.setState(prevState => ({
            inputs: prevState.inputs.map(input => name === input.id ? {...input, value: value} : input),
            inputData: {
                ...prevState.inputData,
                [name]: input
            }
        }));
    }

    submitForm(e) {
        const { inputs, inputData } = this.state; 
        e.preventDefault();
        inputs.forEach(input => this.form.validate(input.id));
        if(this.form.getChildContext()._errors.length === 0) {
            Object.keys(inputData).forEach(key => this.form.hideError(inputData[key]));
            this.props.editing ? this.props.onEdit(this.props.editID, inputs) : this.props.onSubmit(inputs);  
        }
    }

    displayInput(input) {
        return input.input === "normal" &&  (
            <Input key={input.id}
                   input={input.input}
                   id={input.id}
                   name={input.name}
                   type={input.type}
                   onChange={this.handleFieldChange}
                   value={input.value}
                   editing={this.props.editing} />
        );
    }

    displayTextarea(input) {
        return input.input === "textarea" && (
            <Input key={input.id}
                   input={input.input}
                   id={input.id}
                   name={input.name}
                   onChange={this.handleFieldChange}
                   value={input.value}
                   editing={this.props.editing} />
        );
    }

    render() {
        const { grid, editing, reply } = this.props;
        return (
            <Form ref={c => { this.form = c }} 
                  onSubmit={this.submitForm} 
                  className={reply ? "review-form clearfix reply-form" : "review-form clearfix"} 
                  noValidate>
                <div className={grid ? "input-grid" : undefined}>
                    { this.state.inputs.map(this.displayInput) }
                </div>
                { this.state.inputs.map(this.displayTextarea) }
                <button className="button">{ editing ? "Redaguoti" : "Siųsti" }</button>
            </Form>
        )
    }
}

export default FormComponent;