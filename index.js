const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

app.post('/sensor-data', async (req, res) => {
    const { temperature, humidity } = req.body;

    // Log les données reçues et le timestamp
    console.log(`Réception de données - Température: ${temperature}, Humidité: ${humidity} - Timestamp: ${new Date().toISOString()}`);

    try {
        const sensorData = await prisma.sensorData.create({
            data: {
                temperature,
                humidity
            },
        });

        // Log en cas de succès
        console.log(`Données enregistrées avec succès : ${JSON.stringify(sensorData)}`);
        res.json(sensorData);
    } catch (error) {
        // Log en cas d'erreur
        console.error(`Erreur lors de l'enregistrement des données : ${error.message}`);
        res.status(500).send(`Erreur lors de l'enregistrement des données`);
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const sensorData = await prisma.sensorData.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        res.json(sensorData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
