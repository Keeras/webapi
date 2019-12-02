const express = require('express');
const Hero = require('../models/heros');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        // console.log(req.user);
        hero.find({ author: req.user._id })
            .then((heros) => {
                res.json(heros);
            }).catch((err) => next(err));
    })
    .post((req, res, next) => {
        let hero = new Hero(req.body);
        hero.author = req.user._id;
        hero.save()
            .then((hero) => {
                res.statusCode = 201;
                res.json(hero);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete((req, res, next) => {
        Hero.deleteMany({ author: req.user._id })
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Hero.findOne({ author: req.user._id, _id: req.params.id })
            .then((hero) => {
                if (hero == null) throw new Error("Hero not found!")
                res.json(hero);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        Hero.findOneAndUpdate({ author: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("Hero not found!");
                res.json(reply);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Hero.findOneAndDelete({ author: req.user._id, _id: req.param.id })
            .then((hero) => {
                if (hero == null) throw new Error("Hero not found!");
                res.json(hero);
            }).catch(next);
    });

router.route('/:id/heros')
    .get((req, res, next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                res.json(hero.heros);
            })
            .catch(next);
    })
    .post((req, res, next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                hero.heros.push(req.body);
                hero.save()
                    .then((hero) => {
                        res.json(hero.heros);
                    })
                    .catch(next);
            })
            .catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .delete((req, res, next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                hero.heros = [];
                hero.save()
                    .then((hero) => {
                        res.json(hero.heros);
                    })
                    .catch(next);
            })
            .catch(next);
    });

router.route('/:id/heros/:hid')
    .get((req, res, next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                let vilen = hero.heros.id(req.params.hid);
                res.json(vilen);
            })
            .catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                let vilen = hero.heros.id(req.params.hid);
                vilen.vilen = req.body.vilen;
                hero.save()
                    .then(() => {
                        res.json(vilen);
                    })
                    .catch(next);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        Hero.findById(req.params.id)
            .then((hero) => {
                hero.heros.pull(req.params.hid);
                hero.save()
                    .then((hero) => {
                        res.json(hero.heros);
                    })
                    .catch(next);
            })
            .catch();
    });
module.exports = router;