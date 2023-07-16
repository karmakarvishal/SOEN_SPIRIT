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

  let mailOptions = {
    from: "karmakar922@gmail.com",
    to: "karmakar922@gmail.com",
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project'
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });