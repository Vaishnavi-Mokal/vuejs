<template>
  <div class="" id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 offset-sm-2">
          <div>
            <h2>Login to your account</h2>
            <form @submit.prevent="postRegister()">
                <div class="form-group">
                <input
                  type="text"
                  v-model="userr.fnameRegister"
                  id="fnameRegister"
                  name="firstname"
                  placeholder="fnameRegister"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.userr.fnameRegister.$error }"
                />
                <div
                  v-if="submitted && $v.userr.fnameRegister.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userr.fnameRegister.required">First Name is required</span>
                 
                </div>
              </div>
               <div class="form-group">
               <input
                  type="text"
                  v-model="userr.lnameRegister"
                  id="lnameRegister"
                  name="lastname"
                  placeholder="lnameRegister"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.userr.lnameRegister.$error }"
                />
                <div
                  v-if="submitted && $v.userr.lnameRegister.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userr.lnameRegister.required">Last Name is required</span>
                 
                </div>
              </div>
              <div class="form-group">
                <input
                  type="email"
                  v-model="userr.email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.userr.email.$error }"
                />
                <div
                  v-if="submitted && $v.userr.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userr.email.required">Email is required</span>
                  <span v-if="!$v.userr.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="userr.password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.userr.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.userr.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userr.password.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.userr.password.minLength"
                    >Password must be at least 6 characters</span
                  >
                </div>
              </div>
               <div class="form-group">
                <input
                  type="password"
                  v-model="userr.cpassword"
                  id="cpassword"
                  placeholder="cPassword"
                  name="cpassword"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.userr.cpassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.userr.cpassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.userr.cpassword.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.userr.cpassword.minLength"
                    >Password must be at least 6 characters</span
                  >
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { userRegister } from "@/common/Service";
// import { saveToken } from "@/common/Jwttoken";
// import store from "../store/store";
// import { mapState } from "vuex";
// import * as type from "../store/type";
export default {
  name: "Register",

  data() {
    return {
      userr: {
        fnameRegister:"",
        lnameRegister:"",
        email: "",
        password: "",
        cpassword: "",
      },
      submitted: false,
    };
  },
  validations: {
    userr: {
      fnameRegister:{ required },
      lnameRegister:{ required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      cpassword: { required, minLength: minLength(6) },
    },
  },
  // computed: mapState({
  //   msg: (state) => state.opt,
  //   user: (state) => state.emailId,
  // }),
  methods: {
    postRegister() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let formData = {firstname: this.userr.fnameRegister,lastname: this.userr.lnameRegister,email: this.userr.email, password: this.userr.password,cpassword: this.userr.cpassword };
      
      console.table(formData);
      userRegister(formData);
      alert("sign up done");
      localStorage.setItem("user", JSON.stringify(formData));
      this.$router.push("/login");
        // .then((res) => {
        //   if (res) {
        //     saveToken(res.data.token);
        //     console.log(res.data);
        //     store.dispatch({
        //       type: type.Opt,
        //       id: res.data.token,
        //       uid: res.data.email,
              
        //     });
            //
        //       this.$router.push("/");
        //   }
        
        // })
        // .catch((error) => {
        //   console.log("SOmething Wrong " + error);
        //   alert("Incorrect credentials");
        // });
    },
  },
};
</script>
<style>
.row {
  display: flex;
  justify-content: center;
}
span {
  color: red;
}
.form-group input {
  background: #f0f0e9;
  border: medium none;
  color: #696763;
  display: block;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 300;
  height: 40px;
  margin-bottom: 10px;
  outline: medium none;
  padding-left: 10px;
  width: 100%;
}
.container h2 {
  color: #696763;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 30px;
}
</style>
