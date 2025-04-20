const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  if(!todo) {
    return res.sendStatus(404)
  }
  res.json(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if(!req.todo){
    return res.sendStatus(404)
  }

  if(!req.body){
    return res.sendStatus(400)
  }

  if(typeof req.body.text !== 'undefined'){
    req.todo.text = req.body.text
  }
  if(typeof req.body.done !== 'undefined'){
    req.todo.done = req.body.done
  }

  try{
    const updated = await req.todo.save()
    res.json(updated)
  }catch(error){
   res.status(400).json({error: 'Update failed', deteails: error.message}) 
  }

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
