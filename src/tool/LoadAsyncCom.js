import React , {Component} from 'react';
import './loading.css'
export function LoadAsyncCom (LoadCom,Loading) {
    return class Com extends Component{
        constructor(props){
            super(props);
            this.state={
                Load:Loading
            }
        }
        render(){
            let {Load}=this.state;
            return <Load {...this.props} />
        }
        componentDidMount(){
            LoadCom().then((res)=>{
                this.setState({Load:res.default})
            })
        }
    }
}
export function Loading (){
    return <div className='load'><img src="http://img.zcool.cn/community/015e9b5786f9290000018c1b3e3eb8.gif" alt=""/></div>}