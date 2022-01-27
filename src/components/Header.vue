<template>
  <header id="header">
    <!--header-->
    <div class="header_top">
      <!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
                <li>
                  <a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-envelope"></i> info@domain.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="social-icons pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-linkedin"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-dribbble"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header_top-->

    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
            </div>
            <div class="btn-group pull-right">
              
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                
                <!-- <li class="dropdown">
                  <a href="javascript:void(0)">Services<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li  v-for="(service,i) in services" :key="i"><router-link :to="{name: 'Cms', params: {id: service.id,image:service.image,title:service.title,desc:service.description}}">{{service.title}}</router-link></li>
                  </ul>
                </li> -->
                <li>
                  <router-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart{{
                      [numInCart]
                    }}</router-link
                  >
                </li>
                <li>
                  <router-link to="/login"  
                   v-if="!user" ><i class="fa fa-lock"></i> Login</router-link
                  ></li>
                  <li>
                   <router-link to="/register"  v-if="!user"
                    ><i class="fa fa-user"></i> Register</router-link
                  >
                  </li>
                  <li>
                  <router-link to="/" v-if="user"
                    >Welcome {{uid}}</router-link
                  ></li>
                   <!-- <li>
                  <router-link to="/myorder"  v-if="user"><i class="fa fa-circle" ></i> My Order</router-link>
                </li> -->
                  <li>
                  <a
                   v-if="user" v-on:click="logout()"><i class="fa fa-lock"></i> Logout</a
                  > 
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li><router-link to="/" class="active">Home</router-link></li>
                <li class="dropdown">
                  <a href="#">Account<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li><router-link to="/profile">My Profile</router-link></li>
                    <li><router-link to="/changePassword">Change Password</router-link></li>
                  </ul>
                </li>
               <li>
                  <router-link to="/contact">Contact Us </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            
          </div>
        </div>
      </div>
    </div>
    <!--/header-bottom-->
  </header>
</template>

<script>

import {removeToken} from '@/common/Jwttoken';
import { mapState } from "vuex";
// import {servicesCMS} from '@/common/Service';




export default {
  name: "Header",
   computed: mapState({
    
    inCart() {
      return this.$store.getters.inCart;
    },
    numInCart() {
      return this.inCart.length;
    },
  }),
  
  
  data(){
   return{
   
      user:false,
   }
  },
  created(){
    

      let token=localStorage.getItem('token');
        
      
     
      if(token!=null){
        this.user=true;
        
      }
      
  },
  methods:{
    
    logout(){
      
        localStorage.removeItem('token');
        // localStorage.removeItem('myCart');
        localStorage.removeItem('uid');
        removeToken()
        this.$swal('Logout SuccessFull!!');
        window.location.reload();
        
      
    }
  }
};
</script>

<style>
</style>