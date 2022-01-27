import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Main from '../components/Main.vue'
import Contact from '../components/Contact.vue'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Cart from '../components/Cart.vue'
import Checkout from '../components/Checkout.vue'
import Category from '../components/Category.vue'
import Profile from '../components/Profile.vue'
import ChangePassword from '../components/ChangePassword.vue'
import Paypal from '../components/Paypal.vue'



export default new Router({
    routes:[
      {  path:'/',
        name:'Main',
        component:Main
    },
    {  path:'/contact',
        name:'Contact',
        component:Contact
    },
  
    {  path:'/login',
        name:'Login',
        component:Login
    },
    {  path:'/register',
    name:'Register',
    component:Register
},
{
    path:'/profile',
    name:'Profile',
    component:Profile
},

{
    path:'/categorybyid/:id',
    name:'Category',
    component:Category
},
    {  path:'/cart',
    name:'Cart',
    component:Cart
},


{  path:'/checkout',
    name:'Checkout',
    component:Checkout,
},

{  path:'/changePassword',
    name:'ChangePassword',
    component:ChangePassword
},
{  path:'/paypal',
    name:'Paypal',
    component:Paypal
},
    ]
})