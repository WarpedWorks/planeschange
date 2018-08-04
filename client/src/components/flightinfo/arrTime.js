import React, { Component } from 'react';


	function timeConverter(UNIX_timestamp){
		let a = new Date(UNIX_timestamp * 1000);
		let hour = a.getHours(); // looks like this is EDT
		let min = a.getMinutes();
		let time;

		if (hour > 12) {
			return time = (hour - 12) + ':' + min + ' PM EDT';
		} else {
			return time = hour + ':' + min + ' AM EDT';
		}
	}



class ArrivalTime extends Component {

	render() {

		let convertedTime = timeConverter(this.props.estimatedarrivaltime);	

		return (
			<h4>Arrival Time: {convertedTime}</h4>
		)
	}
}


export default ArrivalTime;