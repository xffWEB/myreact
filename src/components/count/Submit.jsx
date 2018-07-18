import React,{Component} from 'react';
import Header from './Header';
import { DatePicker, List , Picker} from 'antd-mobile';
import './css/submit.css';
import {COUNT_GETALL_MESSAGE} from '../../store/reducers/actions';
import {connect} from 'react-redux';
import { Modal } from 'antd-mobile';
import {addmess,getallusers} from '../../mock/index';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class Submit extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: now,
            sValue:[
            ],
            show:[]
        }
    }
    render(){
        return <div >
            <Header/>
            <div className="sele">
            <DatePicker
                mode="date"
                title="Select Date"
                extra="请选择"
                value={this.state.date}
                onChange={date => this.setState({ date })}
            >
                <List.Item arrow="horizontal">时间</List.Item>
            </DatePicker>
            </div>
            <div className="sele">
            <Picker data={this.state.sValue} cols={1} value={this.state.show} onOk={(v)=>{this.setState({show:v})}} className="forss">
                <List.Item arrow="horizontal">姓名</List.Item>
            </Picker>
            </div>
            <div className="sele">
                <span>金额</span>
                <input type="text" placeholder='请输入金额' ref='money'/>
            </div>
            <div className="sele">
                <span>备注</span>
                <input type="text" placeholder='请输入备注' ref='remark'/>
            </div>
            <div className="selec">
            <button type="submit" className='sub' onClick={this.sub.bind(this)}>提交</button>
            <button type="reset" className='res' onClick={this.emp.bind(this)}>清空</button>
            </div>
           
        </div>
    }
    componentDidMount(){
        let arr=[];
        this.props.basic&&this.props.basic.forEach(element => {
            let {username}=element;
            arr.push({value:username,label:username})
        });
        this.setState({sValue:arr});
    }
    componentWillMount(){
        this.props.getall()
    }
    sub(){
        if(!this.state.date){
            Modal.alert('提示', '日期不能为空',[{ text: '确定'}])
        }
        else if(!this.state.show[0]){
            Modal.alert('提示', '姓名不能为空',[{ text: '确定'}])
        }
        else if(isNaN(parseInt(this.refs.money.value.trim()))){
            Modal.alert('提示', '金额不能为空',[{ text: '确定'}])
        }
        else if((this.refs.remark.value.trim().length===0)){
            Modal.alert('提示', '备注不能为空',[{ text: '确定'}])
        }else{
            let data={
                timer:this.state.date.toISOString().slice(0,10),
                username:this.state.show[0],
                spendmoney:parseInt(this.refs.money.value.trim()),
                remarks:this.refs.remark.value
            };
            this.props.addmess(data);
            let tie=this.props.basic.find(item=>item.username===data.username).moneybase;
            Modal.alert('请确认',<div></div>, [
                { text: '时间：'+data.timer },
                { text: '姓名：'+data.username},
                { text: '金额'+data.spendmoney},
                { text: '用途备注：'+data.remarks},
                { text: '确定' ,onPress: () => Modal.alert('提示', '提交成功，个人总计'+(tie*1+data.spendmoney*1)+'元',[{ text: '确定'}])},
              ]);
            this.setState({show:[]});
            this.refs.money.value='';
            this.refs.remark.value='';
        }
    }
    emp(){
        this.setState({show:[]});
        this.refs.money.value='';
        this.refs.remark.value='';
    }
};
let mapstate=(state)=>{
    return {
        basic:state.count.basic
    }
};
let mapdispatch=(dispatch)=>{
    return {
        addmess(newmess){
            dispatch(addmess(newmess))
        },
        getall(){
            dispatch(getallusers())
        }
    }
}
Submit=connect(mapstate,mapdispatch)(Submit);
export default Submit;