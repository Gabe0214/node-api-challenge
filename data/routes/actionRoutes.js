const express = require('express')

const actionsDb = require('../helpers/actionModel')
const projectDb = require('../helpers/projectModel')

const router = express.Router()

//GET ACTION 

router.get('/', (req, res) => {
    actionsDb.get()
    .then( result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(201).json({message: "Something is wrong in the server"})
    }) 
})


//GET ACTION BY ID


router.get('/:id', validateId, (req, res) => {
    actionsDb.get(req.result)
    .then( reslut => {
        res.status(200).json(reslut)
    })
    .catch(error => {
        res.status(500).json({message:"Something wrong with server "})
    })
})

// DELETE ACTION 

router.delete('/:id', validateId, (req, res) => {
    actionsDb.remove(req.result)
    .then(result => {
        res.status(201).json(4)
    })
    .catch(error => {
        res.status(500).json({message:"Something went wrong when deleting action"})
    })
})


// POST ACTION BY PROJECT ID 

router.post('/', validateProjectId, validatePostAction, (req, res) => {
     actionsDb.insert(req.body)
     .then(result => {
         res.status(201).json(result)
     })
     .catch(error => {
         res.status(500).json({message: "Something went wrong when posting action"})
     })
})


// PUT(UPDATES ACTION)

router.put('/:id', validateId, validatePostAction, (req, res) => {
    actionsDb.update(req.result, req.body)
    .then( result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({message: "Something went wrong in the server"})
    })
})
function validateId(req, res, next){
    

    actionsDb.get(req.params.id)
    .then(result => {
        if(result){
            req.result = result.id
            next()
        } else {
            res.status(404).json({message:" Specified Id not found"})
        }
    })
}

function validateProjectId(req, res, next){

 projectDb.get(req.params.id)
 .then( project => {
     if(project){
         req.project = project
         next()
     } else {
         res.status(404).json({error: "Id does not exist"})
     }
 })


}
function validatePostAction(req, res, next){
    if(req.body.description.length > 128 || !req.body.notes){
        res.status(401).json({message: "Please insert note, and description must not exceed 128 character"})
    } else {
        next();
    }
 }

module.exports = router; 