const config = {

    production: {
        port: process.env.PORT,
      },
      development: {
        port: 4012,
      },
      mail:{
        email_user: process.env.EMAIL_USER || 'testiit775@gmail.com',
        email_password: process.env.EMAIL_PASSWORD || 'Am123123Am123123',
        email_to: process.env.EMAIL_TO || 'idin.khanoom.khayami@gmail.com'
      }
}

module.exports = config