<template>
<!-- 
      This is the Contact component for contacting GTO Luxembourg
      using emailjs and standard html form. 
      Also, v-model and name is necessary to create two-way data binding 
      to correctly send the form via email.
  -->

  <div class="content">
    
    <div class="container">
      <div class="row align-items-stretch justify-content-center no-gutters">
        <div class="col-md-7">
          <div class="form h-100 contact-wrap p-5">
            <h3 class="text-center">Contact Us!</h3>
            <form class="mt-5" @submit.prevent="sendEmail">
              <div class="row">

                <!-- Name input -->
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="name" name="name" placeholder="Name" required/>
                  <label>Name</label>
                </div>

                <!-- Email input -->
                <div class="form-floating mb-3">
                  <input class="form-control" type="email" v-model="email" name="email" placeholder="Email Address" required/>
                  <label>Email Address</label>
                </div>
              </div>

              <!-- Message input -->
              <div class="row mb-5">
              <div class="form-floating mb-3">
                  <textarea class="form-control" type="text" v-model="message" name="message" placeholder="Message" required style="height: 10rem;"></textarea>
                  <label>Message</label>
                </div>
              </div>

              <!-- Submit -->
              <div class="row justify-content-center">
              <div class="d-grid">
                  <input class="btn btn-primary btn-lg" type="submit" value="Send">
                </div>
              </div>
            </form>

            <div id="form-message-warning mt-4"></div> 
            <div id="form-message-success">
              Your message was sent, thank you!
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template> 

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'ContactUs',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    /**
     * Function called when form gets submitted.
     * sendForm is a function by email.js which gets the following param.:
     * serviceID, templateID, userID (all are retrievable from the user profile on their website)
     */
     sendEmail(e) {
      try {
        emailjs.sendForm('service_3r4szlp', 'template_zueu4vi', e.target, 'xJiG2oA5pZeWfkFFQ', {
          name: this.name,
          email: this.email,
          message: this.message
        }).then(() => {
          // Reset form fields
          this.name = '';
          this.email = '';
          this.message = '';

          // Display a success alert
          alert('Email sent successfully!');
        })
      } catch (error) {
        console.log({ error });
      }
    }
  }
}
</script>

<style scoped>
/* Styles the Contact component */
body {
  font-family: "Roboto", sans-serif;
  background-color: #efefef;
  line-height: 1.9;
  color: #8c8c8c;
  position: relative; }

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: "Roboto", sans-serif;
  color: #000; }

a {
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease; }
  a, a:hover {
    text-decoration: none !important; }

.text-black {
  color: #000; }

.content {
  padding-top: 7rem; 
  padding-bottom: 5rem; 
}

.heading {
  font-size: 2.5rem;
  font-weight: 900; }

.form-control {
  border: none;
  border-bottom: 1px solid #ccc;
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
  background: none; }
  .form-control:active, .form-control:focus {
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-color: #000; }

.col-form-label {
  color: #000;
  font-size: 13px; }

.btn, .form-control, .custom-select {
  height: 45px;
  border-radius: 0; }

.custom-select {
  border: none;
  border-bottom: 1px solid #ccc;
  padding-left: 0;
  padding-right: 0;
  border-radius: 0; }
  .custom-select:active, .custom-select:focus {
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-color: #000; }

.btn {
  border: none;
  border-radius: 0;
  font-size: 11px;
  letter-spacing: .2rem;
  text-transform: uppercase;
  border-radius: 30px !important; }
  .btn.btn-primary {
    border-radius: 30px;
    background: #4d80e4;
    color: #fff;
    -webkit-box-shadow: 0 15px 30px 0 rgba(77, 128, 228, 0.2);
    box-shadow: 0 15px 30px 0 rgba(77, 128, 228, 0.2); }
  .btn:hover {
    color: #fff; }
  .btn:active, .btn:focus {
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none; }

.contact-wrap {
  -webkit-box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.2);
  background: #fff; }
  .contact-wrap .col-form-label {
    font-size: 14px;
    color: #b3b3b3;
    margin: 0 0 10px 0;
    display: inline-block;
    padding: 0; }
  .contact-wrap .form, .contact-wrap .contact-info {
    padding: 40px; }
  .contact-wrap .contact-info {
    color: rgba(255, 255, 255, 0.5); }
    .contact-wrap .contact-info ul li {
      margin-bottom: 15px;
      color: rgba(255, 255, 255, 0.5); }
      .contact-wrap .contact-info ul li .wrap-icon {
        font-size: 20px;
        color: #fff;
        margin-top: 5px; }
  .contact-wrap .form {
    background: #fff; }
    .contact-wrap .form h3 {
      color: #000;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 30px; }
  .contact-wrap .contact-info {
    height: 100vh;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat; }
    .contact-wrap .contact-info a {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0; }
    @media (max-width: 1199.98px) {
      .contact-wrap .contact-info {
        height: 400px !important; } }
    .contact-wrap .contact-info h3 {
      color: #fff;
      font-size: 20px;
      margin-bottom: 30px; }

label.error {
  font-size: 12px;
  color: red; }

#message {
  resize: vertical; }

#form-message-warning, #form-message-success {
  display: none; }

#form-message-warning {
  color: #B90B0B; }

#form-message-success {
  color: #55A44E;
  font-size: 18px;
  font-weight: bold; }

.submitting {
  float: left;
  width: 100%;
  padding: 10px 0;
  display: none;
  font-weight: bold;
  font-size: 12px;
  color: #000; }

.btn-primary{
  background-color: rgba(61, 130, 134, 0.7) !important; 
  border: none !important;
}
</style>