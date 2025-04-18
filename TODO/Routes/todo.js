const router=require('express').Router();
const Todo=require('../Models/todo')
//list all todo

router.get('/',(req,res)=>{
Todo.find().exec((err,todos)=>{
    if(err){
        return res.json({error:err})
    }
    return res.json({data:todos})
})
})

//create todo
router.post('/create',(req,res)=>{
    const todo=Todo({
        title:req.body.title,
        content:req.body.content,
    })
    todo.save((err,todo)=>{
        if(err){
            return res.json({error:err})
        }
        return res.json({data:todos})
    })

})

//edit todo
router.put('/:id',(req,res)=>{

 Todo.findById(req.params.id)
.exec((err, todo) => {
  if (err) {
    return res.json({ error: err });
  }
  todo.title = req.body.title ?? todo.title;
  todo.content = req.body.content ?? todo.content;
  todo.completed = req.body.completed ?? todo.completed;
  todo.save((err, todo) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ data: todo });
  })
});
});

//Delete

router.delete('/',(req,res)=>{
    Todo.remove({
        _id:req.params.id
    }.exec((err,todo)=>{
        if(err){
            return res.json({error:err})
        }
        if (result.deletedCount == 0) {
            return res.json({ data: 'No Todo Found with given id' });
          }
          return res.json({ data: 'Deleted Successfully' });
    }))

})

// Creating a new Todo for a user


const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id; // assuming auth middleware adds user to req

  try {
    const todo = await Todo.create({ title, description, user: userId });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports=router