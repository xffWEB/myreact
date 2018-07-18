import React,{Component} from 'react';
import Header from './Header';
import './css/home.css';
import {connect} from 'react-redux';
import {getallusers} from '../../mock/index';
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            inp:true,
            allprice:0
        }
    }
    render(){
        let {inp}=this.state;
        let {basic}=this.props;
        return <div className='box'>
            <Header/>
            <div className="content">
                <div className="home">
                    <div className="jumbotron">
                        <h1>{this.state.allprice}</h1>
                        <p className='magt'>小仙女</p>
                        <div className="inp">
                            <p style={{display:inp?'none':'block'}} onClick={()=>{
                                this.props.history.push('/manger')
                            }}>管理用户</p>
                            <input type="password" style={{display:inp?'block':'none'}} placeholder='请输入管理员密码' onKeyDown={this.down.bind(this)}/>
                        </div>
                    </div>
                    <p className="maintell">
                    <span>
                       
                    </span>
                    </p>
                   <ul className="list">
                        {
                            basic&&basic.map((item,index)=>{
                                return <li key={index} onClick={this.drag.bind(this,item.username)}><b>{item.username}</b><span>{item.moneybase}</span></li>
                            })
                        }
                   </ul>
                </div>
            </div>
        </div>
    }
    componentDidMount(){
        this.props.basic&&this.props.basic.reduce((pre,next)=>{
            let price=pre*1+next.moneybase*1;
            this.setState({allprice:price});
            return price;
        },0)
    }
    componentWillMount(){
        this.props.getall()
    }
    down(e){
        if(e.keyCode===13){
            if(e.target.value==='123'){
                 this.setState({inp:false})
            }else{
                alert('密码错误')
            }
        }
    }
    drag(user){
        this.props.history.push('/box/detail?user='+user)
    }
};
let mapstate=(state)=>{
    return {
        basic:state.count.basic
    }
};
let mapdispatch=(dispatch)=>{
    return {
        getall(){
            dispatch(getallusers())
        }
    }
}
Home=connect(mapstate,mapdispatch)(Home);
export default Home;