<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Contact <strong>Us</strong></h2>
          
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <div class="contact-form">
            <h2 class="title text-center">Any Query</h2>
            <div class="status alert alert-success" style="display: none"></div>
             <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name"> Name</label>
                <input
                  type="text"
                  v-model="user.name"
                  id="name"
                  name="name"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.name.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.name.$error"
                  class="invalid-feedback"
                >
                <span v-if="!$v.user.name.required"> Name is required</span>
                  <span v-if="!$v.user.name.alpha"> Name should contain only letters</span>
                  <span v-if="!$v.user.name.minLength"> length should be atleast 2</span>
                  <span v-if="!$v.user.name.maxLength"> length cannot be more than 10 </span>
                   
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group ">
                   <label for="subject">Subject</label>
                <input
                  type="text"
                   class="form-control"
                   v-model="user.subject"
                   id="subject"
                  name="subject"
      
                  :class="{
                    'is-invalid': submitted && $v.user.subject.$error,
                  }"
                />
                <div
                  v-if="submitted &&  $v.user.subject.$error"
                  class="invalid-feedback"
                >
               
                <span v-if="!$v.user.subject.required"> Subject is required</span>
                
                
                </div>
              </div>
              <div class="form-group ">
                 <label for="message"> Message</label>
                <textarea
                 v-model="user.message"
                  name="message"
                  id="message"
                  rows="8"
                   class="form-control"
                  placeholder="Your Message Here"
                  :class="{
                    'is-invalid': submitted && $v.user.message.$error,
                  }"
                ></textarea>
                <div
                  v-if="submitted && $v.user.message.$error"
                  class="invalid-feedback"
                >
                <span v-if="!$v.user.message.required">message is required</span>
                <span v-if="!$v.user.message.minLength">message length should be atleast 10 </span>
                 <span v-if="!$v.user.message.maxLength">message length should not be greater than 255 </span>
                  
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Contact Us</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="contact-info">
            <h2 class="title text-center">Contact Info</h2>
            <address>
              <p>E-Shopper Inc.</p>
              <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
              <p>Newyork USA</p>
              <p>Mobile: +2346 17 38 93</p>
              <p>Fax: 1-714-252-0026</p>
              <p>Email: info@e-shopper.com</p>
            </address>
            <div class="social-networks">
              <h2 class="title text-center">Social Networking</h2>
              <ul>
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-youtube"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, alpha,minLength,maxLength} from "vuelidate/lib/validators";
import {userContact} from '@/common/Service';
export default {
  name: "Contact",

  data() {
    return {
      user: {
        name: "",
        subject: "",
        email: "",
        message: "",
       
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      name: { required,alpha, minLength: minLength(2), maxLength: maxLength(10)},
     
      
      email: { required, email },
       subject:{required },
      message: { required,minLength: minLength(10), maxLength: maxLength(255) },
      
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
         let formData={name:this.user.name,email:this.user.email,subject:this.user.subject,message:this.user.message};

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

     
   console.log(formData);
        userContact(formData)
      .then(res=>{
             if(res.data.error==1){
                this.$router.push("/");
               console.log(this.formData);
               console.log(res.data,"Vaishnavi");
               console.log(res)
               alert('submitted succesufully')
            }
            else{
               alert("something went wrong")  
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