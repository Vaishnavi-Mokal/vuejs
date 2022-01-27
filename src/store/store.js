import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        token:'',
       emailid:''
    },
    mutations:{
        tokenemail(state,payload){
            return state.token=payload.id,state.emailid=payload.uid;
        },
        LOGOUT:(state)=>{
            state.token="",
            state.emailid="",
            window.localStorage.removeItem('token'),
            window.localStorage.removeItem('uid')
        }
        // increment(state,payload){
        //     return state.count=state.count+payload.amount
        // },
        // decrement(state,payload){
        //     return state.count=state.count-payload.amount
        // },
    },
    actions:{
        token(context,payload){
            context.commit('tokenemail',payload)
        },
        logout({commit}){
            commit('LOGOUT')
            this.$router.push("/login");
        }
        // increment(context,payload){
        //     context.commit('increment',payload)
        // },
        // decrement(context,payload){
        //     context.commit('decrement',payload)
        // }
    }
})