const { logger } = require('../utils/logger');
const todoModel = require('../models/todo');
const { todoCreate } = require('../validation/todo');

class Todo {
    create = async (req, res, next) => {
        try {
            logger.info('Start create todo  - - -');
            const {error, value} = todoCreate(req.body);
            if (error) {
                logger.error('ValidationError', error.message);
                return res.status(400).json(error);
            }
            const todo = new todoModel({
                ...value,
                userId:req.user._id
            });
            await todo.save();
            return res.status(201).json({
                todo
            });
        } catch (e) {
            logger.error(`Todo create Error: ${e.message}`);
            next(e);
        }
    }
    delete = async (req, res, next) => {
        try {
            logger.info('Start delete todo list - - -');
            const {id} = req.params;
            const todo = await todoModel.findById(id);
            if(!todo){
                return res.status(404).json({
                    message: 'todo not found'
                });
            }
            if(todo.userId != req.user._id){
                return res.status(406).json({
                    message: 'not acceptable'
                })
            }
            await todoModel.deleteOne({
                _id:todo._id
            });
            return res.status(204).json({
                message:'todo deleted'
            });
        } catch (e) {
            logger.error(`Todo delete Error: ${e.message}`);
            next(e)
        }
    }
    getAllTodo = async (req, res, next) => {
        try {
            logger.info('Start get todo list - - -');
            const todos  = await todoModel.find({});
            return res.status(200).json(todos);
        } catch (e) {
            logger.error(`Todo delete Error: ${e.message}`)
            next(e)
        }
    }
    edit = async (req,res,next) =>{
        try {
            logger.info('Start edit todo - - -');
            const { id } = req.params;
            const todo = await todoModel.findById(id);
            if(!todo) {
                return res.status(404).json({
                    message:'todo not found'
                })
            }
            const updateTodo = await todoModel.findByIdAndUpdate(req.params.id,{
                ...req.body
            },{new: true})
            return res.status(200).json(updateTodo);
        } catch (e) {
            logger.error(`Todo edit Error: ${e.message}`)
            next(e)
        }
    }
    getOne = async (req,res,next) =>{
        try {
            logger.info('Start get one  todo - - -');
            const { id } = req.params;
            const todo = await todoModel.findById(id);
           if(!todo) {
              return  res.status(404).json({
                  message:'Todo not found'
              });
           }
            return res.status(200).json(todo);
        } catch (e) {
            logger.error(`Todo edit Error: ${e.message}`)
            next(e)
        }
    }
    getMyTodo = async (req,res,next) =>{
        try {
            logger.info('Start my todo list - - -');
            const todos = await todoModel.find({
                userId:req.user._id
            });
            return res.status(200).json(todos);
        } catch (e) {
            logger.error(`Todo edit Error: ${e.message}`)
            next(e)
        }
    }
}
module.exports = new Todo()