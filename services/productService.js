const productDatabase = require("../database/productDatabase");

async function getAllProducts() {
    return await productDatabase.getProducts();
}

async function getProductById(id) {
    const products = await productDatabase.getProducts();

    return products.find(
        product => product && product.id === id
    );
}

async function createProduct(product) {
    const products = await productDatabase.getProducts();

    products.push(product);

    await productDatabase.saveProducts(products);

    return product;
}

async function updateProduct(id, updatedProduct) {
    const products = await productDatabase.getProducts();

   const index = products.findIndex(product => product && product.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...updatedProduct,
        id: id
    };

    await productDatabase.saveProducts(products);

    return products[index];
}

async function patchProduct(id, updates) {
    const products = await productDatabase.getProducts();

    const index = products.findIndex(product => product && product.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...updates,
        id: id
    };

    await productDatabase.saveProducts(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await productDatabase.getProducts();

    const index = products.findIndex(product => {
        if (!product) {
            return false;
        }

        return product.id === id;
    });

    if (index === -1) {
        return false;
    }

    products.splice(index, 1);

    await productDatabase.saveProducts(products);

    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};