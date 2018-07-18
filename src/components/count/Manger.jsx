import React,{Component} from 'react';
import './css/manger.css'
import Alert from './Alert';
import Mgitem from './Mgitem';
import {connect} from 'react-redux';
import { Modal } from 'antd-mobile';
import {COUNT_REISADD_MESSAGE} from '../../store/reducers/actions';
import {getallusers,reisok} from '../../mock/index';
class Manger extends Component{
    constructor(props){
        super(props);
        this.state={
            type:true
        }
    }
    render(){
        let {type}=this.state;
        let {basic}=this.props;
        console.log(basic)
        return <div className='wrap'>
            <header className='man_hea'>
                <span onClick={()=>{
                    window.history.back()
                }}>{'<'}</span>
                <h3>用户管理</h3>
                <span className='man_add' onClick={this.adduser.bind(this)}>+</span>
            </header>
            <section>
                <ul className="man_list" style={{display:basic[0]?'block':'none'}}>
                    {
                        basic&&basic.map((item,index)=>{
                            return <Mgitem key={index} item={item} index={index} add={this.getadd.bind(this)}/>
                        })
                    }
                </ul>
            </section>
            <div style={{display:type?'none':'block'}}>
            <Alert add={this.getadd.bind(this)} type='add'/>
            </div>
        </div>
    } 
    getadd(type,item){
        this.setState({type:true});
        if(item){
            return;
        }
    }
    componentWillMount(){
        this.props.getall()
    }
    componentDidUpdate(){
        if(this.props.isAdd===false){
             Modal.alert('提示', 'id或姓名重复',[{ text: '确定'}])
             this.props.reset(null);
        }else if(this.props.isAdd===true){
            Modal.alert('提示', '添加成功',[{ text: '确定'}])
            this.props.reset(null)
       }
    //    if(this.props.isok){
    //        this.props.getall()
    //        this.props.reisok()
    //    }
    }
    adduser(){
        this.setState({type:false})
    }
}
let mapstate=(state)=>{
    return{
        basic:state.count.basic,
        isAdd:state.count.isAdd,
        isok:state.count.isok
    }
};
let mapdispatch=(dispatch)=>{
    return {
        reset(ty){
            dispatch({type:COUNT_REISADD_MESSAGE,ty})
        },
        getall(){
            dispatch(getallusers())
        },
        reisok(){
            dispatch(reisok())
        }
    }
}
Manger=connect(mapstate,mapdispatch)(Manger);
export default Manger;