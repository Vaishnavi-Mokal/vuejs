<template>
  <section>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <div class="col-sm-9 padding-right">
          <Product v-for="product in arr" :key="product.id" :id="product.id" :pname="product.name" :image="product.image[0].imagepath" :price="product.price" />
            
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Slider from "./includes/Slider.vue";
import Sidebar from "./includes/Sidebar.vue";
import Product from "./Product.vue";
import axios from "axios";



export default {
  name: "Main",
  components: {
    Slider,
    Sidebar,
    Product,
  },
  data() {
    return {
      arr: null,
     
    };
  },
 
  mounted(){
   axios.get("http://127.0.0.1:8000/api/product")
    .then($res=>{
      console.log($res.data);
      this.arr=$res.data.products;

    })
 },
 
};
</script>

<style>
</style>