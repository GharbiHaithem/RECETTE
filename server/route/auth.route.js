const express = require('express')
const router =  express.Router()
const {createUser,login} = require('../controller/userCtrl')
router.post(`/registre`,createUser)
router.post(`/login`,login)
module.exports = router