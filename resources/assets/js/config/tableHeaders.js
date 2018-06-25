/*INGRESOS*/
let INGRESOS_HEADER =  [
							{name:'id',title:'Id'},
							{name:'fecha',title:'Fecha'},
							{name:'wr',title:'WR'},
							{name:'consignatario',title:'Consignatario'},
							{name:'ubicacion',title:'Ubicación'},
							{name:'tracking',title:'Tracking'},
							{name:'peso',title:'Peso'},
							{name:'awb',title:'AWB'},
							{name:'estado',title:'Estado'}
						]

/*CONSOLIDAR*/
let CONSOLIDAR_HEADER =  [
							{name:'id',title:'Id'},
							{name:'fecha',title:'Fecha'},
							{name:'wr',title:'WR'},
							{name:'consignatario',title:'Consignatario'},
							{name:'ubicacion',title:'Ubicación'},
							{name:'tracking',title:'Tracking'},
							{name:'awb',title:'AWB'},
							{name:'estado',title:'Estado'}
						]

let CONSOLIDADOS_HEADER = [
							{name:'id',title:'Id'},
							{name:'consignatario',title:'Consignatario'},
							{name:'contenido',title:'Contenido'},
							{name:'valor',title:'Valor $'},
							{name:'peso',title:'Peso'},
							{name:'piezas',title:'Piezas'},
							{name:'fecha',title:'Fecha'},
							{name:'indicaciones',title:'Indicaciones'},
							{name:'estado',title:'Estado'},
							{name:'notas',title:'Notas'},
							{name:'observaciones',title:'Observaciones'}
						]

let CONSOLIDADOS_DETALLE_HEADER = [
							{name:'id',title:'Id'},
							{name:'wr',title:'WR'},
							{name:'consignatario',title:'Consignatario'},
							{name:'tracking',title:'Tracking'},
							{name:'awb',title:'AWB'}
						]

let AEROLINEAS_HEADER = [
							{name:'id',title:'Id'},
							{name:'nombre',title:'Nombre'},
							{name:'nombreCorto',title:'Nombre corto'}
						]

let CIUDADES_HEADER = [
							{name:'id',title:'Id'},
							{name:'nombre',title:'Nombre'},
							{name:'codigo',title:'Código'}
						]

let EMBARCADORES_HEADER = [
							{name:'id',title:'Id'},
							{name:'nombre',title:'Nombre'}
						]

let USUARIOS_HEADER = [
							{name:'id',title:'Id'},
							{name:'name',title:'Nombre'},
							{name:'email',title:'Correo'}
						]

export {
	INGRESOS_HEADER,
	CONSOLIDAR_HEADER,
	CONSOLIDADOS_HEADER,
	CONSOLIDADOS_DETALLE_HEADER,
	AEROLINEAS_HEADER,
	CIUDADES_HEADER,
	EMBARCADORES_HEADER,
	USUARIOS_HEADER
}