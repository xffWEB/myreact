import React,{Component} from 'react';
import Header from './Header';
import './css/computed.css';
import {connect} from 'react-redux';
import {getallusers} from '../../mock/index';
class Computed extends Component{
    constructor(props){
        super(props);
        this.state={
            allprice:0,
            mean:0
        }
    }
    render(){
        let {mean}=this.state;
        return <div>
            <Header/>
            <div className='com_text'>
                <h3>{this.state.allprice}</h3>
                <table className='table'>
                    <tbody>
                        <tr className='info'>
                            <td>姓名</td>
                            <td>个人总计</td>
                            <td>平均金额</td>
                            <td>应付</td>
                            <td>应收</td>
                        </tr>
                        {
                            this.props.basic[0]&&this.props.basic.map((item,index)=>{
                                return <tr key={index}>
                                    <td>{item.username}</td>
                                    <td>{item.moneybase}</td>
                                    <td>{mean}</td>
                                    <td>{mean-item.moneybase>=0?(mean-item.moneybase).toFixed(2):0}</td>
                                    <td>{mean-item.moneybase<0?(item.moneybase-mean).toFixed(2):0}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
    componentDidMount(){
        setTimeout(()=>{
            if(this.props.basic[0]){
                let allpri= this.props.basic[0]&&this.props.basic.reduce((pre,next)=>{
                    let price=pre*1+next.moneybase*1;
                    this.setState({allprice:price});
                    return price;
                },0);
                let mean=(allpri/this.props.basic.length).toFixed(2);
                this.setState({mean})
            }
        },10)
    }
    componentWillMount(){
        this.props.getall();
    }
};
let mapstate=(state)=>{
    return{
        isok:state.count.isok,
        basic:state.count.basic
    }
};
let mapdispatch=(dispatch)=>{
    return{
        getall(){
            dispatch(getallusers())
        }
    }
}
Computed=connect(mapstate,mapdispatch)(Computed);
export default Computed;