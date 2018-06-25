import React from 'react';
import { today } from '../../../../config/dates'
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFileExcel from '@fortawesome/fontawesome-free-solid/faFileExcel';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

import './filters.css';
export default class Filters extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			startDate: today(),
			toDate: today(),
			txtSearch: '',
			lstEstadoIngreso:'PD'
		}
	}

	/*FILTROS*/
	handleChangeData = (event) =>{
		this.setState({ [event.target.id] : event.target.value })
	}
	/*===================================*/

	handleSubmit = (event) =>{
		event.preventDefault();
		this.props.handleSubmitFilters(this.state)
		if(this.props.changeFilter){
			this.props.changeFilter(this.state.lstEstadoIngreso)
		}
	}

	handleExportExcel = () =>{
		this.props.handleSubmitExcelFilters(this.state)
	}

	validateRender = () =>{
		return(
			<div className="form-group">
				{
					this.props.from &&
					<div>
						<label htmlFor="startDate">Desde</label>
						<input 
							type="date" 
							id="startDate" 
							name="startDate"
							className="form-control w_200" 
							defaultValue={ this.state.startDate } 
							onChange={ this.handleChangeData }/>
					</div>
				}
				{
					this.props.to &&
					<div>
						<label htmlFor="toDate">Hasta</label>
						<input 
							type="date" 
							id="toDate" 
							name="toDate"
							className="form-control w_200" 
							defaultValue={ this.state.toDate } 
							onChange={ this.handleChangeData }
						/>
					</div>
				}
				{
					this.props.text &&
					<div>
						<label htmlFor="txtSearch">Buscar</label>
						<input 
							type="text" 
							id="txtSearch" 
							name="txtSearch"
							className="form-control" 
							autoComplete="off" 
							defaultValue={this.state.search} 
							onChange={ this.handleChangeData }
						/>
					</div>
				}
				{
					this.props.state && 
					<div>
						<label htmlFor="lstEstadoIngreso">Estado</label>
						<select 
							name="lstEstadoIngreso" 
							id="lstEstadoIngreso"
							className="form-control w_200" 
							defaultValue={ this.state.lstEstadoIngreso } 
							onChange={ this.handleChangeData }>
							<option value="PD">Pendiente</option>
							<option value="CS">Consolidado</option>
							<option value="CF">Confirmado</option>
						</select>
					</div>
				}
			</div>
		)
	}

	render(){
		return(
			<div className="filtros-ingreso">
				<form onSubmit={this.handleSubmit} className="form-inline">
					{
						this.validateRender()
					}
					<button type="submit" className="btn btn-primary .text-light"><FontAwesomeIcon className="fa-active" icon={faSearch} /> Buscar</button>
					<button type="button" onClick={this.handleExportExcel} className="btn btn-success"><FontAwesomeIcon className="fa-active" icon={faFileExcel} /> Exportar</button>
				</form>
			</div>
		)
	}
}
