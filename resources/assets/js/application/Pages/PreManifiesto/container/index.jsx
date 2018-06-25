import React from 'react';
import { connect } from 'react-redux';
import { GetIngresos } from '../../../../actions';
import { bindActionCreators } from 'redux';
/*SERVICES*/
import { 
	GET_CONSOLIDADO ,  
	GET_CONSOLIDADO_FILTER , 
	GET_CONSOLIDADO_FILTER_EXCEL , 
	VIEW_DETAIL_CONSOLIDADO ,
	SAVE_LIBERAR ,
	ServiceGet , 
	ServicePost 
} from '../../../../config/services'
import { ROOT_URL , FILE_DOWNLOAD } from '../../../../config/config'
/*TABLE HEADERS*/
import { CONSOLIDADOS_HEADER } from '../../../../config/tableHeaders'
/*FORMULARIOS*/
//import FormDetalleConsolidado from '../components/FormDetalleConsolidado';
/*WIDGETS*/
import Loader from '../../widgets/loader';
import Table from '../../widgets/tables/container';
import Filters from '../../widgets/filtersSubmit';
import ButtonsControl from '../../widgets/buttonsControl';
import Modal from '../../widgets/modal';

class PreManifiesto extends React.Component{
	/*HANDLE EVENTS*/
	handleSubmitFilters = (data) =>{
		ServicePost(GET_CONSOLIDADO_FILTER,data,this.asincData);
	}
	handleSubmitExcelFilters = (data) =>{
		FILE_DOWNLOAD(ROOT_URL,GET_CONSOLIDADO_FILTER_EXCEL,data.startDate,data.toDate,data.txtSearch);
	}

	handleClose = () =>{
		this.setState({ verDetalle:null })
	}

	handleDetallesConsolidado = (data) =>{
		ServicePost(VIEW_DETAIL_CONSOLIDADO,data,this.showDetails);
	}

	showDetails = (data) =>{
		this.setState({ verDetalle:data })
		setTimeout(()=>{
			$("#consolidadoDetail").modal('show');
		},500)
	}

	handleLiberar = (data) =>{
		ServicePost(SAVE_LIBERAR,data,this.liberarModal);
	}
	/*=============*/

	liberarModal = (data) =>{
		if(data){
			this.setState({ verDetalle:null })
			$(".modal-backdrop.fade.show").remove();
			localStorage.setItem('selectItemsModal','[]');
		}
	}

	state = {
		tableHeaders : CONSOLIDADOS_HEADER,
		income: null,
		verDetalle:null,
		buttonControl: 'PD'
	}

	asincData = (data) =>{
		let consolidados = data.consolidados;
		let state = data.state;
		if(state){
			this.setState({income:consolidados});
		}
	}
	componentWillMount(){
		localStorage.setItem('selectItems','[]');
		localStorage.setItem('selectItemsModal','[]');
	}
	/*LLAMAR DATOS DEL SERVIDOR*/
	componentDidMount(){
		ServiceGet(GET_CONSOLIDADO,'',this.asincData);
	}

	/*VALIDACIÓN DE DATOS TRAIDOS DEL SERVIDOR*/
	renderTableBody = () =>{
		if(this.state.income == null ){
			return <Loader />;
		}else if(this.state.income.length >= 0){
			return <Table pageType={true} data={this.state.income} headers={this.state.tableHeaders}/>;
		}
	}

	render(){
		return(
			<div className="card">
				<div className="card-header">
					<h1>Pre manifiesto</h1>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">
							<Filters 
								from={true}
								to={true}
								text={true}
								handleSubmitFilters={this.handleSubmitFilters} 
								handleSubmitExcelFilters={this.handleSubmitExcelFilters}
							/>	
						</div>
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
							<ButtonsControl 
								verDetallesButton={true}
								handleDetallesConsolidado ={this.handleDetallesConsolidado}
							/>
						</div>
					</div>
					{
						this.renderTableBody()
					}
				</div>
				<div className="card-footer">
				</div>
			</div>
		)
	}
}
export default PreManifiesto

/*

function mapStateToProps(state){
	return {
		ingresos: state.ingresos.list
	}
}

export default connect(mapStateToProps, { GetIngresos })(Ingreso)
*/