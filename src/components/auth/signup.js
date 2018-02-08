import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field component={renderField} name="email" type="email" className="form-control" label="Email"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field component={renderField} type="password" className="form-control" name="password" {...password} />
          {password}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field component={renderField} type="password" className="form-control" name="passwordConfirm" {...passwordConfirm} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up!</button>
      </form>
    );
  }
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} className="form-control" placeholder={label} type={type}/>
    {touched && error && <span className="error">{error}</span>}
  </div>
)

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter a email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(
  connect(mapStateToProps, actions)(Signup)
);