import React,{Component} from 'react';
import Alert from './Alert';
import { Modal } from 'antd-mobile';
import {COUNT_REUSER_MESSAGE} from '../../store/reducers/actions';
import {connect} from 'react-redux';
import {reuser} from '../../mock/index';
class Mgitem extends Component{
    constructor(props){
        super(props);
        this.state={
            type:false
        }
    }
    render(){
        let {item,index}=this.props;
        return <li>
        <span onClick={this.edit.bind(this)}>🖊</span>
        <span>{item.username}</span>
        <span>{item.userid}</span>
        <span onClick={this.remove.bind(this)}>🚮</span>
        <div style={{display:this.state.type?'inline-block':'none'}}>
        <Alert type='del' index={item.username} add={this.can.bind(this)} />
        </div>
    </li>
    
    }
    remove(ty){
        this.setState({type:true})
        if(ty===false){
            this.setState({type:false})
        }
    }
    can(type){
        if(type===true){
            this.setState({type:false})
        }
    }
    edit(){
        Modal.prompt('',
        '',
        [
            { text: '取消' },
            { text: '修改', onPress: value => this.props.reuser({'username':value},this.props.item.userid)},
        ],
        'default',null,'姓名')
    }
    componentDidUpdate(){
    }
};
let mapstate=(state)=>{
    return {}
};
let mapdispatch=(dispatch)=>{
    return {
        reuser(arr,userid){
            dispatch(reuser(arr,userid))
        }
    }
}
Mgitem=connect(mapstate,mapdispatch)(Mgitem);
export default Mgitem;