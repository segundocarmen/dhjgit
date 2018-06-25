let ROOT_URL = 'http://localhost:3000/sistema';

let FILE_DOWNLOAD = (host,url,param1,param2,param3) =>{
	var linkFile = host+url+'?startDate='+param1+'&toDate='+param2+'&txtSearch='+param3;
	window.open(linkFile,'_blank');
}
let FILE_DOWNLOAD_CONSOLIDAR = (host,url,param1,param2,param3,param4) =>{
	var linkFile = host+url+'?startDate='+param1+'&toDate='+param2+'&txtSearch='+param3+'&estado='+param4;
	window.open(linkFile,'_blank');
}
let FILE_DOWNLOAD_ONLYPARAM = (host,url,param1) =>{
	var linkFile = host+url+'?txtSearch='+param1;
	window.open(linkFile,'_blank');
}
export {
	ROOT_URL,
	FILE_DOWNLOAD,
	FILE_DOWNLOAD_CONSOLIDAR,
	FILE_DOWNLOAD_ONLYPARAM
}