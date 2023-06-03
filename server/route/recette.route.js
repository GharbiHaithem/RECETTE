const express = require('express')
const  {createRecette,getAllRecette,getARecette,deleteRecette} = require('../controller/recetteCtrl') 
const { authMiddleware } = require('../config/authMiddlware')
const router = express.Router()
router.post('/create',authMiddleware,createRecette)
router.get('/allRecette',authMiddleware,getAllRecette)
router.get('/getarecette/:id',authMiddleware,getARecette)
router.delete('/delete/:id',authMiddleware,deleteRecette)
module.exports= router 