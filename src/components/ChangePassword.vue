<template>
  <div class="" id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 offset-sm-2">
          <div>
            <h2>Change Account Password</h2>
            <form @submit.prevent="changepass()" >
              <div class="form-group">
                <input type="password"  name="oldpass"
                  placeholder="Old password"
                  v-model="user.oldpass"
                  class="form-control" 
                 :class="{ 'is-invalid': submitted && $v.user.oldpass.$error }"
                />
                 <div
                  v-if="submitted && $v.user.oldpass.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.oldpass.required">Passsword is required</span>
                  <span v-if="!$v.user.oldpass.minLength">Passowrd Length is 6 charaters</span>
                </div>
                
              </div>
              <div class="form-group">
                <input type="password" name="newpass"
                  placeholder="New password"
                  v-model="user.newpass"
                  class="form-control" 
                   :class="{ 'is-invalid': submitted && $v.user.newpass.$error }"
                />
                 <div
                  v-if="submitted && $v.user.newpass.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.newpass.required">Passsword is required</span>
                  <span v-if="!$v.user.newpass.minLength">Passowrd Length is 6 charaters</span>
                </div>
                
              </div>
              <div class="form-group">
                <input type="password" name="confirmpass"
                  placeholder="Confirm password"
                  v-model="user.confirmpass"
                  class="form-control" 
                :class="{ 'is-invalid': submitted && $v.user.confirmpass.$error }"
                />
                 <div
                  v-if="submitted && $v.user.confirmpass.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.confirmpass.required">Passsword is required</span>
                  <span v-if="!$v.user.confirmpass.sameAsPassword">Passowrd Not Match</span>
                </div>
                
              </div>
              

              <div class="form-group">
                <button class="btn btn-primary" type="submit">Change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required,minLength, sameAs } from "vuelidate/lib/validators";
import {changePassword} from '@/common/Service';
export default {
  name: "ChangePassword",

  data() {
    return {
      user: {
        oldpass:"",
        newpass: "",
        confirmpass: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      oldpass: { required, minLength: minLength(6)},
      newpass: { required, minLength: minLength(6) },
      confirmpass: { required, sameAsPassword: sameAs("newpass") },
    },
  },
  methods: {
    changepass() {
      this.submitted = true;
      let email = localStorage.getItem("uid");
         let formData={email:email,oldpass:this.user.oldpass,newpass:this.user.newpass,confirmpass:this.user.confirmpass};

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

     
   console.log(formData);
        changePassword(formData)
      .then(res=>{
             if(res.data){
                  this.$swal('Password Change Successfully!!','success');

                this.$router.push("/");
               
               console.log(this.formData);
               console.log(res.data);
            }
            else{
               alert("old password does not match")  
                console.log(res.data);
            }
        })
        .catch(error=>{
            console.log("Something Wrong "+error)
        })
    },
     
  },
};
</script>

<style>

</style>