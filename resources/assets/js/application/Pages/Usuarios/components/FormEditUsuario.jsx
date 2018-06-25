import React from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Autocomplete from 'react-autocomplete';
/*VALIDATE FORMS*/
import { VALIDATE , CLEAR_FORM } from '../../../../config/validateForm'

export default class FormEditarCiudad extends React.PureComponent{
	constructor(props){
		super(props)
		var data = props.editData[0];
		this.state = {
			txtIdUsuario: data.id,
			txtNombre: data.name,
			txtCorreo: data.email,
			txtClave: '',
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.formClear == 1){
			this.cleanState();
		}
	}

	handleChangeData = (event) =>{
		this.setState({ [event.target.id] : event.target.value })
	}

	handleSubmitForm = (event) =>{
		event.preventDefault();
		var validar = VALIDATE(this.state,[]);
		if(validar){
			this.props.handleSubmitForm(this.state)
		}
	}

	Cerrar = () =>{
		this.props.handleClose();
	}

	cleanState = () =>{
		this.setState({txtNombre: ''})
		this.setState({txtCorreo: ''})
		this.setState({txtClave: ''})
		CLEAR_FORM('formNuevo');
	}

	render(){
		return(
			<div>	
				<form onSubmit={this.handleSubmitForm} id="formNuevo">
					<div className="form-group">
						<label htmlFor="txtNombre">Nombre</label>
						<input 
							type="text" 
							id="txtNombre" 
							name="txtNombre"
							className="form-control" 
							defaultValue={ this.state.txtNombre } 
							autoComplete="off" 
							onChange={ this.handleChangeData }
						/>
					</div>				
					<div className="form-group">
						<label htmlFor="txtCorreo">Correo </label>
						<input 
							type="email" 
							id="txtCorreo" 
							name="txtCorreo" 
							className="form-control" 
							defaultValue={ this.state.txtCorreo } 
							autoComplete="off" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtClave">Clave</label>
						<input 
							type="text" 
							id="txtClave" 
							name="txtClave"
							className="form-control" 
							defaultValue={ this.state.txtClave } 
							autoComplete="off" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group justify-content-center">
						<button type="submit" className="btn btn-info">Grabar</button>
						<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.Cerrar}>Cerrar</button>
					</div>
				</form>
			</div>
		)
	}
}