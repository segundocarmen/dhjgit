import React from 'react';
import './index.css';
import { Menu,MenuUser } from '../../config/menu';
import Dropdownmenu from './Listdropdownmenu';
import systemLogoHeader from '../../../img/logo-texto.png';
import { Link } from 'react-router-dom';
/*FORMULARIOS*/
import FormAbout from './formAbout';
import Modal from '../Pages/widgets/modal';
export default class Navigation extends React.Component{

	state={
		menus : Menu,
		itemsUser : MenuUser.usuario,
		modalAbout:false
	}

	About = (event) =>{
		event.preventDefault();
		this.setState({ modalAbout:true })
		setTimeout(()=>{
			$("#aboutUs").modal('show');
		},500)
	}

	handleClose = () =>{
		this.setState({ modalAbout:false })
	}

	render(){
		return(
			<nav className="navbar navbar-expand-md navbar-dark navbar-laravel bg-warning">
				<Link className="navbar-brand" to="/sistema">
					<img src={systemLogoHeader} alt="Sistema integrado DHJ" title="Sistema integrado DHJ"/>
				</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto nav-left">
						{
							this.state.menus.map((item,index) =>
								<Dropdownmenu name={item.list.name} items={item.list.items} key={index}/>
							)
						}
					</ul>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.itemsUser.name}</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								{
									this.state.itemsUser.items.map((item,index) =>
										<a 
											className="dropdown-item" href={item.url} key={index} onClick={item.about && this.About}> {item.title}</a>
									)
								}
							</div>
						</li>
					</ul>
				</div>
				{
					this.state.modalAbout &&
					<Modal small='xs' title='Acerca de DHJsystem' id="aboutUs">
						<FormAbout handleClose={this.handleClose} />
					</Modal>
				}
			</nav>
		)
	}
}