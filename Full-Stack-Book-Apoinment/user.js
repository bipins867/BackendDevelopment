const express=require('express')
const routes=require('./routes')

const router=express.Router()

router.post('add-user/',(req,res)=>{
    res.json({id:578})
})
router.get('get-user/',routes.getAddUser)
router.get('delete-user/:id',routes.getDeleteById)
router.post('edit-user/:id',routes.postEditById)

module.exports=router;
