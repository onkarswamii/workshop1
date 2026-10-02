const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "..", "db.json");

async function getProducts() {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function saveProducts(products) {
    await fs.writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );
}

module.exports = {
    getProducts,
    saveProducts
};
