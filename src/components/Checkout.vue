<template>
  <section id="cart_items">
    <div class="container">
      <div class="breadcrumbs">
        <ol class="breadcrumb">
          <li><a href="#">Home</a></li>
          <li class="active">Check out</li>
        </ol>
      </div>
      <!--/breadcrums-->

      <div class="step-one">
        <h2 class="heading">Step1</h2>
      </div>

      <div class="shopper-informations">
        <div class="row">
          <div class="col-sm-5 clearfix">
            <div class="bill-to">
              <p>Bill To</p>
              <div class="form-one">
                <form @submit.prevent="handleCheckout">
                  <input
                    type="email"
                    placeholder="Email*"
                    v-model="user.email"
                  />
                  <div
                    v-if="submitted && !$v.user.email.required"
                    class="invalid-feedback text-danger"
                  >
                    Email is required
                  </div>
                  <div
                    v-if="submitted && !$v.user.email.email"
                    class="invalid-feedback text-danger"
                  >
                    Enter correct Email
                  </div>

                  <input
                    type="text"
                    placeholder="First Name *"
                    v-model="user.firstname"
                  />
                  <div
                    v-if="submitted && !$v.user.firstname.required"
                    class="invalid-feedback text-danger"
                  >
                    Firstname is required
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name *"
                    v-model="user.lastname"
                  />
                  <div
                    v-if="submitted && !$v.user.lastname.required"
                    class="invalid-feedback text-danger"
                  >
                    Lastname is required
                  </div>
                  <input
                    type="text"
                    placeholder="Address 1 *"
                    v-model="user.address1"
                  />
                  <div
                    v-if="submitted && !$v.user.address1.required"
                    class="invalid-feedback text-danger"
                  >
                    Address is required
                  </div>

                  <input
                    type="text"
                    placeholder="Zip / Postal Code *"
                    v-model="user.zip"
                  />
                  <div
                    v-if="submitted && !$v.user.zip.required"
                    class="invalid-feedback text-danger"
                  >
                    Zip is required
                  </div>

                  <input
                    type="text"
                    placeholder="Phone *"
                    v-model="user.phone"
                  />
                  <div
                    v-if="submitted && !$v.user.phone.required"
                    class="invalid-feedback text-danger"
                  >
                    Phone is required
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="order-message">
              <p>Shipping Order</p>
              <textarea
                name="message"
                placeholder="Notes about your order, Special Notes for Delivery"
                rows="16"
                v-model="user.shipping"
              >
              </textarea>
              
            </div>
          </div>
        </div>
      </div>

      <div class="step-one">
        <h2 class="heading">Step2</h2>
      </div>

      <div class="review-payment">
        <h2>Review & Payment</h2>
      </div>

      <div class="table-responsive cart_info">
        <table class="table table-condensed">
          <thead>
            <tr class="cart_menu">
              <td class="image">Item</td>

              <td class="price">Name</td>
              <td class="price">Quantity</td>
              <td class="quantity">Price</td>
              <td class="total">Action</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in item" :key="product.id">
              <td class="cart_product">
                <a href=""
                  ><img
                    :src="url + product.image"
                    height="100"
                    width="100"
                    alt=""
                /></a>
              </td>
              <td class="cart_description">
                <h4>
                  <a href="">{{ product.name }}</a>
                </h4>
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
                  <a class="cart_quantity_down" @click="subCart(product)">
                    -
                  </a>
                </div>
              </td>

              <td class="cart_total">
                <p class="cart_total_price">
                  ${{ parseInt(product.price) * parseInt(product.quantity) }}
                </p>
                <p class="hidden">
                  {{ totalprice.push(product.price * product.quantity) }}
                </p>
              </td>
              <td class="cart_delete">
                <button
                  class="cart_quantity_delete"
                  @click="deleteCart(product)"
                >
                  <i class="fa fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div class="chose_area">
          <ul class="user_option">
            <li>
              <input
                type="checkbox"
                :checked="checked"
                @input="checked = Coupon()"
              />
              <label>Use Coupon Code</label>
              <select v-model="selected" v-for="(code, i) in coupon" :key="i">
                <option disabled selected value="">Please select one</option>
                <option :value="code.value">{{ code.code }}</option>
              </select>
            </li>
          </ul>
          <p class="hidden">{{ (couponValue = selected) }}</p>
        </div>

        <table class="table table-bordered">
          <tbody>
            <tr>
              <td>
                <table class="table table-condensed total-result">
                  <tr class="te">
                    <td><strong>Cart Sub Total</strong></td>
                    <td>
                      <span>${{ producttotal() }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td v-if="couponValue != undefined">
                      Coupon <span>${{ couponValue }}</span>
                    </td>
                  </tr>
                  <tr class="shipping-cost">
                    <td><strong>Shipping Cost</strong></td>
                    <td>
                      Shipping Cost
                      <span v-if="producttotal() >= 500">Free</span>
                      <span v-if="producttotal() < 500">$50</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td>
                      <span>${{ finalTotal() }}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="step-one">
      <h2 class="heading">Step3</h2>
    </div>

    <div class="container payment-options">
     

     <button class="btn btn-default update" v-on:click="paymentOffline">
      Cash on delivery
    </button>
    <button class="btn btn-default update" v-on:click="paymentOnline">
      Paypal
    </button>

    <div class="" v-if="online">
      <Paypal />
    </div>
    <div v-else>
      <p  class="cash text-success "> <br><strong>Note :Payment method is select as Cash on Delivery</strong></p>
    </div>
     
    </div>
    <form @submit.prevent="ordercheckout">
      <button class="btn btn-success check_out" type="submit">
        Place Order
      </button>
    </form>
  </section>
  <!--/#cart_items-->
</template>

<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
import { MAIN_URL } from "@/common/Url";
import Paypal from '../components/Paypal.vue';

export default {
  name: "Checkout",
  components:{
    Paypal
  },
  data() {
    return {
      online:false,
      payment:null,
      item: undefined,
      details: undefined,
      uemail: undefined,
      coupon: undefined,

      url: "http://127.0.0.1:8000/productimages/",
      totalprice: [],
      cartprice: [],
      proimage: undefined,
 
      user: {
        email: undefined,
        firstname: undefined,
        lastname: undefined,
        address1: undefined,
        zip: undefined,
        phone: undefined,
        shipping: undefined,
      },
      submitted: false,
      couponValue: undefined,
      selected: undefined,
    };
  },
  validations: {
    user: {
      email: { required, email },
      firstname: { required },
      lastname: { required },
      address1: { required },
      zip: { required },
      phone: { required },
    },
  },

  mounted() {
    axios.get("http://127.0.0.1:8000/productimages/").then(($res) => {
      console.log($res.data);
      this.product = $res.data.Product;
    });
    this.item = JSON.parse(localStorage.getItem("myCart"));
    console.log(this.item);
   
  },

  methods: {

    paymentOnline() {
      this.online = true;
    },
    paymentOffline() {
      this.online = false;
    },
    //increment
    addCart(product) {
      Object.assign(product, {
        quantity: parseInt(product.quantity) + 1,
      });
      localStorage.setItem("myCart", JSON.stringify(this.item));
    },
    //decrement
    subCart(product) {
      Object.assign(product, {
        quantity: parseInt(product.quantity) - 1,
      });
      localStorage.setItem("myCart", JSON.stringify(this.item));
    },
    producttotal() {
      const details = JSON.parse(localStorage.getItem("myCart"));
      var sum = 0;
      details.forEach((element) => {
        sum = sum + element.price * element.quantity;
      });
      return sum;
    },
    finalTotal() {
      const price = this.producttotal();
      if (this.couponValue) {
        return price - this.couponValue;
      }
      if (price > 500) {
        return price;
      } else {
        return price + 50;
      }
    },
   

    deleteCart(product) {
      let details = this.item.indexOf(product);
      console.log(details);
      this.item.splice(details, 1);
      localStorage.setItem("myCart", JSON.stringify(this.item));
      this.$swal("Product Deleted!!");
      window.location.reload();
    },
    Coupon() {
      axios.get("http://127.0.0.1:8000/api/coupons").then(($res) => {
        console.log($res.data);
        this.coupon = $res.data.coupons;
      });
    },

    async ordercheckout() {
      this.submitted = true;
      this.$v.user.$touch();
      if (this.$v.user.$invalid) {
        return;
      } else {
        let product = JSON.parse(localStorage.getItem("myCart"));
        this.uemail = localStorage.getItem("uid");
        let formData = {
          email: this.user.email,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          address1: this.user.address1,
          zip: this.user.zip,
          phone: this.user.phone,
          shipping: this.user.shipping,
          product: product,
          producttotal: this.producttotal(),
          finalTotal: this.finalTotal(),
          
        };
        console.log(formData);
        // checkout(formData)
        var token = localStorage.getItem("token");

        await axios
          .post(`${MAIN_URL}checkout`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            //console.log(res);
            localStorage.removeItem("myCart");

            alert(res.data.msg);
            this.$router.push("/");
            window.location.reload();
          })
          .catch((error) => {
            alert("Unauthorized");
            console.log("Something Wrong" + error);
          });
      }
    },
  },
};
</script>

<style>
</style>