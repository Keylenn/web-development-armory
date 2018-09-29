import React,{Component} from 'react';
import importExcel from './importExcel';

export default class Excel extends Component{
    constructor(){
        super();
    }
    handleOnChange(){
      const options = {
          fileInput: this.fileInput,
          maxSize: 1,
          names:{
              Sheet1:{
                  A1: 'foods',
                  B1:'quantities',
                  C1:'registration_time'
              },
              Sheet2:{
                  A1: 'foods',
                  B1:'quantities',
                  C1:'registration_time'
              }
          }
      }
      importExcel(options).then((result)=>{
          console.info('getResultFromExcel',result);
      });
    }
    render(){
      return <input type="file" ref= {(input)=>this.fileInput = input} onChange={this.handleOnChange.bind(this)}/>
    }
}