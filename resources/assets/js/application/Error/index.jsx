import React from 'react';

export default class Error extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			handleError : false
		}
	}
	componentDidCatch(error,info){
		this.setState({ handleError : true })
	}
	render(){
		if(this.state.handleError){
			return <p>Hubo un error</p>
		}
		return this.props.children
	}
}