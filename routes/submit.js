const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const Joi = require('joi')
const nodemailer = require('nodemailer')
const config = require('../config/config')

const router = express.Router()
const validate = require('../resources/validate')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mail.email_user,
      pass: config.mail.email_password
    }
  })

const multerConfig = {
    
    storage: multer.diskStorage({

        destination: function(req, file, next){
          next(null, 'uploads/');
          },   
           filename: function(req, file, next){
               const ext = file.mimetype.split('/')[1];
               next(null, file.fieldname + '-' + Date.now() + '.'+ext);
             }
           })

}

router.post('/submit', multer(multerConfig).single('inputFile'), async(req, res) => {
console.log(req.body)
    const {error} = validate(req.body)
    if(error) {
      return {
        message: res.send(error.details[0].message),
        status: res.status(400)
      }
    }

    if(typeof req.file == 'undefined'){
    var mailOptions = {
        from: config.mail.email_user,
        to: config.mail.email_to,
        subject: ' new user data ;)',
        html: `Hey there :) You are seeing a beautiful user data:<br> ${JSON.stringify(req.body)}`
      }
    }else{
        var mailOptions = {
            from: config.mail.email_user,
            to: config.mail.email_to,
            subject: 'some new user cv ;)',
            html: `Hey there :) You are seeing the CV of a beautiful user:<br> ${JSON.stringify(req.body)}`,
            attachments: [{path: 'uploads/' + req.file.filename}]
          }
    }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return{
            message: res.send(error),
            status: res.status(500)
          }
        } else {
          return {
            message: res.send('Email sent: ' + info.response),
            status: res.status(200)
        }
        }
      })
})


module.exports = router
