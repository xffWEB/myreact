import { COUNT_ADDUSER_MESSAGE, COUNT_GETALL_MESSAGE, COUNT_REMORE_MESSAGE, COUNT_GETONE_MESSAGE, COUNT_REISADD_MESSAGE, COUNT_REISOK_MESSAGE, COUNT_ADDONE_MESSAGE, COUNT_DELUSER_MESSAGE, COUNT_REUSER_MESSAGE } from './actions';

let actions = {
    [COUNT_ADDUSER_MESSAGE](state, action) {
        state.allItem.basic = action.res.data.selects
    },
    [COUNT_DELUSER_MESSAGE](state, action) {
        state.allItem.basic = action.res.data.selects
    },
    [COUNT_REISADD_MESSAGE](state, action) {
        state.isAdd = action.ty;
    },
    [COUNT_REUSER_MESSAGE](state, action) {
        state.allItem.basic = action.res.data.selects
    },
    [COUNT_ADDONE_MESSAGE](state, action) {
        if (action.res.data.code === 1) {
            state.isok = true;
        } else {
            state.isok = false;
        }
    },
    [COUNT_REISOK_MESSAGE](state, action) {
        state.isok = null;
    },
    [COUNT_GETALL_MESSAGE](state, action) {
        state.allItem.basic = action.res.data.selects;
    },
    [COUNT_GETONE_MESSAGE](state, action) {
        state.allItem.more = action.data.selects;
    },
    [COUNT_REMORE_MESSAGE](state, action) {
        state.allItem.more = [];
    }
}
export let count = (state = { allItem: { basic: [], more: [] }, isAdd: null, isok: null }, action) => {
    actions[action.type] && actions[action.type](state, action);
    return {...state, allItem: {...state.allItem }, basic: [...state.allItem.basic], more: [...state.allItem.more], isAdd: state.isAdd, isok: state.isok };
};
//allItem 所有的用户