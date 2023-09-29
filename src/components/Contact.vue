<template>
<!-- 
      This is the Contact component for contacting GTO Luxembourg
      using emailjs and standard html form. 
      Also, v-model and name is necessary to create two-way data binding 
      to correctly send the form via email.
  -->
<div class="container-fluid px-5 my-5">
  <div class="row justify-content-center">
    <div class="col-xl-10">
      <div class="card border-0 rounded-3 shadow-lg overflow-hidden">
        <div class="card-body p-0">
          <div class="row g-0 align-items-center">
            <div class="col-sm-6 p-4">
              <div class="text-center">
                <div class="h3 fw-light">
                  What can we help you with?
                </div>
                <p class="mb-3 text-muted">Contact Us!</p>
              </div>

              <form id="contactForm" @submit.prevent="sendEmail">

                <!-- Name Input -->
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="name" name="name" placeholder="Name" required/>
                  <label>Name</label>
                </div>

                <!-- Email Input -->
                <div class="form-floating mb-3">
                  <input class="form-control" type="email" v-model="email" name="email" placeholder="Email Address" required/>
                  <label>Email Address</label>
                </div>

                <!-- Message Input -->
                <div class="form-floating mb-3">
                  <textarea class="form-control" type="text" v-model="message" name="message" placeholder="Message" required style="height: 10rem;"></textarea>
                  <label>Message</label>
                </div>

                <!-- Submit button -->
                <div class="d-grid">
                  <input class="btn btn-primary btn-lg" type="submit" value="Send">
                </div>
              </form>
              <!-- End of contact form -->
            </div>

            <!-- 
              Two social media buttons with the corresponding color and link.
              Here, fortawesome is used to get the icons
            -->
            <div class="col-sm-6 p-4 d-none d-sm-block aside-text">
                <div class="text-center">
                    <div class="h3 fw-light">Check out our social media</div>
                    <!-- Instagram -->
                    <a style="color: #ac2bac;" href="https://www.instagram.com/gto.lu/" target=”_blank” role="button">
                        <font-awesome-icon :icon="['fab', 'instagram']" />
                    </a>
                    <!-- Facebook -->
                    <a style="color: #3b5998;" href="https://www.facebook.com/GTOLuxembourg" target=”_blank” role="button">
                        <font-awesome-icon :icon="['fab', 'facebook']" />
                    </a>
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
.my-5 {
    margin-top: 150px !important;
}
a {
    padding: 5px;
    font-size: 50px;
}
.btn-primary{
  background-color: rgba(61, 130, 134, 0.7) !important; 
  border: none !important;
}
</style>