<template>
      <div class="container">
        <div class="row">
          <Sidebar />
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Features Items</h2>
              <div class="col-sm-4" v-for="(i, index) in arr" :key="index">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo">
                      <img
                        :src="i.images[0].image"
                        class="girl img-responsive"
                        alt="cat"
                      />
                      <h2>Rs. {{ i.price }}</h2>
                      <div>Model name: {{ i.name }}</div>
                      
                      <div class="text-left ">
                        <ul >
                        <li>
                          <button class="btn btn-default add-to-cart" @click="addToCart(id,name,image,price)"
                            ><i class="fa fa-shopping-cart"></i> Add to cart</button
                          ></li>
                            
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
  
</template>

<script>

import Sidebar from "./includes/Sidebar.vue";
import { categorybyid } from "@/common/Service";
import axios from "axios";
export default {
  name: "Category",
  props:['id','name','image','price'],
  components: {
    Sidebar,
  },
  data() {
    return {
      arr: [],
       paramm: undefined,
       
    };
  },
  
    
   watch: {
    $route(to) {
      this.paramm = to.params.id;
      categorybyid( this.paramm).then((res) => {
        this.arr = res.data.categorybyid;
        console.log(res.data);
      });
    },
  },
  created() {
    this.paramm = this.$route.params.id;
  },
  mounted() {
    
    axios.get("http://127.0.0.1:8000/api/product")
    .then($res=>{
      console.log($res.data);
      this.arr=$res.data.products;

    })
      categorybyid(this.paramm)
        .then((res) => {
          this.arr = res.data.categorybyid;
          console.log(this.arr);
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });

        
  },
  methods:{
      addToCart(id,pname,image,price) {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = {
          pid: id,
          name: pname,
          price: price,
          quantity: 1,
          image: image,
        };
        const found=arr.some((el)=> el.pid == id);
        if(found)
        {
          
          this.$swal('Product Already in cart!!',pname,'error');
          
          
        }
        else
        {
          arr.push(obj);

       
        
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addToCart", arr);
        this.$swal('Product Added!!',pname,'success');
        }
         
      
      } else {
        let arr = [];
        let obj = {
         pid: id,
          name: pname,
          price: price,
          quantity: 1,
          image: image,
        };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addToCart", arr);
      }
    },
}
};
</script>

<style>
</style>