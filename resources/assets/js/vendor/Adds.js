let token = document.head.querySelector('meta[name="csrf-token"]');
if(token){
	window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}else{
	console.log('CSRF token not found');
}