const getCommentsHandler = (req, res) => {
    // res.send отправляет ответ клиенту и автоматически завершает его.
    //Этот метод также автоматически устанавливает заголовки, такие как Content-Type,
    //если это необходимо (например, для JSON или текста).
    res.send("Get comments route");
};
const getSingleCommentHandler = (req, res) => {
    res.send(`Get comment route. CommentId ${req.params.commentId}`);
};
const postCommentsHandler = (req, res) => {
    res.send("Post comments route");
};
const deleteSingleCommentHandler = (req, res) => {
    res.send(`Delete comment route. CommentId ${req.params.commentId}`);
};

module.exports = {
    getCommentsHandler,
    getSingleCommentHandler,
    postCommentsHandler,
    deleteSingleCommentHandler,
};
