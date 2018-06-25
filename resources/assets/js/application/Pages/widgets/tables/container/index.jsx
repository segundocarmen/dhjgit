import React from 'react';
import Tabledata from '../components/tabledata';
import Filters from '../components/filters';
import Pagination from '../components/pagination';

import _, {debounce} from 'lodash';

import './index.css';

export default class Table extends React.PureComponent{
	state = {
		dataShow: this.props.data
	}

	HandleFilter = (event) =>{
		console.log(event.target.value)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.state.dataShow) {
			this.setState({ dataShow: nextProps.data });
		}
	}

	Tableheader = (data) =>{
		return data.map((data,index) =>{
			return (
				<th key={index}>{data.title}</th>
			)
		})
	}

	render(){
		return(
			<div className="table-responsive-sm">
				{/* <Filters HandleFilter={this.HandleFilter}/> */}
				<table className="table table-sm table-default table-hover table-striped table-borderless table-bordered">
					<thead>
						<tr>
							{ this.Tableheader(this.props.headers)}<th>Seleccionar</th>
						</tr>
					</thead>
					<tbody>
						<Tabledata  pageType={this.props.pageType} headers={this.props.headers} data={this.state.dataShow}/>
					</tbody>
				</table>
			</div>
		)
	}
}