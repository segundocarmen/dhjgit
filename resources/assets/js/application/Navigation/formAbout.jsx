import React from 'react';

export default function formAbout(props){
	return(
		<div className="About">
			<p>Dhj System V 1.0.0</p>
			<p> &copy; Todos los derechos reservados</p>
			<p>Desarrollado por <a href="http://www.intelitic.com/" target="_blanck">Intelitic</a></p>
			<div className="form-group justify-content-center">
				<button type="button" className="btn btn-danger btnCerrar" data-dismiss="modal" onClick={props.handleClose}>Cerrar</button>
			</div>
		</div>
	)
}