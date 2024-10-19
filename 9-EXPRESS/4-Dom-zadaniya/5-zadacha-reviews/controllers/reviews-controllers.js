function createReviewFn(id) {
    return {
        id: id,
        author: `author with id ${id}`,
        content: `content with id ${id}`,
    };
}

let reviews = [createReviewFn(1), createReviewFn(2)];

const getReviewsHandler = (req, res) => {
    // В Express метод res.json() завершает обработку запроса и отправляет ответ клиенту в формате JSON.
    res.json(reviews);
};
const getSingleReviewHandler = (req, res) => {
    const existingReview = reviews.find(
        (review) => review.id === Number(req.params.reviewId)
    );
    if (existingReview) {
        res.json(existingReview);
    } else {
        res.starus(404).send(`Review with id ${req.params.reviewId} not found`);
    }
};
const postReviewHandler = (req, res) => {
    if (!req.body.author || !req.body.content) {
        res.status(400).json({ error: "Author and content are required" });
    } else {
        const newReview = {
            id: reviews.length + 1,
            author: req.body.author || `author with id ${reviews.length + 1}`,
            content:
                req.body.content || `content with id ${reviews.length + 1}`,
        };
        reviews.push(newReview);
        res.status(201).json(newReview);
    }
};
const putReviewHandler = (req, res) => {
    const existingReview = reviews.find(
        (review) => review.id === Number(req.params.reviewId)
    );
    if (existingReview) {
        if (!req.body.author && !req.body.content) {
            res.status(400).json({ error: "Author and content required" });
        } else {
            existingReview.id = reviews.length + 1;
            existingReview.author =
                req.body.author || `author with id ${reviews.length + 1}`;
            existingReview.content =
                req.body.content || `content with id ${reviews.length + 1}`;
            res.status(202).send(existingReview);
        }
    } else {
        res.status(404).send(
            `Product with id  ${req.params.productId} not found`
        );
    }
};
const deleteReviewHandler = (req, res) => {
    const existingReview = reviews.find(
        (review) => review.id === Number(req.params.reviewId)
    );

    if (existingReview) {
        reviews = reviews.filter(
            (review) => review.id !== Number(req.params.reviewId)
        );
        res.status(204).send();
    } else {
        res.status(404).send(`Review with id ${req.params.reviewId} not found`);
    }
};

module.exports = {
    getReviewsHandler,
    getSingleReviewHandler,
    postReviewHandler,
    putReviewHandler,
    deleteReviewHandler,
};
