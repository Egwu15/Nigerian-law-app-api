const jwt = require("jsonwebtoken");

module.exports  =  function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ 'error': "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECREAT);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send({ 'error': error });
    }

}