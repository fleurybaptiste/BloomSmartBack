const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');
const notifier = require('node-notifier');

// Schéma de validation pour la création de données de capteur
const sensorDataSchema = Joi.object({
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
    deviceId: Joi.string().required(),
    deviceName: Joi.string().required()
});

// Fonction pour créer des données de capteur
const createSensorData = async (req, res) => {
    const { error } = sensorDataSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { temperature, humidity, deviceId, deviceName } = req.body;

    try {
        const sensorData = await prisma.sensorData.create({
            data: {
                temperature,
                humidity,
                deviceId,
                deviceName
            },
        });

        res.json(sensorData);
    } catch (error) {
        console.error({
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            body: req.body,
            errorMessage: error.message
        });
        res.status(500).json({ error: `Une erreur est survenue lors de l'enregistrement des données` });
    }
};

// Fonction pour récupérer les données de capteur
const getSensorData = async (req, res) => {
    const deviceId = req.query.deviceId; // Récupérer l'identifiant du capteur depuis les paramètres de requête

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
                ...(deviceId && { deviceId: deviceId }), // Filtrer par deviceId si fourni
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        res.json(sensorData);
    } catch (error) {
        console.error({
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            errorMessage: error.message
        });
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
};

const getSensorDataLastHour = async (req, res) => {
    const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
    const deviceId = req.query.deviceId; 

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
                ...(deviceId && { deviceId: deviceId }),
                createdAt: {
                    gte: oneHourAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        // Vérifier la température pour 'EC:FA:BC:1D:48:A4'
        if (deviceId === 'EC:FA:BC:1D:48:A4') {
            const latestData = sensorData[sensorData.length - 1];
            if (latestData && latestData.temperature > 20.5) {
                notifier.notify({
                    title: 'Alerte de Température',
                    message: `La température a dépassé 20.5°C pour le capteur ${deviceId}`
                });
            }
        }

        res.json(sensorData);
    } catch (error) {
        console.error({
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            query: req.query,
            errorMessage: error.message
        });
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

const getSensorDataLastDay = async (req, res) => {

    const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const deviceId = req.query.deviceId; 

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
                 ...(deviceId && { deviceId: deviceId }),
                createdAt: {
                    gte: oneDayAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.json(sensorData);
} catch (error) {
    console.error({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        query: req.query,
        errorMessage: error.message
    });
    res.status(500).json({ error: 'Une erreur est survenue' });
}
};

const getSensorDataLastMonth = async (req, res) => {

    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const deviceId = req.query.deviceId;

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
                 ...(deviceId && { deviceId: deviceId }),
                createdAt: {
                    gte: oneMonthAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.json(sensorData);
    } catch (error) {
    console.error({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        query: req.query,
        errorMessage: error.message
    });
    res.status(500).json({ error: 'Une erreur est survenue' });
}
};



module.exports = {
    createSensorData,
    getSensorData,
    getSensorDataLastHour,
    getSensorDataLastDay,
    getSensorDataLastMonth
};
