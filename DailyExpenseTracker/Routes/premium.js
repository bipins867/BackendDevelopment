const express=require('express')
const premimumController=require('../Controller/premium')
const premiumAuthentication=require('../Middleware/expense')


const router=express.Router();


router.get('/showLeaderboard',premiumAuthentication.authenticate,premimumController.fetchLeaderboard)


module.exports=router