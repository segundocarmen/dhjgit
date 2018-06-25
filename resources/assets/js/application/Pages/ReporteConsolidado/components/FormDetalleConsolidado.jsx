import React from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
/*VALIDATE FORMS*/
import { VALIDATE , CLEAR_FORM } from '../../../../config/validateForm'
/*TABLE HEADERS*/
import { CONSOLIDADOS_DETALLE_HEADER } from '../../../../config/tableHeaders'
import Loader from '../../widgets/loader';
import Table from '../../widgets/tables/container';
import ButtonsControl from '../../widgets/buttonsControl';
import './FormDetalleConsolidado.css';

export default class FormDetalleConsolidado extends React.PureComponent{
	state = {
		tableHeaders : CONSOLIDADOS_DETALLE_HEADER,
		income: this.props.verDetalle
	}

	Cerrar = () =>{
		this.props.handleClose();
	}

	/*VALIDACIÓN DE DATOS TRAIDOS DEL SERVIDOR*/
	renderTableBody = () =>{
		return <Table pageType={false} data={this.state.income} headers={this.state.tableHeaders}/>;
	}

	render(){
		return(
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-8"></div>
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
						<ButtonsControl 
							modal={true}
							liberarButton={true}
							handleLiberar ={this.props.handleLiberar}
						/>
					</div>
				</div>
				{
					this.renderTableBody()
				}
				<div className="form-group justify-content-center">
					<button type="button" className="btn btn-danger btnCerrar" data-dismiss="modal" onClick={this.Cerrar}>Cerrar</button>
				</div>
			</div>
		)
	}
}