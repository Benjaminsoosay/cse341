// benjamin Soosay Iwuchukwu 
const Comment = require('../models/comments');

const getAllComments = async (req, res) => {
    
    try {
        const comments = await Comment.find();
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getSingleComment = async (req, res) => {
    
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).send({ message: 'comment not found' });
        res.status(200).send(comment);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createComment = async (req, res) => {
    
    try {
        const newComment = {
            userId: req.body.userId,
            userName: req.body.userName,
            eventId: req.body.eventId,
            content: req.body.content,
        };

        const comment = await Comment.create(newComment);
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const updateComment = async (req, res) => {
    
    try {
        const updatedcomment = {
            userId: req.body.userId,
            userName: req.body.userId,
            eventId: req.body.eventId,
            content: req.body.content,
        };

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            updatedcomment,
            { new: true } 
        );

        if (!comment) return res.status(404).send({ message: 'comment not found' });
        res.status(200).send(comment);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteComment = async (req, res) => {
    
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).send({ message: 'comment not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    getAllComments,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment
};