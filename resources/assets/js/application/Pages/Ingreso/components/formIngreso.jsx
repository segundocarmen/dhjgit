import React from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Autocomplete from 'react-autocomplete';
/*VALIDATE FORMS*/
import { VALIDATE , CLEAR_FORM } from '../../../../config/validateForm'
import { today } from '../../../../config/dates'

export default class FormIngreso extends React.PureComponent{
	constructor(props){
		super(props)
		this.state = {
			txtFecha: today(),
			txtWR: '',
			txtConsignatario: '',
			txtUbicacion: '',
			txtTracking: '',
			txtPeso: '',
			txtAWB: '',
			txtObservacion: '',
			lstProveedor: ''
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
		var validar = VALIDATE(this.state,['txtUbicacion','lstProveedor','txtObservacion']);
		if(validar){
			this.props.handleSubmitForm(this.state)
		}
	}

	cleanState = () =>{
		this.setState({txtFecha: today()})
		this.setState({txtWR: ''})
		this.setState({txtConsignatario: ''})
		this.setState({txtUbicacion: ''})
		this.setState({txtTracking: ''})
		this.setState({txtPeso: ''})
		this.setState({txtAWB: ''})
		this.setState({txtObservacion: ''})
		this.setState({lstProveedor: ''})
		CLEAR_FORM('formIngreso');
	}

	showProviders = () =>{
		return(
			<select 
				name="lstProveedor w_200" 
				id="lstProveedor"
				className="form-control" 
				onChange={ this.handleChangeData }
				defaultValue={ this.state.lstProveedor } >
					<option value="">[Proveedor]</option>
					{
						this.props.providers.map((item) => {
							return( <option key={item.id} value={item.id}>{item.proveedor}</option> )
						})
					}
			</select>
		)
	}

	render(){
		return(
			<div>	
				<form onSubmit={this.handleSubmitForm} id="formIngreso">
					<div className="form-group">
						<label htmlFor="txtFecha">Fecha de registro</label>
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
						<label htmlFor="txtWR">WR</label>
						<input 
							type="text" 
							className="form-control w_200" 
							defaultValue={ this.state.txtWR } 
							autoComplete="off" 
							id="txtWR" 
							name="txtWR" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtConsignatario">Consignatario</label>
						<input 
							type="text" 
							className="form-control" 
							defaultValue={ this.state.txtConsignatario } 
							id="txtConsignatario" 
							name="txtConsignatario" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtUbicacion">Ubicación <span className="optional">(Opcional)</span></label>
						<input 
							type="text" 
							className="form-control" 
							defaultValue={ this.state.txtUbicacion } 
							id="txtUbicacion" 
							name="txtUbicacion" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtTracking">Tracking</label>
						<input 
							type="text" 
							className="form-control" 
							defaultValue={ this.state.txtTracking } 
							autoComplete="off"
							id="txtTracking" 
							name="txtTracking" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtPeso">Peso</label>
						<input 
							pattern="[0-9]+([\.,][0-9]+)?" 
							step="0.01"
							type="number" 
							className="form-control w_200" 
							defaultValue={ this.state.txtPeso } 
							autoComplete="off"
							id="txtPeso" 
							name="txtPeso" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtAWB">AWB</label>
						<input 
							type="text" 
							className="form-control w_200" 
							defaultValue={ this.state.txtAWB } 
							autoComplete="off"
							id="txtAWB" 
							name="txtAWB" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lstProveedor">Proveedor <span className="optional">(Opcional)</span></label>
						{ this.showProviders() }
					</div>
					<div className="form-group">
						<label htmlFor="txtObservacion">Observaciones <span className="optional">(Opcional)</span></label>
						<textarea
							className="form-control" 
							defaultValue={ this.state.txtObservacion } 
							id="txtObservacion" 
							name="txtObservacion" 
							onChange={ this.handleChangeData }
						>
						</textarea>
					</div>
					<div className="form-group justify-content-center">
						<button type="submit" className="btn btn-info">Grabar</button>
						<button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
					</div>
				</form>
			</div>
		)
	}
}