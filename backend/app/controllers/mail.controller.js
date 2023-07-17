let nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: "karmakar922@gmail.com",
      pass: "vishalKarmakar123",
      clientId: '705251655934-7dck187fgb83ki37gurcvdbl0fgu0u4a.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04iXKGEyCvTofCgYIARAAGAQSNwF-L9Irj00oe2Q8xL-_-QtW5OWmyjvj_EjvtJ_jfPDhSFeB6_EwWhivslCxZmFFp8VADDFZ_Dk'
    }
  });

  

exports.sendMail =  async(req,res)=>{
    let mailOptions = {
        from: "karmakar922@gmail.com",
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
      };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
          res.status(200).json({Error:`${err}`});
        } else {
          console.log("Email sent successfully");
          res.status(200).json({status:"Email sent successfully"})
        }
      })
};


  