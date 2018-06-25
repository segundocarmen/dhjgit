import React from 'react';
import { createPortal } from 'react-dom';

import './modal.css';

export default class Modal extends React.Component{
	render(){
		return createPortal(
			<div className={this.props.small ? "modal fade bd-example-modal-xs" : "modal fade bd-example-modal-lg"} tabIndex="-1" role="dialog" id={this.props.id} data-backdrop="static" data-keyboard="false">
				<div className={this.props.small ? "modal-dialog modal-xs" : "modal-dialog modal-lg"} role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{this.props.title}</h5>
						</div>
						<div className="modal-body">
							{
								this.props.children
							}
						</div>
					</div>
				</div>
			</div>
			,document.getElementById('forms_modal')
		)
	}
}