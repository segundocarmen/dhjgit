import React from 'react';
import { Link } from 'react-router-dom';
export default class Listdropdownmenu extends React.Component{

	state = {
		name: this.props.name,
		items: this.props.items
	}

	mostrarItems = (items) =>{
		return items.map((item,index) =>(
			<Link className="dropdown-item" to={item.url} key={index}> {item.title}</Link>
		))
	}

	render(){
		return(
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.name}</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					{this.mostrarItems(this.state.items)}
				</div>
			</li>
		)
	}
}