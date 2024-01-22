const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSensorData = async (req, res) => {
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

        console.log(`Données enregistrées avec succès : ${JSON.stringify(sensorData)}`);
        res.json(sensorData);
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement des données : ${error.message}`);
        res.status(500).send(`Erreur lors de l'enregistrement des données`);
    }
};

const getSensorData = async (req, res) => {
    try {
        const sensorData = await prisma.sensorData.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        res.json(sensorData);
    } catch (error) {
        console.error(`Erreur lors de la récupération des données : ${error.message}`);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
};

const getSensorDataLastHour = async (req, res) => {
    const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
                createdAt: {
                    gte: oneHourAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.json(sensorData);
    } catch (error) {
        console.error(`Erreur lors de la récupération des données de la dernière heure : ${error.message}`);
        res.status(500).json({ error: 'Erreur lors de la récupération des données de la dernière heure' });
    }
};

const getSensorDataLastDay = async (req, res) => {
    const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
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
        console.error(`Erreur lors de la récupération des données du dernier jour : ${error.message}`);
        res.status(500).json({ error: 'Erreur lors de la récupération des données du dernier jour' });
    }
};

const getSensorDataLastMonth = async (req, res) => {
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));

    try {
        const sensorData = await prisma.sensorData.findMany({
            where: {
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
        console.error(`Erreur lors de la récupération des données du dernier mois : ${error.message}`);
        res.status(500).json({ error: 'Erreur lors de la récupération des données du dernier mois' });
    }
};



module.exports = {
    createSensorData,
    getSensorData,
    getSensorDataLastHour,
    getSensorDataLastDay,
    getSensorDataLastMonth
};
