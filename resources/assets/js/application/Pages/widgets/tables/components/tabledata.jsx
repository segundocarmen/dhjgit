import React from 'react';
import _ from 'lodash';

export default class tabledata extends React.Component{

	state={
		complete:0
	}
	
	Tablebody = (headers,data) =>{
		return data.map((data,i) =>{
			var row = this.ExtractData(headers,data,data.id);
			return row;
		})
	}

	ExtractData = (headers,data,i) =>{
		var heads = _.map(headers, 'name');
		const filtered = Object.keys(data)
			.filter(key => heads.includes(key))
			.reduce((obj, key) => {
				return {
					...obj,
					[key]: data[key]
				};
		}, {});

		var split = [];
		heads.map((value,ix) =>{
			var item;
			if( filtered.hasOwnProperty(value) ) {
				item = filtered[value];
				split.push(item);
			}
		})
		split.push('ckeck');
		return (
			<tr key={i}>
				{
					split.map((item,index) => {
						return this.printCell(item,index,i)
					})
				}
			</tr>
		)
	}

	printCell = (dato,index,id) =>{
		if(dato == 'ckeck'){
			return <td className="check" key={index}><input id={id} name="select" className="form-control" type="checkbox" onChange={this.handleInputChange} /></td>
		}else{
			return <td key={index}>{dato}</td>
		}
	}

	handleInputChange = (e) =>{
		var typeItems;
		if(this.props.pageType){
			typeItems='selectItems';
		}else{
			typeItems='selectItemsModal';
		}
		var items = localStorage.getItem(typeItems);
		var id = e.target.id;
		var arr = [];
		var estring
		if(items == "[]"){
			arr.push(id);
			estring = JSON.stringify(arr);
			localStorage.setItem(typeItems,estring);
		}else{
			arr = JSON.parse(items);
			var index = arr.indexOf(id);
			if(index < 0){
				arr.push(id);
			}else{
				arr.splice(index,1);
			}
			estring = JSON.stringify(arr);
			localStorage.setItem(typeItems,estring);
		}
	}

	render(){
		return(
			this.Tablebody(this.props.headers,this.props.data)
		)
	}
}