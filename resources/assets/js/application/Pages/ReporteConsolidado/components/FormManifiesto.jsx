import React from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
/*VALIDATE FORMS*/
import { today } from '../../../../config/dates'
import { VALIDATE , CLEAR_FORM } from '../../../../config/validateForm'

export default class FormManifiesto extends React.PureComponent{
	constructor(props){
		super(props)
		this.state = {
			txtAutogenerado: 'aaa',
			lstEmbarcador: '',
			txtAwbGuia: '',
			lstAerolinea: '',
			txtConsignatario: '',
			txtDireccion:'',
			lstCiudadOrigen:'',
			lstCiudadDestino: '',
			txtVuelo: '',
			txtFecha: today(),
			consolidados: JSON.parse(localStorage.getItem('selectItems'))
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
		var validar = VALIDATE(this.state,['txtVuelo']);
		if(validar){
			this.props.handleSubmitFormManifiesto(this.state)
		}
	}

	cleanState = () =>{
		this.setState({txtAutogenerado: 'aaa'})
		this.setState({lstEmbarcador: ''})
		this.setState({txtAwbGuia: ''})
		this.setState({lstAerolinea: ''})
		this.setState({txtConsignatario: ''})
		this.setState({txtDireccion: ''})
		this.setState({lstCiudadOrigen: ''})
		this.setState({lstCiudadDestino: ''})
		this.setState({txtVuelo: ''})
		this.setState({txtFecha: today()})
		CLEAR_FORM('formManifiesto');
	}

	Cerrar = () =>{
		this.props.handleClose();
	}

	RenderCiudadOrigen = (data) =>{
		return(
			<select 
				name="lstCiudadOrigen" 
				id="lstCiudadOrigen"
				className="form-control w_200" 
				onChange={ this.handleChangeData }
				defaultValue={ this.state.lstCiudadOrigen } >
					<option value="">[Origen]</option>
					{
						data.map((item) => {
							return( <option key={item.id} value={item.id}>{item.nombre+" - "+item.codigo}</option> )
						})
					}
			</select>
		)
	}

	RenderCiudadDestino = (data) =>{
		return(
			<select 
				name="lstCiudadDestino" 
				id="lstCiudadDestino"
				className="form-control w_200" 
				onChange={ this.handleChangeData }
				defaultValue={ this.state.lstCiudadDestino } >
					<option value="">[Destino]</option>
					{
						data.map((item) => {
							return( <option key={item.id} value={item.id}>{item.nombre+" - "+item.codigo}</option> )
						})
					}
			</select>
		)
	}

	RenderAerolineas = (data) =>{
		return(
			<select 
				name="lstAerolinea" 
				id="lstAerolinea"
				className="form-control w_200" 
				onChange={ this.handleChangeData }
				defaultValue={ this.state.lstAerolinea } >
					<option value="">[Aerolínea]</option>
					{
						data.map((item) => {
							return( <option key={item.id} value={item.id}>{item.nombre+" - "+item.nombreCorto}</option> )
						})
					}
			</select>
		)		
	}

	RenderEmbarcadores = (data) =>{
		return(
			<select 
				name="lstEmbarcador" 
				id="lstEmbarcador"
				className="form-control w_200" 
				onChange={ this.handleChangeData }
				defaultValue={ this.state.lstEmbarcador } >
					<option value="">[Embarcador]</option>
					{
						data.map((item) => {
							return( <option key={item.id} value={item.id}>{item.nombre}</option> )
						})
					}
			</select>
		)		
	}

	render(){
		return(
			<div>	
				<form onSubmit={this.handleSubmitForm} id="formManifiesto">
					<div className="form-group">
						<label htmlFor="txtFecha">Fecha de Emisión</label>
						<input 
							type="date" 
							id="txtFecha" 
							name="txtFecha"
							className="form-control w_200" 
							defaultValue={ this.state.txtFecha } 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtAutogenerado">Código</label>
						<input 
							type="text" 
							id="txtAutogenerado" 
							name="txtAutogenerado"
							className="form-control w_200" 
							defaultValue={ this.state.txtAutogenerado } 
							onChange={ this.handleChangeData } 
							readOnly 
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lstEmbarcador">Embarcador</label>
						{ this.RenderEmbarcadores(this.props.dataListas[2]) }
					</div>
					<div className="form-group">
						<label htmlFor="txtAwbGuia">AWB - Guía</label>
						<input 
							type="text" 
							id="txtAwbGuia" 
							name="txtAwbGuia"
							className="form-control w_200" 
							defaultValue={ this.state.txtAwbGuia } 
							onChange={ this.handleChangeData } 
							autoComplete="off" 
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lstAerolinea">Aerolínea</label>
						{ this.RenderAerolineas(this.props.dataListas[0]) }
					</div>
					<div className="form-group">
						<label htmlFor="txtConsignatario">Consignatario </label>
						<input 
							type="text" 
							id="txtConsignatario" 
							name="txtConsignatario" 
							className="form-control" 
							defaultValue={ this.state.txtConsignatario } 
							onChange={ this.handleChangeData } 
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtDireccion">Dirección destino </label>
						<input 
							type="text" 
							id="txtDireccion" 
							name="txtDireccion" 
							className="form-control" 
							defaultValue={ this.state.txtDireccion } 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lstCiudadOrigen">Origen</label>
						{ this.RenderCiudadOrigen(this.props.dataListas[1]) }
					</div>
					<div className="form-group">
						<label htmlFor="lstCiudadDestino">Destino</label>
						{ this.RenderCiudadDestino(this.props.dataListas[1]) }
					</div>
					<div className="form-group">
						<label htmlFor="txtVuelo">Vuelo </label>
						<input 
							type="text" 
							id="txtVuelo" 
							name="txtVuelo" 
							className="form-control w_200" 
							defaultValue={ this.state.txtVuelo } 
							onChange={ this.handleChangeData }
							autoComplete="off"
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