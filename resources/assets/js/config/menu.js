 let Menu = [
	{'list' : 
		{
			'name' : 'Programación',
			'items' : [
				{'title':'Ingresos a almacén','url':'/sistema/ingreso'},
				{'title':'Consolidar ingresos','url':'/sistema/consolidar-ingreso'},
				{'title':'Reporte de consolidados','url':'/sistema/consolidado'},
				{'title':'Pre manifiestos','url':'/sistema/pre-manifiesto'}
				//{'title':'Pagos','url':'/#'}
			]
		}
	},
	{'list' : 
		{
			'name' : 'Despachos',
			'items' : [
				{'title':'Manifiestos','url':'/#'}
			]
		}
	},
	{'list' :
		{
			'name' : 'Facturación',
			'items' : [
				//{'title':'Tarifas','url':'/#'},
				{'title':'Boletas','url':'#'},
				{'title':'Facturas','url':'#'}
			]
		}
	},
	{'list' :
		{
			'name' : 'Mantenimiento',
			'items' : [
				{'title':'Aerolíneas','url':'/sistema/crear-aerolinea'},
				{'title':'Ciudades','url':'/sistema/crear-ciudad'},
				{'title':'Embarcadores','url':'/sistema/crear-embarcador'}
			]
		}
	}
	,
	{'list' :
		{
			'name' : 'Administración',
			'items' : [
				{'title':'Usuarios','url':'/sistema/usuarios'},
				{'title':'Permisos','url':'#'}
			]
		}
	}
]

let MenuUser = {
	'usuario' : {
		'name' : 'Usuario',
		'items' : [
			{'title':'Acerca de','url':'/#','about':true},
			{'title':'Salir','url':'./logout'}
		]
	}
}

export {
	Menu,
	MenuUser,
}