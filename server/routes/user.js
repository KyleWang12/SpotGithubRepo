const express = require('express');

const UserModel = require('./model/user.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();

router.post('/login', function (request, response) {
    const { userName, password } = request.body;

    return UserModel.getUserByUserName(userName)
        .then(user => {
            if(!user){
                return response.status(401).send("Invalid password or userName");
            }
            user.comparePassword(password, function (matchError, isMatch) {
                if (matchError || !isMatch) {
                    return response.status(401).send("Invalid password or userName");
                } else {
                    const payload = {
                        userName: userName,
                    };
                    const token = jwt.sign(payload, "SUPER_SECRET", {
                        expiresIn: '14d'
                    });
                    return response.cookie('token', token, { httpOnly: true })
                        .status(200).send({ userName });
                }
            })
        })
        .catch(error => {
            response.status(400).send("There was an error");
        })
})

router.post('/logout', auth_middleware, function (request, response) {
    const token = jwt.sign({}, "SUPER_SECRET", {
        expiresIn: '0d'
    });
    return response.cookie('token', token, { httpOnly: true })
        .status(200).send();
})

router.get('/isLoggedIn', auth_middleware, function (request, response) {
    return response.status(200).send({ userName: request.userName });
})

router.get('/:userName', function (request, response) {

    const userName = request.params.userName

    return UserModel.getUserByUserName(userName)
        .then(user => {
            response.status(200).send(user);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.post('/', function (request, response) {
    const { userName, password } = request.body;

    if (!userName || !password) {
        response.status(401).send("Missing userName or password argument")
    }

    const user = {
        userName,
        password
    }

    return UserModel.createUser(user)
        .then(dbResponse => {
            const payload = {
                userName: userName,
            };
            const token = jwt.sign(payload, "SUPER_SECRET", {
                expiresIn: '14d'
            });
            return response.cookie('token', token, { httpOnly: true })
                .status(200).send({ userName });
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;