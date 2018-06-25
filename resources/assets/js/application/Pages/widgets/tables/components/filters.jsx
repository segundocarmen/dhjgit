import React from 'react';
import _ from 'lodash';

import './filters.css';

export default class Filters extends React.PureComponent{
	render(){
		return(
			<div className="filters">
				<div className="row">
					<div className="col-md-4 offset-md-8 form-inline">
						<div className="form-group">
							<label htmlFor="txtFilterTable">Buscar</label>
							<input type="text" className="form-control" id="txtFilterTable" onChange={this.props.HandleFilter}/>
						</div>	
					</div>
				</div>
			</div>
		)
	}
}