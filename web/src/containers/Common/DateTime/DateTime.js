import React, { Component } from "react"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DateTime.css"

class DateTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: ''
		};
	}

	handleChange = (date) => {
		const { input } = this.props
		this.setState({
			date: date
		});

		if (input) {
			input.onChange(date)
		}
	}

	componentDidMount() {
		const { selected } = this.props
		if (selected) {
			const date = new Date(selected)
			this.setState({ date })
		}
	}

	render() {
		const { meta, error } = this.props
		const { date } = this.state
		return (
			<div className="form-group row">
				<label htmlFor="dateOfBirth" className="col-sm-3">Date Of Birth</label>
				<div className="col-sm-9">
					<DatePicker
						selected={date}
						onChange={this.handleChange}
						className={`form-control date-input ${meta.error && meta.touched && "border border-danger"}`}
					/>
					{meta.error && meta.touched && <small className="help-block form-text danger">{meta.error}</small>}
					{error && <small className="help-block form-text danger">{error}</small>}
				</div>
			</div>
		)
	}
}

export default DateTime