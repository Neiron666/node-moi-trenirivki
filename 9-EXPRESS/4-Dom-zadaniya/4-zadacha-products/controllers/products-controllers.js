function createProdutFn(id) {
    return {
        id: id,
        productTitle: `Title of product id ${id}`,
        productDescription: `Description of product id ${id}`,
    };
}

let products = [createProdutFn(1), createProdutFn(2)];

const getProductsHandler = (req, res) => {
    // В Express метод res.json() завершает обработку запроса и отправляет ответ клиенту в формате JSON.
    res.json(products);
};
const getSingleProductHandler = (req, res) => {
    const existingProduct = products.find(
        (product) => product.id === Number(req.params.productId)
    );
    if (existingProduct) {
        res.json(existingProduct);
    } else {
        res.status(404).send("Product not found");
    }
};

const postSingleProductHandler = (req, res) => {
    if (!req.body.title || !req.body.description) {
        return (
            res
                // код ошиби 400 (Bad Request)
                .status(400)
                //Преобразуем переданный объект в строку JSON.
                //Устанавливает заголовок ответа Content-Type: application/json
                //отправляет JSON с сообщением об ошибке: { error: "Title and description are required" }.
                .json({ error: "Title and description are requierd" })
        );
    } else {
        const { title, description } = req.body;
        const newProduct = {
            id: products.length + 1,
            productTitle: title || `Title of product id ${products.length + 1}`,
            productDescription:
                description ||
                `Description of product id ${products.length + 1}`,
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
    }
};
const putProductHandler = (req, res) => {
    const existingProduct = products.find(
        (product) => product.id === Number(req.params.productId)
    );
    if (existingProduct) {
        if (!req.body.title && !req.body.description) {
            res.status(400).json({
                error: "Title and description are required",
            });
        } else {
            existingProduct.productTitle =
                req.body.title || `Title of product id ${req.params.productId}`;
            existingProduct.productDescription =
                req.body.description ||
                `Description of product id ${req.params.productId}`;
            res.status(201).json(existingProduct); // Возвращаем измененную задачу
        }
    } else {
        res.status(404).send(
            `Product with id ${req.params.productId} not found`
        );
    }
};

const deleteProductHandler = (req, res) => {
    const existingProduct = products.find(
        (product) => product.id === Number(req.params.productId)
    );

    if (!existingProduct) {
        return res
            .status(404)
            .send(`Product with id ${req.params.productId} not found`);
    } else {
        products = products.filter((product) => {
            product.id !== Number(req.params.productId);
        });
        res.status(204).send();
    }
};

module.exports = {
    getProductsHandler,
    getSingleProductHandler,
    postSingleProductHandler,
    putProductHandler,
    deleteProductHandler,
};
