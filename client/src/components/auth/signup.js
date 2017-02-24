import React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(formProps) {

		//call the action creator to signup the user
		this.props.signupUser(formProps);
	}
	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
				<strong>Come on now, get your login details right.</strong> {this.props.errorMessage}
				</div>
			);
		}
	}
	render() {
		const { handleSubmit, fields: { email, password, confirmpass }}=this.props;
		return(
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email: </label>
					<input {...email} className="form-control" />
					{email.touched && email.error && <div className="error">{email.error}</div>}
				</fieldset>
				<fieldset className="form-group">
					<label>Password: </label>
					<input {...password} type="password" className="form-control" />
					{password.error}
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm Password: </label>
					<input className="form-control" type="confirmpass" {...confirmpass} />
					{confirmpass.touched && confirmpass.error && <div className="error">{confirmpass.error}</div>}
					{this.renderAlert()}
				</fieldset>
				<button action="submit" className="btn btn-primary">Sign Me Up</button>
			</form>
		);
	}
}
function validate(formProps) {
	const errors = {};
	if (!formProps.email) {
		errors.email = "Yeah, that's not the right email";
	}
	if (!formProps.password) {
		errors.password = "Please enter a password";
	}
	if (!formProps.confirmpass) {
		errors.confirmpass = "All you have to do is match the other password you typed";
	}
	if (formProps.password !== formProps.confirmpass) {
		errors.password = "You only get 1 password. Pick one, then type it in both fields.";
	}
	console.log(formProps);
	return errors;
}

// function mapStateToProps(state) {
// 	return { errorMessage: state.auth.error };
// }

export default reduxForm({
	form: 'Signup',
	fields: ['email', 'password', 'confirmpass'],
	validate: validate
}, null, actions)(Signup);
