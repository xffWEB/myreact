import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';
import {data} from './data.js';
import Manger from '../components/count/Manger';
function Index(){
    return <Router>
            <Switch>
                <Route path='/manger' component={Manger}></Route>
                {
                    data.map((item,index)=>{
                        return <Route path={item.path} key={index} render={({match,location,history})=>{
                            let Com=item.component;
                            return <Com match={match} location={location} history={history} child={item.children}/>
                        }}>
                        </Route>
                    })
                }
                <Redirect from='/' to='/box/home'/>
            </Switch>
        </Router>
}
export default Index;