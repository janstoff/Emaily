// SurveyForm shows an input form for users to create a survey
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' //enables component to access redux form functionality
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func, //from reduxForm
    onSurveySubmit: PropTypes.func
	}

	render() {
		return (
			<div>
				<h4 style={{ marginBottom: 30 }}>Create Survey</h4>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{formFields.map(({ label, name }) => (
						<Field
							key={label}
							label={label}
							type="text"
							name={name}
							component={SurveyField}
						/>
					))}
					<Link to="/surveys" className="red btn-flat white-text">
						cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		)
	}
}

function validate(values) {
	const errors = {}

	errors.recipients = validateEmails(values.recipients || ' ')

	formFields.forEach(({ name, errorMessage }) => {
		if (!values[name]) {
			errors[name] = errorMessage
		}
	})

	return errors //if errors empty form is considered valid
}

export default reduxForm({
	validate,
	form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)
