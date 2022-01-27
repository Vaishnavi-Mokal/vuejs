<template>

              <!--features_items-->
              
              <div class="col-sm-4">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo">
                      <img
                        :src="url+ image"
                        class="girl img-responsive" height="100" width="50"
                        alt="abc"
                      />
                      <h2><b>Rs. {{ price }}</b></h2>
                      <div><b>Model name: {{ pname }}</b></div>
                    
                      <div>
                        <ul >
                        <li>
                          <button class="btn btn-default add-to-cart" @click="addToCart(id,pname,image,price)"
                            ><i class="fa fa-shopping-cart"></i> Add to cart</button
                          ></li>
                            
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
</template>

<script>



export default {
name:"Product",
  props:['id','pname','image','price'],
  data()
  {
     return{
         url: "http://127.0.0.1:8000/productimages/"  
         };
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
}

</script>

<style>

</style>