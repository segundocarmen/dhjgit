import React from 'react';
import SvgLoader from '../../../../../img/loader.svg';
import Logo from '../../../../../img/logo-texto.png';
import './loader.css';

export default function Loader(props){
	return(
		<div className="loader">
			<div className="paceLoad">
				<img src={SvgLoader} alt="Loader"/>
				<figure>
					<img src={Logo} alt="Logo"/>
					<figcaption>Cargando...</figcaption>
				</figure>
			</div>
		</div>
	)
}