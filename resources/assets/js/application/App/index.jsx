import React from 'react';
import './index.css';
import Navigation from '../Navigation';
import HandleError from '../Error';

export default class Dhj extends React.Component{
	render(){
		return(
			<HandleError>
				<div>
					<Navigation />
					<div className="content">
						<div className="jumbotron">
							{this.props.children}
						</div>
					</div>
				</div>
			</HandleError>
		)
	}
}