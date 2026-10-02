const productService = require("../services/productService");

const { invalidateCache } = require("../middleware/cache");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        const key = res.locals.cacheKey;
        const cache = res.locals.cache;

        cache[key] = {
            value: products,
            createdAt: Date.now()
        };

        res.json(products);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Server Error");
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        const key = res.locals.cacheKey;
        const cache = res.locals.cache;

        cache[key] = {
            value: product,
            createdAt: Date.now()
        };

        res.json(product);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Server Error");
    }
}

async function createProduct(req, res) {
    try {
        const product = req.body;

        const newProduct = await productService.createProduct(product);

        invalidateCache();

        res.status(201).json(newProduct);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Server Error");
    }
}

async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const updatedProduct = await productService.updateProduct(
            id,
            req.body
        );

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        invalidateCache();

        res.json(updatedProduct);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Server Error");
    }
}

async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const updatedProduct = await productService.patchProduct(
            id,
            req.body
        );

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        invalidateCache();

        res.json(updatedProduct);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Server Error");
    }
}

async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const deleted = await productService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).send("Product not found");
        }

        invalidateCache();

        res.status(204).send();

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};