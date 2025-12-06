const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/auth/success');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect('/');
  });
});

// Success page
router.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      message: 'Authentication successful!',
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.emails?.[0]?.value
      }
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Failure page
router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Authentication failed' });
});

// Check authentication status
router.get('/status', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? {
      id: req.user.id,
      displayName: req.user.displayName,
      email: req.user.emails?.[0]?.value
    } : null
  });
});

module.exports = router;

