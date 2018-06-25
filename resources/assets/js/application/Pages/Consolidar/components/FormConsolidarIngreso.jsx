import React from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
/*VALIDATE FORMS*/
import { VALIDATE , CLEAR_FORM } from '../../../../config/validateForm'


export default class FormConsolidar extends React.PureComponent{
	constructor(props){
		super(props)
		this.state = {
			txtConsignatario: '',
			txtContenido: '',
			txtIndicaciones: '',
			txtNotas: '',
			txtValor: '',
			txtPeso:'',
			txtPiezas:'',
			txtObservacion: '',
			ingresos: JSON.parse(localStorage.getItem('selectItems'))
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
		var validar = VALIDATE(this.state,['txtIndicaciones','txtNotas','txtObservacion']);
		if(validar){
			this.props.handleSubmitForm(this.state)
		}
	}

	cleanState = () =>{
		this.setState({txtConsignatario: ''})
		this.setState({txtContenido: ''})
		this.setState({txtIndicaciones: ''})
		this.setState({txtNotas: ''})
		this.setState({txtValor: ''})
		this.setState({txtPeso: ''})
		this.setState({txtPiezas: ''})
		this.setState({txtObservacion: ''})
		this.setState({ingresos: []})
		CLEAR_FORM('formConsolidar');
	}

	Cerrar = () =>{
		this.props.handleClose();
	}


	render(){
		return(
			<div>	
				<form onSubmit={this.handleSubmitForm} id="formConsolidar">
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
						<label htmlFor="txtContenido">Contenido</label>
						<input 
							type="text" 
							className="form-control" 
							defaultValue={ this.state.txtContenido } 
							autoComplete="off" 
							id="txtContenido" 
							name="txtContenido" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtIndicaciones">Indicaciones <span className="optional">(Opcional)</span></label>
						<input 
							type="text" 
							className="form-control" 
							defaultValue={ this.state.txtIndicaciones } 
							autoComplete="off" 
							id="txtIndicaciones" 
							name="txtIndicaciones" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtNotas">Notas <span className="optional">(Opcional)</span></label>
						<input 
							type="text" 
							className="form-control" 
							defaultValue={ this.state.txtNotas } 
							autoComplete="off" 
							id="txtNotas" 
							name="txtNotas" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtValor">Valor </label>
						<input 
							pattern="[0-9]+([\.,][0-9]+)?" 
							step="0.01"
							type="number" 
							className="form-control w_200" 
							defaultValue={ this.state.txtValor } 
							autoComplete="off"
							id="txtValor" 
							name="txtValor" 
							onChange={ this.handleChangeData }
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtPeso">Peso </label>
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
						<label htmlFor="txtPiezas">Piezas </label>
						<input 
							type="number" 
							className="form-control w_200" 
							defaultValue={ this.state.txtPiezas } 
							autoComplete="off"
							id="txtPiezas" 
							name="txtPiezas" 
							onChange={ this.handleChangeData }
						/>
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