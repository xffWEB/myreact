import React,{Component} from 'react';
import './css/alert.css';
import {connect} from 'react-redux';
import {COUNT_REISADD_MESSAGE} from '../../store/reducers/actions';
import {createuser,deluser} from '../../mock/index';
class Alert extends Component{
    render(){
        let {type}=this.props;
        return <div className='mask'>
            {type==='add'?<ul className="mark">
                <li>
                <span>用户id</span>
                <input type="text" placeholder='请输入用户id' ref='userid'/>
                </li>
                <li>
                <span>姓名</span>
                <input type="text" placeholder='请输入姓名' ref='user_name'/>
                </li>
                <li>
                <span>金钱基数</span>
                <input type="text" placeholder='请输入金钱基数' ref='user_money'/>
                </li>
                <li className="selec">
                    <button type="submit" className='sub' onClick={this.sure.bind(this)}>确定</button>
                    <button type="reset" className='res' onClick={this.reset.bind(this)}>取消</button>
                </li>
            </ul>:<ul className='mark'>
                <li className='nodebor'><span>警告</span></li>
                <li className='nodebor'><span>确认删除？</span></li>
                <li className="selec">
                    <button type="submit" className='sub' onClick={this.sure.bind(this,'del')}>确定</button>
                    <button type="reset" className='res' onClick={this.reset.bind(this)}>取消</button>
                </li>
            </ul>}
        </div>
    }
    sure(del){
        if(del!=='del'){
            if(typeof(parseInt(this.refs.userid.value.trim()))==='number'){
                if(typeof(this.refs.user_name.value.trim())==='string'){
                    if(typeof(parseInt(this.refs.user_money.value.trim()))==='number'){
                        let arr={username:this.refs.user_name.value,userid:this.refs.userid.value,moneybase:this.refs.user_money.value};
                        let cc=this.props.basic.some(item=>{
                            return item.username===arr.username||item.userid===arr.userid;
                        })
                        if(!cc){
                            this.props.reset(true)
                            this.props.adduser(arr)
                        }else{
                            console.log(4)
                            this.props.reset(false)
                        }
                        this.props.add(true);
                        this.refs.userid.value='';
                        this.refs.user_name.value='';
                        this.refs.user_money.value='';
                    }else{
                        alert('金钱基数为number')
                    }
                }else{
                    alert('name为string类型')
                }
            }else{
                alert('id为number类型')
            }
        }else{
            this.props.add(true)
            this.props.deluser(this.props.index);
        }
    }
    reset(){
        this.props.add(true,'over')
    }
};
let mapstate=(state)=>{
    return {
        basic:state.count.basic
    }
};
let mapdispatch=(dispatch)=>{
    return {
        adduser(useritem){
            dispatch(createuser(useritem))
        },
        deluser(useritem){
            dispatch(deluser(useritem))
        },
        reset(ty){
            dispatch({type:COUNT_REISADD_MESSAGE,ty})
        }
    }
}
Alert=connect(mapstate,mapdispatch)(Alert);
export default Alert;