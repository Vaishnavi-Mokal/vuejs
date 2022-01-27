<template>
  <div class="" id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 offset-sm-2">
          <div>
            <h2>Login to your account</h2>
            <form @submit.prevent="postLogin()">
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
import { userLogin } from "@/common/Service";


import { saveToken } from "@/common/Jwttoken";
export default {
  name: "Login",
  data() {
    return {
      userr: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  validations: {
    userr: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  methods: {
    postLogin() {
      this.submitted = true;
      let formData = { email: this.userr.email, password: this.userr.password };
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      userLogin(formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.error == 0) {
            if (res.data.status == "active") {
            
              localStorage.setItem("uid",res.data.email);
              localStorage.setItem("token", res.data.token);
              saveToken(res.data.token);
               this.$swal('Login SuccessFull!!');
          
                 console.log(this.formData);
            console.log(res.data);
              this.$router.push("/");
              window.location.reload()
            } else {
              alert("in active User");
            }

            // localStorage.setItem('token',res.data.token);
            // saveToken(res.data.token);
            // alert("okay");
            // this.$router.push("/");
          } else {
            alert("Username dose not exist");
          }
        })

        .catch((error) => {
          console.log("SOmething Wrong " + error);
        });
    },
  },
};
</script>

<style>
</style>