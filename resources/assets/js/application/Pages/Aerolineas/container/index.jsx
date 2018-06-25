import React from 'react';
import { connect } from 'react-redux';
import { GetIngresos } from '../../../../actions';
import { bindActionCreators } from 'redux';
/*SERVICES*/
import { 
	GET_AEROLINEAS , 
	GET_AEROLINEA , 
	SAVE_AEROLINEA , 
	DELETE_AEROLINEAS , 
	GET_AEROLINEAS_FILTER , 
	GET_AEROLINEAS_FILTER_EXCEL , 
	ServiceGet , 
	ServicePost 
} from '../../../../config/services'
import { ROOT_URL , FILE_DOWNLOAD_ONLYPARAM } from '../../../../config/config'
/*TABLE HEADERS*/
import { AEROLINEAS_HEADER } from '../../../../config/tableHeaders'
/*FORMULARIOS*/
import FormNuevo from '../components/formAerolinea';
import FormEditar from '../components/formEditarAerolinea';
/*WIDGETS*/
import Loader from '../../widgets/loader';
import Table from '../../widgets/tables/container';
import Filters from '../../widgets/filtersSubmit';
import ButtonsControl from '../../widgets/buttonsControl';
import Modal from '../../widgets/modal';

class Aerolinea extends React.Component{
	/*HANDLE EVENTS*/
	handleSubmitFilters = (data) =>{
		ServicePost(GET_AEROLINEAS_FILTER,data,this.asincData);
	}
	handleSubmitExcelFilters = (data) =>{
		FILE_DOWNLOAD_ONLYPARAM(ROOT_URL,GET_AEROLINEAS_FILTER_EXCEL,data.txtSearch);
	}
	handleSubmitForm = (data) =>{
		ServicePost(SAVE_AEROLINEA,data,this.asincData);
		this.setState({requestPost:true})
	}
	handleEdit = (data) =>{
		ServiceGet(GET_AEROLINEA,data,this.Edit);
	}
		Edit = (data) =>{
			this.setState({ editData:data })
			$("#editarAerolinea").modal('show');
		}
		handleClose = () =>{
			this.setState({ editData:null })
		}
	handleRemove = (data) =>{
		ServicePost(DELETE_AEROLINEAS,data,this.asincData);
		localStorage.setItem('selectItems','[]');
	}
	/*=============*/

	state = {
		tableHeaders : AEROLINEAS_HEADER,
		income: null,
		requestPost: false,
		editData:null
	}

	asincData = (data) =>{
		let aerolineas = data.aerolineas;
		let state = data.state;
		if(state){
			if(this.state.requestPost){
				alert('Proceso realizado correctamente.');
				setTimeout(()=>{
					this.setState({requestPost:false})
				},3000)
			}
			this.setState({income:aerolineas});
		}
	}

	componentWillMount(){
		localStorage.setItem('selectItems','[]');
	}
	/*LLAMAR DATOS DEL SERVIDOR*/
	componentDidMount(){
		ServiceGet(GET_AEROLINEAS,'',this.asincData);
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
					<h1>Aerolíneas</h1>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
							<Filters 
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
				<Modal title='Nueva aerolínea' id="nuevoElemento" small={true}>
					<FormNuevo 
						handleSubmitForm={this.handleSubmitForm} 
						formClear={this.state.requestPost ? 1 : 0}/>
				</Modal>
				{
					this.state.editData != null &&
					<Modal title='Editar aerolínea' id="editarAerolinea" small={true}>
						<FormEditar 
							editData={this.state.editData} 
							handleSubmitForm={this.handleSubmitForm} 
							handleClose={this.handleClose} />
					</Modal>
				}
			</div>
		)
	}
}
export default Aerolinea