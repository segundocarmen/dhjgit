import React from 'react';
import { connect } from 'react-redux';
import { GetIngresos } from '../../../../actions';
import { bindActionCreators } from 'redux';
/*SERVICES*/
import { 
	GET_INGRESOS_CONSOLIDAR ,  
	GET_INGRESOS_FILTER_CONSOLIDAR , 
	GET_INGRESOS_FILTER_EXCEL_CONSOLIDAR , 
	SAVE_CONSOLIDADO ,
	SAVE_LIBERAR ,
	ServiceGet , 
	ServicePost 
} from '../../../../config/services'
import { ROOT_URL , FILE_DOWNLOAD_CONSOLIDAR } from '../../../../config/config'
/*TABLE HEADERS*/
import { CONSOLIDAR_HEADER } from '../../../../config/tableHeaders'
/*FORMULARIOS*/
import FormConsolidarIngreso from '../components/FormConsolidarIngreso';
/*WIDGETS*/
import Loader from '../../widgets/loader';
import Table from '../../widgets/tables/container';
import Filters from '../../widgets/filtersSubmit';
import ButtonsControl from '../../widgets/buttonsControl';
import Modal from '../../widgets/modal';

class Consolidar extends React.Component{
	/*HANDLE EVENTS*/
	handleSubmitFilters = (data) =>{
		ServicePost(GET_INGRESOS_FILTER_CONSOLIDAR,data,this.asincData);
	}
	handleSubmitExcelFilters = (data) =>{
		FILE_DOWNLOAD_CONSOLIDAR(ROOT_URL,GET_INGRESOS_FILTER_EXCEL_CONSOLIDAR,data.startDate,data.toDate,data.txtSearch,data.lstEstadoIngreso);
	}
	handleSubmitForm = (data) =>{
		ServicePost(SAVE_CONSOLIDADO,data,this.asincData);
		this.setState({requestPost:true})
	}
	handleConsolida = (data) =>{
		this.setState({ consolidar:data })
		setTimeout(()=>{
			$("#consolidarIngreso").modal('show');
		},500)
	}
		handleClose = () =>{
			this.setState({ consolidar:null })
			this.setState({requestPost:false})
		}

	handleLiberar = (data) =>{
		ServicePost(SAVE_LIBERAR,data,this.asincData);
	}
	/*=============*/

	changeFilter =(data) =>{
		this.setState({buttonControl: data})
	}

	state = {
		tableHeaders : CONSOLIDAR_HEADER,
		income: null,
		requestPost: false,
		consolidar:null,
		buttonControl: 'PD'
	}

	asincData = (data) =>{
		let ingresos = data.ingresos;
		let state = data.state;
		if(state){
			this.setState({income:ingresos});
			if(this.state.requestPost){
				alert('Proceso realizado correctamente.');
				setTimeout(()=>{
					this.setState({requestPost:false})
					localStorage.setItem('selectItems','[]');
				},3000)
			}
		}
	}
	componentWillMount(){
		localStorage.setItem('selectItems','[]');
	}
	/*LLAMAR DATOS DEL SERVIDOR*/
	componentDidMount(){
		ServiceGet(GET_INGRESOS_CONSOLIDAR,'',this.asincData);
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
					<h1>Consolidar ingresos</h1>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">
							<Filters 
								from={true}
								to={true}
								text={true}
								state={true}
								changeFilter={this.changeFilter}
								handleSubmitFilters={this.handleSubmitFilters} 
								handleSubmitExcelFilters={this.handleSubmitExcelFilters}
							/>	
						</div>
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
							<ButtonsControl 
								consolidarButtons={true}
								showButton={this.state.buttonControl}
								handleConsolida={this.handleConsolida}
								handleLiberar={this.handleLiberar}
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
					this.state.consolidar != null &&
					<Modal title='Consolidar ingresos' id="consolidarIngreso">
						<FormConsolidarIngreso 
							formClear={this.state.requestPost ? 1 : 0}  
							handleSubmitForm={this.handleSubmitForm} 
							handleClose={this.handleClose}
							consolidados={this.state.consolidar} />
					</Modal>
				}
			</div>
		)
	}
}
export default Consolidar

/*

function mapStateToProps(state){
	return {
		ingresos: state.ingresos.list
	}
}

export default connect(mapStateToProps, { GetIngresos })(Ingreso)
*/