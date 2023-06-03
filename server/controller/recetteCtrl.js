const Recette = require('../model/recette.model')
const slugify = require('slugify')
const recetteCtr = {
    createRecette: async (req, res) => {
        const   {googleId}= req.user
        try {
       
           console.log({aaccccccaa:googleId})
            if (req.body.title) {
                req.body.slug = slugify(req.body.title)
            }
            const recettes = new Recette(
                {
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                    category: req.body.category,
                    images: req.body.images,
                     postedBy: googleId
                })
            await recettes.save()
            res.json(recettes)
        } catch (err) {
            console.log(err.message)
        }
    },
    getAllRecette:async(req,res)=>{
        try {
       
          console.log({request:req.user})
            const recettes = await Recette.find({postedBy:req.user.googleId})
            console.log(recettes)
           
                       res.json(recettes)
        } catch (error) {
            res.json({message:error.message})
        }
    },
    getARecette:async(req,res)=>{
       const {id} = req.params
        try {
            const recette = await Recette.findById(id)
            console.log(recette)
            res.json(recette)
        } catch (error) {
            res.json({message:error.message})
        }
    },
    deleteRecette:async(req,res)=>{
        
        try {
            const {id} = req.params
            const recetteDel = await Recette.findByIdAndDelete(id)
            res.status(200).json(recetteDel)
        } catch (error) {
            res.json({message:error.message})
        }
    }

}
module.exports = recetteCtr