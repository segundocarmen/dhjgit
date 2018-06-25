import React from 'react';
import { connect } from 'react-redux';
import { GetIngresos } from '../../../../actions';
import { bindActionCreators } from 'redux';
/*SERVICES*/
import { 
	GET_DATA_MANIFIESTO ,
	SAVE_MANIFIESTO ,
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
import FormDetalleConsolidado from '../components/FormDetalleConsolidado';
import FormManifiesto from '../components/FormManifiesto';
/*WIDGETS*/
import Loader from '../../widgets/loader';
import Table from '../../widgets/tables/container';
import Filters from '../../widgets/filtersSubmit';
import ButtonsControl from '../../widgets/buttonsControl';
import Modal from '../../widgets/modal';

class Consolidado extends React.Component{
	/*HANDLE EVENTS*/
	handleSubmitFilters = (data) =>{
		ServicePost(GET_CONSOLIDADO_FILTER,data,this.asincData);
	}
	handleSubmitExcelFilters = (data) =>{
		FILE_DOWNLOAD(ROOT_URL,GET_CONSOLIDADO_FILTER_EXCEL,data.startDate,data.toDate,data.txtSearch);
	}

	handleClose = () =>{
		this.setState({ verDetalle:null })
		this.setState({ showManifest:false })
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

	handleManifiesto = () =>{
		this.setState({ showManifest:true })
		setTimeout(()=>{
			$("#makeManifiesto").modal('show');
		},500)
	}

	handleSubmitFormManifiesto = (data) =>{
		ServicePost(SAVE_MANIFIESTO,data,this.asincData);
		this.setState({requestPost:true})
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
		requestPost: false,
		showManifest:false,
		dataManifiesto:[],
		buttonControl: 'PD'
	}

	asincData = (data) =>{
		let consolidados = data.consolidados;
		let state = data.state;
		if(state){
			if(this.state.requestPost){
				alert('Proceso realizado correctamente.');
				setTimeout(()=>{
					this.setState({requestPost:false})
				},3000)
			}
			this.setState({income:consolidados});
		}
	}
	componentWillMount(){
		localStorage.setItem('selectItems','[]');
		localStorage.setItem('selectItemsModal','[]');
	}
	/*LLAMAR DATOS DEL SERVIDOR*/

	putDataManifiesto = (data) =>{
		this.setState({dataManifiesto:data});
	}

	componentDidMount(){
		ServiceGet(GET_CONSOLIDADO,'',this.asincData);
		ServiceGet(GET_DATA_MANIFIESTO,'',this.putDataManifiesto);
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
					<h1>Reporte de consolidados</h1>
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
								addManifest={true}
								handleDetallesConsolidado ={this.handleDetallesConsolidado}
								handleManifiesto={this.handleManifiesto}
							/>
						</div>
					</div>
					{
						this.renderTableBody()
					}
				</div>
				<div className="card-footer">
				</div>
				{
					this.state.verDetalle != null &&
					<Modal title='Detalles del consolidado' id="consolidadoDetail">
						<FormDetalleConsolidado  
							handleLiberar={this.handleLiberar}
							handleClose={this.handleClose}
							verDetalle={this.state.verDetalle} />
					</Modal>
				}
				{
					this.state.showManifest &&
					<Modal title='Crear manifiesto' id="makeManifiesto">
						<FormManifiesto  
							handleClose={this.handleClose} 
							formClear={this.state.requestPost ? 1 : 0}  
							handleSubmitFormManifiesto={this.handleSubmitFormManifiesto}
							dataListas={this.state.dataManifiesto}/>
					</Modal>
				}
			</div>
		)
	}
}
export default Consolidado

/*

function mapStateToProps(state){
	return {
		ingresos: state.ingresos.list
	}
}

export default connect(mapStateToProps, { GetIngresos })(Ingreso)
*/