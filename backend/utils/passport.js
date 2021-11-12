"use strict";
const passport = require("passport");
const secret = process.env.JWT_SECRET;
const User = require('../Models/adminModel');
const Restaurant = require('../Models/RestaurantModel');
const jwt = require('jsonwebtoken')

function auth() {
    const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'abcd1234',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        console.log(token)
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
    
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
