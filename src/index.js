import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

	var style = {
		width:'100%',
		height:'100%',
		'text-align':'center'
	};

class Button extends React.Component{
	constructor(){
		super();
		 this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return(
	<button className={this.props.clase} value={this.props.valor} style={style} onClick={this.handleClick}>{this.props.valor}</button>
		);
	}
	handleClick = () =>{
		
		this.props.handleClick(this.props.valor);
		
	}
}

class Display extends React.Component{
	
	render(){
		return(
			<input className="display" type="text" value={this.props.texto}/>
		);
	}
}

class Calculator extends React.Component{
	constructor(){
		super();
		this.state = {resultado:"" , primerTermino:"" , segundoTermino:"" , operacionPendiente:""};
		
	}
	
	addToResultado(val){
		
		let result = this.state.resultado.concat(val);
		this.setState({resultado: result});
		
	}
	setResultado(val){
		this.setState({resultado: val});
	}
	addToPrimerTermino(val){
		this.setState({primerTermino: `${this.state.primerTermino}${val}`});
	}
	clearTerminos(){
		this.setState({primerTermino: "",segundoTermino: ""});
	}
	clear(){
		this.setResultado("");
		this.clearTerminos();
	}
	addToSegundoTermino(val){
		let result = this.state.segundoTermino.concat(val);
		this.setState({segundoTermino: result});
	}
	handleClick = (val) =>{
		
		if(isNaN(val)){ //si no es numero
			if(val === '='){ //si es igual
				this.calcularResultado();
			}else if(val === 'CL'){ //si es clear
				this.clear();
			
			}else{ //si no es igual ni clear
				
				this.setState({operacionPendiente:val});
				this.addToResultado(val);
			}
			
		}
		else{ // si es numero 
			
			if(this.state.operacionPendiente != ""){ //si hay operacion pendiente
				this.addToSegundoTermino(val);
			}else{ //si no hay operacion pendiente
				this.addToPrimerTermino(val);
			}
			this.addToResultado(val);
			
		}
		
		
	}
	calcularResultado(){
		let result;
		

		switch(this.state.operacionPendiente){
				
				case '/':
					result = parseFloat(this.state.primerTermino) / parseFloat(this.state.segundoTermino);
				break;
				case '*':
					result = parseFloat(this.state.primerTermino) * parseFloat(this.state.segundoTermino);
				break;
				case '+':
					result = parseFloat(this.state.primerTermino) + parseFloat(this.state.segundoTermino);
				break;
				case '-':
					result = this.state.primerTermino - this.state.segundoTermino;
				break;
				
				
				
			}
		this.setState({resultado:"".concat(result), primerTermino: result,segundoTermino: "", operacionPendiente:""});
	}
	
	
	render(){
		return(<div className="mainDiv">
		
			<table className="tabla">
			<tr>
			<td colspan="4">
				<Display texto={this.state.resultado}/>
			</td>
			</tr>
			<tr>
			<td colspan="1" className="cuadrado">
				<Button clase="numero" valor="0" handleClick={this.handleClick}/>
			</td>
			<td colspan="1" className="clear" >
				<Button valor="CL" clase="buttonClear" handleClick={this.handleClick}/>
			</td>
			<td className="cuadrado">
				<Button clase="operador" valor={"*"} handleClick={this.handleClick}/>
			</td>
			<td className="cuadrado">
				<Button clase="operador" valor={"/"} handleClick={this.handleClick}/>
			</td>
			</tr>
			<tr>
				<td className="cuadrado">
					<Button clase="numero" valor="7" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor="8" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor="9" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor={"-"} clase="operador" handleClick={this.handleClick}/>
				</td>
			</tr>
			<tr>
				<td className="cuadrado">
					<Button valor="4" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor="5" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor="6" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor={"+"} clase="operador" handleClick={this.handleClick}/>
				</td>
			</tr>
			<tr>
				<td className="cuadrado"> 
					<Button valor="1" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor="2" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor="3" clase="numero" handleClick={this.handleClick}/>
				</td>
				<td className="cuadrado">
					<Button valor={"="} clase="operador" handleClick={this.handleClick}/>
				</td>
			</tr>
			</table>
		
		</div>);
	}
}


ReactDOM.render(<Calculator />, document.getElementById('root'));

