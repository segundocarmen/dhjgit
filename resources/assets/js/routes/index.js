import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import App from '../application/App/';
import Home from '../application/Pages/Home/container';
import Ingreso from '../application/Pages/Ingreso/container';
import Consolidar from '../application/Pages/Consolidar/container';
import ReporteConsolidado from '../application/Pages/ReporteConsolidado/container';
import PreManifiesto from '../application/Pages/PreManifiesto/container';
import Aerolineas from '../application/Pages/Aerolineas/container';
import Ciudades from '../application/Pages/Ciudades/container';
import Embarcadores from '../application/Pages/Embarcadores/container';
import Usuarios from '../application/Pages/Usuarios/container';

const AppRoutes = () =>
	<App>
		<Switch>
			<Route exact path="/sistema/ingreso" component={Ingreso} />
			<Route exact path="/sistema/consolidar-ingreso" component={Consolidar} />
			<Route exact path="/sistema/consolidado" component={ReporteConsolidado} />
			<Route exact path="/sistema/pre-manifiesto" component={PreManifiesto} />
			<Route exact path="/sistema/crear-aerolinea" component={Aerolineas} />
			<Route exact path="/sistema/crear-ciudad" component={Ciudades} />
			<Route exact path="/sistema/crear-embarcador" component={Embarcadores} />
			<Route exact path="/sistema/usuarios" component={Usuarios} />
			<Route exact path="/sistema" component={Home} />
		</Switch>
	</App>


export default AppRoutes;