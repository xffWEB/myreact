import React,{Component} from 'react';
import { Route,Link} from 'react-router-dom';
import './css/style.css';
class Box extends Component{
    constructor(props){
        super(props);
        this.state={
            green:0,
            move:false,
            arr:[]
        }
    }
    render(){
        let {child,match}=this.props;
        let {green,move}=this.state;
        return <div className={move?'wrap move':'wrap'} ref='box' onClick={this.move.bind(this)}>
            <section>
                {
                    child.map((item,index)=>{
                        return <Route key={index} path={match.url+item.path} render={({match,history,location})=>{
                            let Com=item.component;
                            return <Com match={match} history={history} location={location}/>
                        }}></Route>
                    })
                }
            </section>
            <footer className='footer'>
                {
                    child.map((item,index)=>{
                        return <Link 
                        to={match.url+item.path} 
                        key={index} 
                        onClick={()=>{this.setState({green:index})}} 
                        style={{color:green===index?'green':'#666'}}
                        >
                        {item.title}
                        </Link>
                    })
                }
            </footer>
        </div>
    }
    move(){
        let {arr}=this.state;
        this.refs.box.classList.forEach(item => {
            arr.push(item)
        })
        if(arr.some(item=>item==='move')){
            this.setState({move:false})
        }
    }
}
export default Box;