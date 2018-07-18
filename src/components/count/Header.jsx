import React,{Component} from 'react';
class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            move:false
        }
    }
    render(){
        return <div className="mue_row">
            <div className="mue_col_sm" onClick={this.move.bind(this)}>更多</div>
            <div className="mue_col_bi"></div>
        </div>
    }
    move(){
        this.setState({move:!this.state.move});
        if(this.state.move){
            document.getElementsByClassName('wrap')[0].classList.add("move");
        }else{
            document.getElementsByClassName('wrap')[0].classList.remove("move");
        }
    }
}
export default Header;