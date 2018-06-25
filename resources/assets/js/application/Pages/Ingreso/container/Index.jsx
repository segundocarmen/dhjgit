import React from 'react';
import { connect } from 'react-redux';
import { GetIngresos } from '../../../../actions';
import { bindActionCreators } from 'redux';
/*SERVICES*/
import { 
	GET_INGRESOS , 
	GET_PROVIDERS , 
	GET_INGRESO , 
	SAVE_INGRESO , 
	DELETE_INGRESOS , 
	GET_INGRESOS_FILTER , 
	GET_INGRESOS_FILTER_EXCEL , 
	ServiceGet , 
	ServicePost 
} from '../../../../config/services'
import { ROOT_URL , FILE_DOWNLOAD } from '../../../../config/config'
/*TABLE HEADERS*/
import { INGRESOS_HEADER } from '../../../../config/tableHeaders'
/*FORMULARIOS*/
import FormIngreso from '../components/formIngreso';
import FormEditIngreso from '../components/formEditIngreso';
/*WIDGETS*/
import Loader from '../../widgets/loader';
import Table from '../../widgets/tables/container';
import Filters from '../../widgets/filtersSubmit';
import ButtonsControl from '../../widgets/buttonsControl';
import Modal from '../../widgets/modal';

class Ingreso extends React.Component{
	/*HANDLE EVENTS*/
	handleSubmitFilters = (data) =>{
		ServicePost(GET_INGRESOS_FILTER,data,this.asincData);
	}
	handleSubmitExcelFilters = (data) =>{
		FILE_DOWNLOAD(ROOT_URL,GET_INGRESOS_FILTER_EXCEL,data.startDate,data.toDate,data.txtSearch);
	}
	handleSubmitForm = (data) =>{
		ServicePost(SAVE_INGRESO,data,this.asincData);
		this.setState({requestPost:true})
	}
	handleEdit = (data) =>{
		ServiceGet(GET_INGRESO,data,this.EditIngreso);
	}
		EditIngreso = (data) =>{
			this.setState({ editData:data })
			$("#editarIngreso").modal('show');
		}
		handleClose = () =>{
			this.setState({ editData:null })
		}
	handleRemove = (data) =>{
		ServicePost(DELETE_INGRESOS,data,this.asincData);
		localStorage.setItem('selectItems','[]');
	}
	/*=============*/

	state = {
		tableHeaders : INGRESOS_HEADER,
		income: null,
		requestPost: false,
		editData:null,
		providers:[]
	}

	asincData = (data) =>{
		let ingresos = data.ingresos;
		let state = data.state;
		if(state){
			if(this.state.requestPost){
				alert('Proceso realizado correctamente.');
				setTimeout(()=>{
					this.setState({requestPost:false})
				},3000)
			}
			this.setState({income:ingresos});
		}
	}

	asignProvider = (providers) =>{
		this.setState({providers:providers});
	}

	componentWillMount(){
		localStorage.setItem('selectItems','[]');
	}
	/*LLAMAR DATOS DEL SERVIDOR*/
	componentDidMount(){
		ServiceGet(GET_INGRESOS,'',this.asincData);
		ServiceGet(GET_PROVIDERS ,'',this.asignProvider);
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
					<h1>Ingresos</h1>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
							<Filters 
								from={true}
								to={true}
								text={true}
								handleSubmitFilters={this.handleSubmitFilters} 
								handleSubmitExcelFilters={this.handleSubmitExcelFilters}
							/>	
						</div>
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
							<ButtonsControl 
								newButton={true}
								editButton={true}
								deleteButton={true}
								handleEdit={this.handleEdit} 
								handleRemove={this.handleRemove}
							/>
						</div>
					</div>
					{
						this.renderTableBody()
					}
				</div>
				<div className="card-footer">
				</div>
				<Modal title='Nuevo ingreso' id="nuevoElemento">
					<FormIngreso 
						handleSubmitForm={this.handleSubmitForm} 
						formClear={this.state.requestPost ? 1 : 0}  
						providers={this.state.providers}/>
				</Modal>
				{
					this.state.editData != null &&
					<Modal title='Editar ingreso' id="editarIngreso">
						<FormEditIngreso 
							editData={this.state.editData} 
							handleSubmitForm={this.handleSubmitForm} 
							handleClose={this.handleClose} 
							providers={this.state.providers}/>
					</Modal>
				}
			</div>
		)
	}
}
export default Ingreso

/*

function mapStateToProps(state){
	return {
		ingresos: state.ingresos.list
	}
}

export default connect(mapStateToProps, { GetIngresos })(Ingreso)
*/