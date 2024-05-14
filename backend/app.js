require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbWentWrong = "database did not respond correctly";

mongoose.connect(process.env.MONGODB_URI, {})
    .then(
        () => {
            console.log('Database connected successfully');
        })
    .catch(
        (error) => {
            console.error('Error connecting to database:', error);
        });

const Ingredient = require('./models/ingredient')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.readFile('access_count.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading access count from file:', err);
            res.sendStatus(500);
            return;
        }

        let acessos = parseInt(data) || 0;
        acessos++;
        console.log('Access count:', acessos);

        fs.writeFile('access_count.txt', acessos.toString(), (err) => {
            if (err) {
                console.error('Error writing access count to file:', err);
                res.sendStatus(500);
                return;
            }
            next();
        });
    });
});

app.use('/api/ingredients/clear', (req, res, next) => {
    Ingredient.collection.drop().then(() => {
        Ingredient.find().then((ingredients) => {
            return res.status(200).json({
                message: 'deu boa os posts',
                ingredients: ingredients,
            })
        }).catch(() => {
            console.log(dbWentWrong)
            res.status(400).send(dbWentWrong);
        });
    });
})

app.post('/api/ingredients', async (req, res) => {
    try {
        const ingredients = req.body.map(ingredient => new Ingredient({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit
        }));

        await Promise.all(ingredients.map(ingredient => ingredient.save()));
        Ingredient.find().then((ingredients) => {
            res.status(200).json({
                message: "success",
                ingredients: ingredients
            });
        })

    } catch (error) {
        // Handle errors
        console.error(req.body);
        res.status(500).json({ error: dbWentWrong });
    }
});

app.get('/api/ingredients', (req, res) => {

    Ingredient.find().then((ingredients) => {
        return res.status(200).json({
            message: 'deu boa os ingredients',
            ingredients: ingredients,
        })
    }).catch(() => {
        console.log(dbWentWrong)
        res.status(400).send({
            message: dbWentWrong,
            ingredients: [],
        })
    });
});

app.delete('/api/ingredients/:id', (req, res, next) => {
    Ingredient.deleteMany({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "success" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: dbWentWrong });
        });
});



module.exports = app;

