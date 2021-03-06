const expressJwt = require("express-jwt");

/* 
**
Create Post Validator 
**
*/
exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Title is needed.").notEmpty();
  req.check("title", "Title must be between 5 and 150 characters.").isLength({
    min: 5,
    max: 150,
  });

  // body
  req.check("body", "Text is needed.").notEmpty();
  req.check("body", "Text must be between 5 and 2000 characters.").isLength({
    min: 5,
    max: 2000,
  });

  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Sign Up Validator 
**
*/
exports.signUpValidator = (req, res, next) => {
  // name
  req.check("name", "Type your name.").notEmpty();

  // email
  req.check("email", "Type your email.").notEmpty();

  req
    .check("email")
    .matches(/.+\@.+\..+/)
    .withMessage("Invalid email address.");

  // password
  req.check("password", "Type your password.").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Your password must contain at least 6 characters.")
    .matches(/\d/)
    .withMessage("Your password must contain one or more numbers.");

  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Log In Validator 
**
*/
exports.loginValidator = (req, res, next) => {
  // Check email
  req.check("email", "Type your email.").notEmpty();
  req.check("email").isEmail().withMessage("Invalid email address.");

  // Check password
  req.check("password", "Type your password.").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters or numbers.");

  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Password Validator 
**
*/
exports.passwordValidator = (req, res, next) => {
  // Check password
  req.check("newPassword", "Type your new password.").notEmpty();
  req
    .check("newPassword")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters or numbers.")
    .matches(/\d/)
    .withMessage("Your password must contain one or more numbers.");

  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Email Validator 
**
*/
exports.emailValidator = (req, res, next) => {
  // Check email
  req.check("email", "Type your email.").notEmpty();
  req.check("email").isEmail().withMessage("Invalid email address.");
  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Check if user has logged in
: To Protect routes that can be accessed only by logged-in users
**
*/
exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  // if token is valid, expressJwt appends to the request object
  // the verified user's id in a key "auth"
  userProperty: "auth",
});

/* 
**
Check if user is the account owner
: To Protect routes that can be operated only by account owners (e.g. delete account, update account)
**
*/
exports.isAccountOwner = (req, res, next) => {
  const isOwner = req.profile && req.auth && req.auth._id == req.profile._id;
  if (isOwner) {
    next();
  } else {
    res.status(403).json({
      error: "You are not authorized to do this operation.",
    });
  }
};

/* 
**
Check if user is the post owner
: To Protect routes that can be operated only by post owners (e.g. delete post, update post)
**
*/
exports.isPostOwner = (req, res, next) => {
  const isOwner = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  console.log(req.post.postedBy);
  if (isOwner) {
    next();
  } else {
    res.status(403).json({
      error: "You are not authorized to do this operation.",
    });
  }
};

/* 
**
Unauthorized Error Handler
**
*/
exports.authErrorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized Access!" });
  }
  next();
};
