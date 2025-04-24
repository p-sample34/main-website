const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');
const jwt = require('jwt-decode');

const app = express();
const port = process.env.PORT || 3000;

// Google Client ID
const CLIENT_ID = '405891110928-ir0ecto76qgr8qvp1j0a49u6b0klhq2n.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to verify Google Token
app.post('/verify-token', async (req, res) => {
  const { token } = req.body; // Google token sent from the frontend
  
  try {
    // Verify token with Google API
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Verify the token against your Google Client ID
    });
    
    // Decode the token to extract user information
    const payload = ticket.getPayload();
    
    // Here, you can add user information to your database or session management
    console.log('User Info:', payload); // Log the user info (e.g., name, email, picture)
    
    // Respond with user info (you can modify this to match your app's needs)
    res.json({
      message: 'User verified successfully!',
      user: payload, // You can send user info here, or just a success message
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(400).json({ error: 'Invalid token' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
