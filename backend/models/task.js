const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    description: {type: String},
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low'},
    status: { type: String, enum: ['active', 'completed'], default: 'active'}
},{timestamps: true})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;