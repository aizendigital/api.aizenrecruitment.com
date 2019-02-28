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

    var mailData = '';
    for (var key in req.body) {
      mailData +=  key.toUpperCase() + ':' + req.body[key] + '<br/>';
    }

    var mailOptions = {
      from: config.mail.email_user,
      to: config.mail.email_to,
      subject: 'New CV recieved!',
      html: `Dear Hazel,<br/>${req.body.name} applied through Aizen Recruitment website. <br/>Contact:<br/>${mailData}`,
    }
    if(typeof req.file != 'undefined'){
      mailOptions.attachments = [{path: 'uploads/' + req.file.filename}]
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
