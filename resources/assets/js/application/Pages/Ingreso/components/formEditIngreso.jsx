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
		var data = props.editData[0];
		this.state = {
			txtIdIngreso: data.id,
			txtFecha: data.fecha,
			txtWR: data.wr,
			txtConsignatario: data.consignatario,
			txtUbicacion: data.ubicacion,
			txtTracking: data.tracking,
			txtPeso: data.peso,
			txtAWB: data.awb,
			lstProveedor: data.proveedor_id,
			txtObservacion: data.observaciones
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

	Cerrar = () =>{
		this.props.handleClose();
	}

	showProviders = () =>{
		console.log(this.state.lstProveedor)
		return(
			<select 
				name="lstProveedor" 
				id="lstProveedor"
				className="form-control w_200" 
				onChange={ this.handleChangeData }
				defaultValue={ this.state.lstProveedor } >
					<option value="">[Proveedor]</option>				
					{
						this.props.providers.map((item) => {
							return( 
								<option 
									key={item.id} 
									value={item.id} >
									{item.proveedor}
								</option> 
							)
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
						<label htmlFor="txtIdIngreso">Id del ingreso</label>
						<input 
							type="text" 
							disabled="disabled"
							id="txtIdIngreso" 
							name="txtIdIngreso"
							className="form-control w_200" 
							defaultValue={ this.state.txtIdIngreso } 
						/>
					</div>
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
						<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.Cerrar}>Cerrar</button>
					</div>
				</form>
			</div>
		)
	}
}