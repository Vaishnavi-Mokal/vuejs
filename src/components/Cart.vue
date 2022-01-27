<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="description">Name</td>
                <td class="price">Quantity</td>
                <td class="quantity">Price</td>
                <td class="total">Action</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in item" :key="product.id">
                <td class="cart_product">
                  <a href=""
                    ><img
                      v-bind:src="url + product.image"
                      height="100"
                      width="100"
                      alt=""
                  /></a>
                </td>
                <td class="cart_description">
                  <h4>
                    <a href="">{{ product.name }}</a>
                  </h4>
                  <p></p>
                </td>
                
                <!-- <td class="cart_price">
                  <p>{{ product.price }}</p>
                </td> -->
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                    <a class="cart_quantity_up" @click="addCart(product)"> + </a>
                    <input
                      class="cart_quantity_input"
                      type="text"
                      name="quantity"
                      v-model="product.quantity"
                      autocomplete="off"
                      size="2"
                    />
                    <a class="cart_quantity_down" @click="subCart(product)"> - </a>
                  </div>
                </td>
                
                <td class="cart_total">
                  <p class="cart_total_price">${{ parseInt(product.price) * parseInt(product.quantity) }}</p>
                  <p class="hidden">{{totalprice.push(product.price * product.quantity)}}</p>
                </td>
                <td class="cart_delete">
                  <button class="cart_quantity_delete" @click="deleteCart(product)"
                    ><i class="fa fa-times"></i
                  ></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->

    <section id="do_action">
      <div class="container">
        
        <div class="row">
          
          <div class="col-sm-6">
            <div class="total_area">
              <ul>
                <li>Cart Sub Total <span>${{productTotal()}}</span></li>
                <li>Shipping Cost 
                  <span v-id="productTotal() == finalTotal()">Free</span>
                  <span v-id="productTotal() != finalTotal()">$50</span>
                </li>
                <li>Total <span>${{finalTotal()}}</span></li>
              </ul>
              
             <router-link to="/login" class="btn btn-default check_out" v-if="!user"
                    >For Check Out Login First </router-link
                  >
                     
              <router-link  v-if="user" class="btn btn-default check_out" to="/checkout">Check Out</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/#do_action-->
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      item: undefined,
      url: "http://127.0.0.1:8000/productimages/",
      totalprice: [],
      cartprice: [],
      proimage: undefined,
    };
  },
  created(){
    

      let token=localStorage.getItem('token');
        
      
     
      if(token!=null){
        this.user=true;
        
      } 
      
  },
  mounted() {
    this.item = JSON.parse(localStorage.getItem("myCart"));
  },
  methods:
  {
    addCart(product)
    {
      Object.assign(product,{
        quantity: parseInt(product.quantity) + 1,
      });
      localStorage.setItem("myCart",JSON.stringify(this.item));
    },
    subCart(product)
    {
      Object.assign(product,{
        quantity: parseInt(product.quantity) - 1,
      });
      localStorage.setItem("myCart",JSON.stringify(this.item));
    },
    productTotal()
    {
      const details=JSON.parse(localStorage.getItem("myCart"));
      var sum=0;
      details.forEach(element => {
        sum=sum+element.price * element.quantity;
      });
      return sum;
    },
    finalTotal()
    {
      const price = this.productTotal();
      if(price > 500)
      {
        return price;
      }
      else
      {
        return price + 50;
      }
    },
    deleteCart(product)
    {
      let details =this.item.indexOf(product);
      console.log(details);
      this.item.splice(details,1);
      localStorage.setItem("myCart",JSON.stringify(this.item));
      this.$swal('Product Deleted!!');
      window.location.reload();
      
          
    },


  }

};
</script>

<style>
</style>