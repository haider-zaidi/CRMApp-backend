const { OAuth2Client } = require("google-auth-library")
const User = require("../models/User")
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const jwt = require("jsonwebtoken")

const googleLogin = async (req, res) => {
  const { id_token } = req.body

  // Add validation for required environment variables
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error("GOOGLE_CLIENT_ID is not set")
    return res.status(500).json({ message: "Server configuration error" })
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set")
    return res.status(500).json({ message: "Server configuration error" })
  }

  if (!id_token) {
    console.error("No id_token provided")
    return res.status(400).json({ message: "ID token is required" })
  }

  console.log("Received id_token:", id_token.substring(0, 50) + "...")

  try {
    // Step 1: Verify the Google ID token
    console.log("Verifying Google ID token...")
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    console.log("Google payload verified successfully:", {
      email: payload.email,
      name: payload.name,
      sub: payload.sub,
    })

    // Step 2: Check if user exists
    console.log("Checking if user exists with email:", payload.email)
    let user = await User.findOne({ email: payload.email })

    if (!user) {
      console.log("User not found, creating new user...")

      // Step 3: Create new user
      try {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          googleId: payload.sub, // Add Google ID for better tracking
        })
        console.log("New user created successfully:", user._id)
      } catch (createError) {
        console.error("Error creating user:", createError)
        return res.status(500).json({
          message: "Failed to create user account",
          error: createError.message,
        })
      }
    } else {
      console.log("Existing user found:", user._id)
    }

    // Step 4: Generate JWT token
    console.log("Generating JWT token...")
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    )

    console.log("JWT token generated successfully")

    // Step 5: Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    })
  } catch (error) {
    console.error("Detailed login error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    // More specific error responses
    if (error.message.includes("Token used too late") || error.message.includes("Token used too early")) {
      return res.status(401).json({ message: "Token expired or invalid timing" })
    }

    if (error.message.includes("Invalid token signature")) {
      return res.status(401).json({ message: "Invalid token signature" })
    }

    if (error.message.includes("Wrong number of segments")) {
      return res.status(401).json({ message: "Malformed token" })
    }

    // Database connection errors
    if (error.name === "MongoError" || error.name === "MongooseError") {
      return res.status(500).json({ message: "Database connection error" })
    }

    res.status(401).json({
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : "Login failed",
    })
  }
}

module.exports = { googleLogin }