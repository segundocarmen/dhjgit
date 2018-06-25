import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faCubes from '@fortawesome/fontawesome-free-solid/faCubes';
import faBoxOpen from '@fortawesome/fontawesome-free-solid/faBoxOpen';
import faRetweet from '@fortawesome/fontawesome-free-solid/faRetweet';
import faReceipt from '@fortawesome/fontawesome-free-solid/faReceipt';
import faPaperPlane from '@fortawesome/fontawesome-free-solid/faPaperPlane';
import './buttons.css';


export default class ButtonsControl extends React.Component{
	constructor(props){
		super(props)
		this.state={
			
		}
	}
	GetItems = () =>{
		var items = localStorage.getItem('selectItems');
		var arr = [];
		if(items == '[]'){
			alert('Seleccione un registro.');
			return null;
		}else{
			arr = JSON.parse(items);
			return arr;
		}
	}
	GetItemsModal = () =>{
		var items = localStorage.getItem('selectItemsModal');
		var arr = [];
		if(items == '[]'){
			alert('Seleccione un registro.');
			return null;
		}else{
			arr = JSON.parse(items);
			return arr;
		}
	}

	DeleteData = () =>{
		var eliminados = this.GetItems();
		if(eliminados != null){
			var conf = confirm('¿Desea eliminar los registros seleccionados?');
			if(conf){
				var objElimina = new Object();
				objElimina.cantidad = eliminados.length;
				objElimina.data=eliminados;
				this.props.handleRemove(objElimina);	
			}else{
				return null;
			}
		}
	}

	EditData = () =>{
		var editados = this.GetItems();
		if(editados != null){
			if(editados.length > 1){
				alert('Debe editar un registro a la vez.');
				return null;
			}else{
				this.props.handleEdit(editados);
			}
		}
	}

	Consolidar = () =>{
		var consolidar = this.GetItems();
		if(consolidar != null){
			var conf = confirm('¿Desea consolidar los registros seleccionados?');
			if(conf){
				this.props.handleConsolida(consolidar);	
			}else{
				return null;
			}
		}
	}

	Liberar = () =>{
		if(this.props.modal){
			var liberar = this.GetItemsModal();
			if(liberar != null){
				var conf = confirm('¿Desea liberar los registros seleccionados?');
				if(conf){
					var objLiberar = new Object();
					objLiberar.lista = liberar;
					this.props.handleLiberar(objLiberar);	
				}else{
					return null;
				}
			}
		}else{
			var liberar = this.GetItems();
			if(liberar != null){
				var conf = confirm('¿Desea liberar los registros seleccionados?');
				if(conf){
					var objLiberar = new Object();
					objLiberar.lista = liberar;
					objLiberar.estado = $("#lstEstadoIngreso").val();
					this.props.handleLiberar(objLiberar);	
				}else{
					return null;
				}
			}
		}
	}

	AddManifiesto = () =>{
		var adds = this.GetItems();
		if(adds != null){
			var conf = confirm('¿Desea agregar los registros seleccionados a un manifiesto?');
			if(conf){
				var objManifiesto = new Object();
				objManifiesto.cantidad = adds.length;
				objManifiesto.data=adds;
				this.props.handleManifiesto(objManifiesto);	
			}else{
				return null;
			}
		}
	}

	VerDetallesConsolidado = () =>{
		var seleccionados = this.GetItems();
		if(seleccionados != null){
			if(seleccionados.length > 1){
				alert('Debe seleccionar un registro a la vez.');
				return null;
			}else{
				this.props.handleDetallesConsolidado(seleccionados);
			}
		}
	}

	validateRender = () =>{

		return(
			<div className="control_buttons" id="control_buttons">
				{
					this.props.newButton &&
					<button 
						className="btn btn-info" 
						data-toggle="modal" 
						data-target="#nuevoElemento">
						<FontAwesomeIcon className="fa-active" icon={faFile}/> Nuevo
					</button>
				}
				{
					this.props.editButton &&
					<button 
						className="btn btn-warning" 
						onClick={this.EditData}>
						<FontAwesomeIcon className="fa-active" icon={faEdit}/> Editar
					</button>
				}
				{
					this.props.deleteButton &&
					<button 
						className="btn btn-danger" 
						onClick={this.DeleteData}>
						<FontAwesomeIcon className="fa-active" icon={faTrashAlt}/> Eliminar
					</button>
				}
				{
					this.props.consolidarButtons && this.props.showButton =='PD' &&
					<button 
						className="btn btn-dark" 
						onClick={this.Consolidar}>
						<FontAwesomeIcon className="fa-active" icon={faCubes}/> Consolidar
					</button>
				}
				{
					this.props.consolidarButtons && this.props.showButton =='CS' &&
					<button 
						className="btn btn-info" 
						onClick={this.Liberar}>
						<FontAwesomeIcon className="fa-active" icon={faRetweet}/> Liberar
					</button>
				}
				{
					this.props.liberarButton &&
					<button 
						className="btn btn-info" 
						onClick={this.Liberar}>
						<FontAwesomeIcon className="fa-active" icon={faRetweet}/> Liberar
					</button>
				}
				{
					this.props.verDetallesButton &&
					<button 
						className="btn btn-primary" 
						onClick={this.VerDetallesConsolidado}>
						<FontAwesomeIcon className="fa-active" icon={faReceipt}/> Ver detalles
					</button>
				}
				{
					this.props.addManifest &&
					<button 
						className="btn btn-info" 
						onClick={this.AddManifiesto}>
						<FontAwesomeIcon className="fa-active" icon={faPaperPlane}/> Añadir a manifiesto
					</button>
				}
			</div>
		)
	}

	render(){
		return(
			this.validateRender()
		)
	}
}