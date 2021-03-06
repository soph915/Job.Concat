// Utilities for session care
const axios = require('axios');

const createSession = (req, res, newUser) => {
  return req.session.regenerate(() => {
    req.session.user = newUser;
    // data for frontEnd
    //extract everything from newUser except password.
    // add an additional tag to update front end of logged in status
    let withoutPass = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      email: newUser.email,
      _id: newUser._id
    }
    res.send(withoutPass);
  });
};

const isLoggedIn = (req, res) => {
  return req.session ? !!req.session.user : false;
};

//Refactor this function to communicate with front-end to change state
  //this will likely mean sending an object with a specific key
//TLDR: Change 'session' state instead of redirecting.
const checkUser = (req, res, next) => {
  if (!exports.isLoggedIn(req)) {
    // res.redirect('/login');
    res.json({ messageCode: 401, message: 'User Must Login' });
  } else {
    next();
  }
};

//! add detailed explanation in docs for fantastic name :)
// const logoGo = (domain, cb) => {

//*   let cleanDomain = domain.split('www.')[1];

//*   axios.get(`https://logo.clearbit.com/${cleanDomain}`)
//   .then(logo => console.log('I AM THE LOG: ', JSON.parse(logo.data)))
//   .catch(error => cb(error, null));
// }

// module.exports.logoGo = logoGo;
module.exports.createSession = createSession;
module.exports.isLoggedIn = isLoggedIn;
module.exports.checkUser = checkUser;
