const {createTransport}=require('nodemailer');
require('dotenv').config();
// const transporter

exports.passwordReset=(req,res,next)=>{

    const email=req.body.email;

    console.log(process.env.BREVO_SMTP_KEY);
    const transporter=createTransport({
        host:"smtp-relay.sendinblue.com",
        port:587,
        auth:{
            user:"ritik21feb@gmail.com",
           pass:process.env.BREVO_SMTP_KEY,
        },
    });

    const mailOptions={
        from:'ritik21feb@gmail.com',
        to: email,
        subject:'Password Reset',
        text:'This is your link to change the password'
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            throw new Error(err);
        } else{
            console.log('Email sent' + info.response);
        }
    })
}