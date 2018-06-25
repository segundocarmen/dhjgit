function colors(filtered){
	filtered.map((item) =>{
		if(document.getElementById(item)){
			document.getElementById(item).style.borderStyle = "solid";
			document.getElementById(item).style.borderColor = "red";
		}
	});
	setTimeout(()=>{
		filtered.map((item) =>{
			if(document.getElementById(item)){
				document.getElementById(item).style.borderStyle = "solid";
				document.getElementById(item).style.borderColor = "#ced4da";
			}
		});
	},3000)
}

let VALIDATE = (elementos,exeptions = []) =>{
	const headsElements = Object.keys(elementos)
	
	const filtered = headsElements.filter(
		function(e) {
			return this.indexOf(e) < 0;
		}, exeptions
	);
	
	var empty = 0;
	var emptys = []; 

	const filtered2 = Object.keys(elementos)
		.filter(key => filtered.includes(key))
		.reduce((obj, key) => {
			if(elementos[key] == ''){
				empty ++;
				emptys.push(key)
				return false;
			}
	}, {});

	if(empty > 0){
		alert('Debe completar todos los campos.');
		colors(emptys);
		return false;
	}else{
		return true;
	}
}


let CLEAR_FORM = (form = "") =>{
	document.getElementById(form).reset();
}

export {
	VALIDATE,
	CLEAR_FORM
}