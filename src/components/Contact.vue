<template>
    <div> 
        <h3 class="title">
            Contact
        </h3>
        <hr />
    </div>
    <section>
        <h3 class="subtitle">
            Get in touch
        </h3>
        <p class="instruction">
            Enter your name, email and message.
        </p>
        <form id="contactform" method="post" action="">
            <div class="name">
                <input type="text" class="form-control" id="firstname" placeholder="First Name" required>
                <input type="text" class="form-control" id="lastname" placeholder="Last Name" required>
            </div>
            <div class="email">
                <input type="email" class="form-control" id="email" placeholder="Email-address" required>
            </div>
            <div class="message">
                <textarea id="message" class="form-control" rows="8" maxlength="3000" placeholder="Your message..." required></textarea>
            </div>
            <div class="submit">
                <button type="submit" class="btn btn-secondary" id="submit">Send Message</button>
            </div>
        </form>
    </section>
    <aside>
        <div class="aside">
            <div class="asidebox">
                <span class="asideicon">
                    <img alt="GTO logo" class="logo" src="../assets/GTO_round.png"/>
                </span>
                <p class="asidetext">
                    We are eager to receive your message!
                </p>
            </div>
        </div>
    </aside>
</template>

<style scoped>
    h3, p{
        font-family: "Inter", sans-serif;
        font-weight: 400;
    }

    hr {
        margin-top: 0px;
        margin-left: 10%;
        width: 75%;
    }

    section {
        position: absolute; 
        margin-left: 14%;
    }

    .title {
        margin-top: 110px;
        margin-bottom: 0px;
        margin-left: 14%;
        font-size: 40px;
    }

    .subtitle{
        margin-top: 50px;
        margin-bottom: 0px;
        /* margin-left: 14%; */
        font-size: 30px;
    }

    .instruction {
        font-size: 20px;
        /* margin-left: 14%; */
    }

    #contactform {
        /* margin-left: 14%; */
        margin-top: 25px;
    }

    .name, #email, #message, #submit {
        margin: 20px 20px 20px 0px ;
    }

    .name {
        width: 100%;
        display: flex;
        justify-content: space-around;   
    }

    .email, .message {
        width: 100%;
    }

    aside {
        float: right;
    }

    .aside {
        border-color: black;
        margin-top: 80px;
        margin-right: 350px;
    }

    /* .asidebox {
        border-left: 2px solid black;
        padding-top: 50px;
        padding-left: 20px;
        padding-bottom: 350px;
    } */

    .asidebox {
        border-left: 2px solid black;
        padding-top: 40px;
        padding-left: 20px;
        padding-bottom: 275px;
    }

    .asidetext {
        float: right;
        width: 120px;
        margin-left: 25px;
        margin-top: 2px;
    }
</style>