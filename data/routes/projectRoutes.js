const express = require('express')


const projectDb = require('../helpers/projectModel')

const router = express.Router();
router.use(express.json());

// GET PROJECT
router.get('/', (req, res) => {


    projectDb
    .get()
    .then( result => {
        res.status(201).json(result)
    })
    .catch( error => {
        res.status(500).json({error: "Something is wrong in the data base"})
    })
})

// GET PROJECT BY ID



router.get('/:id' , validateId, (req, res) => {
    projectDb.get(req.result)
    .then( result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({message: "Something wrong with the server"})
    })
})


//POST PROJECT 

router.post('/' , validatePost, (req, res) => {
    projectDb.insert(req.body)
    .then( result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({error: "Something wrong with post project"})
    })
})

// PUT PROJECT


router.put('/:id' , validateId, validatePost , (req, res) => {
   projectDb.update(req.result, req.body)
   .then( result => {
       res.status(201).json(result)
   })
   .catch(error => {
       res.status(500).json({error: "sorry something wrong with put server"})
   })
})

// DELETE PROJECT 

router.delete('/:id' , validateId, (req, res) => {
    projectDb.remove(req.result)
    .then(result => {
        res.status(200).json(4)
    })
    .catch(error => {
        res.status(500).json({error: "Server malfunction, sorry"})
    })
})


function validatePost( req, res, next){
    if(!req.body.name){
        res.status(401).json({message: "Please provide required fields"})
    } else if (req.body.completed === undefined){
        res.status(401).json({message: "Please fill out completion"})
    } else {
        next()
    }
}

function validateId(req, res, next){
    

    projectDb.get(req.params.id)
    .then(result => {
        if(result){
            req.result = result.id
            next()
        } else {
            res.status(404).json({message:" Specified Id not found"})
        }
    })
}

module.exports = router;