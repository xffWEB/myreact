import React,{Component} from 'react';
import Header from './Header';
import './css/detail.css';
import {List , Picker} from 'antd-mobile';
import {connect} from 'react-redux';
import {getallusers,getmessage,setmore} from '../../mock/index';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            name:null,
            sValue:[],
            show:[]
        }
    }
    render(){
        let {name}=this.state;
        return <div>
            <Header/>
            <div className='de_name'>
                {name?<p>{name}</p>:<Picker data={this.state.sValue} cols={1} value={this.state.show} onOk={(v)=>{this.setState({show:v,name:v}); this.props.getmessage(v);}} className="forss">
                <List.Item arrow="horizontal">请选择</List.Item>
            </Picker>}
            </div>
            <ul className="de_list">
                {
                    this.props.more[0]&&this.props.more.map((item,index)=>{
                        return <li key={index}>
                            <span>{item.timer}</span>
                            <span>{item.spendmoney}</span>
                            <span>{item.remarks}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    }
    componentWillMount(){
        this.props.getall();
        this.props.setmore()
        let str=window.location.search.split('?')[1];
        str&& str.split('&').forEach((item)=>{
            if(item.split('=')[0]==='user'){
                this.setState({name:item.split('=')[1]})
                this.props.getmessage(item.split('=')[1]);
            }
        });
        let arr=[];
        this.props.basic&&this.props.basic.forEach(element => {
            let {username}=element;
            arr.push({value:username,label:username});
        });
        this.setState({sValue:arr});
    }
};
let mapstate=(state)=>{
    return {
        more:state.count.more,
        basic:state.count.basic
    }
};
let mapdispatch=(dispatch)=>{
    return {
        getmessage(username){
            dispatch(getmessage(username))
        },
        getall(){
            dispatch(getallusers())
        },
        setmore(){
            dispatch(setmore())
        }
    }
}
Detail=connect(mapstate,mapdispatch)(Detail);
export default Detail;