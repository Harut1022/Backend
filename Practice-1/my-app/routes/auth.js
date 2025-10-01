const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); 
const {UsersVerify} = require("../models");
const { where } = require("sequelize");
const keyGen = require("../helpers/KeyGen");
const sendMail = require("../helpers/Send");
require("dotenv").config()
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET 
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 10;
const BlockMin = 1
const mistakecount = 2
const signToken = (userId) =>
  jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const auth = (req, res, next) => {
  const hdr = req.headers.authorization || "";
  const [scheme, token] = hdr.split(" ");
  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "Missing Bearer token" });

  try {
    const { sub } = jwt.verify(token, JWT_SECRET);
    req.userId = sub;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body || {};
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ error: "firstName, lastName, email, password are required" });
    }
    const key = keyGen()
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // store hashed password
    });
    const userVerify = await UsersVerify.create({
      userId:user.id,
      atempt:0,
      isBlock:0,
      verify_key: key,
      verified:0,
      time: new Date()
    })
    const token = signToken(user.id);
    sendMail(user.email,key)
    res.status(201).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "email and password are required" });


    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });


    const userInfo = await UsersVerify.findOne({
      where:{userId: user.id}
    })
    if(userInfo.isBlock){
      const time  = (new Date()-userInfo.time)/60000
      if(time>BlockMin){
        await UsersVerify.update(
          {isBlock: 0,
          atempt: 0  
        },
      {where:{userId:user.id}})
      }else{
        return res.status(401).send({ error: "Duq Blokvac eq" });
      }
      
    } 
    


    const ok = await bcrypt.compare(password, user.password);
    
    
    if (!ok) {
      if(userInfo.atempt < mistakecount){
          await UsersVerify.update(
          {atempt: userInfo.atempt+ 1},
          {where:{userId:user.id}})
          
      }else{
        await UsersVerify.update(

            {isBlock: 1,time:new Date()},{where:{userId:user.id}})
            
          return res.status(401).send({ error: "Duq Blokvac eq" });
      }
     
      return res.status(401).send({ error: "Invalid credentials" });
    }
    if(!userInfo.verified) return res.status(401).send({ error: "Duq verifikacvac cheq" });
    const token = signToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "firstName", "lastName", "email"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load user" });
  }
});



module.exports = router;
