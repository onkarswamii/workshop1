const cache = {};

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cached = cache[key];

    if (cached) {
        const age = Date.now() - cached.createdAt;

        if (age < TTL) {
            res.set("X-Cache", "HIT");

            return res.json(cached.value);
        }

        delete cache[key];
    }

    res.set("X-Cache", "MISS");

    res.locals.cacheKey = key;
    res.locals.cache = cache;

    next();
}

function invalidateCache() {
    Object.keys(cache).forEach(key => {
        delete cache[key];
    });
}

module.exports = {
    cacheMiddleware,
    invalidateCache
};