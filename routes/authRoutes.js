const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const db               = require("../models");

module.exports = (app,passport)=>{

        /* Passport Serialize User */

        passport.serializeUser(function(user, done) {

            console.log("serialize user");
            done(null, user);
    
        });
    
        /* Passport Deserialize User */
          
        passport.deserializeUser(function(user, done) {
    
            console.log("deserialize user");
            done(null, user);
    
        });
    
        /* Passport Google Strategy */
    
        passport.use(new GoogleStrategy({
    
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/auth/google/callback"
    
          },
          function(accessToken, refreshToken, profile, cb) {
            console.log(profile); // Logs profile data
            user = profile;
            if (profile) {
                user = profile;         // Sets the user to be the returned profiles
                return cb(null, user);  // Returns the user
            }
            else {
                return cb(null, false); // Otherwise returns false
            }
          }
        ));
    
        app.use( passport.initialize() );  // Uses passport
        app.use( passport.session()    );

        app.get('/auth/google',   passport.authenticate('google',{scope: ['profile'] })); // Sends a request to google to authenticate users

        app.get('/auth/google/callback',
                passport.authenticate('google', { failureRedirect: '/login' }),
                (req,res)=>{
                    res.send(req.user);
                });

}