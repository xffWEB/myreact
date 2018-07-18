import { COUNT_ADDUSER_MESSAGE, COUNT_GETALL_MESSAGE, COUNT_REMORE_MESSAGE, COUNT_REISOK_MESSAGE, COUNT_GETONE_MESSAGE, COUNT_ADDONE_MESSAGE, COUNT_DELUSER_MESSAGE, COUNT_REUSER_MESSAGE } from '../store/reducers/actions';
import axios from 'axios';
export function createuser(useritem) { //添加用户
    return (dispatch) => {
        let { userid, username, moneybase } = useritem;
        axios.post('http://localhost:8000/createuser', { 'userid': userid, 'username': username, 'moneybase': moneybase }).then((res) => {
            dispatch({ type: COUNT_ADDUSER_MESSAGE, res })
        })
    }
}
export function getallusers() { //获取所用用户
    return (dispatch) => {
        axios.post('http://localhost:8000/getallusers').then((res) => {
            dispatch({ type: COUNT_GETALL_MESSAGE, res })
        })
    }
}
export function reisok() { //修改isok
    return (dispatch) => {
        dispatch({ type: COUNT_REISOK_MESSAGE });
    }
}
export function deluser(useritem) { //删除用户信息
    return (dispatch) => {
        axios.post('http://localhost:8000/deluser', { 'info': useritem }).then((res) => {
            dispatch({ type: COUNT_DELUSER_MESSAGE, res })
        })
    }
}
export function reuser(arr, userid) { //修改用户名字
    let { username } = arr;
    return (dispatch) => {
        axios.post('http://localhost:8000/changenames', { 'userid': userid, 'newname': username }).then((res) => {
            dispatch({ type: COUNT_REUSER_MESSAGE, res })
        })
    }
}
export function addmess(newmess) { //添加信息
    return (dispatch) => {
        axios.post('http://localhost:8000/addmess', { newmess }).then((res) => {
            dispatch({ type: COUNT_ADDONE_MESSAGE, res })
        })
    }
}
export function getmessage(username) { //获取个人所有信息
    return (dispatch) => {
        axios.post('http://localhost:8000/getmessage', { 'username': username }).then((res) => {
            let data = res.data;
            dispatch({ type: COUNT_GETONE_MESSAGE, data })
        })
    }
}
export function setmore(username) { //设置more
    return (dispatch) => {
        dispatch({ type: COUNT_REMORE_MESSAGE })
    }
}