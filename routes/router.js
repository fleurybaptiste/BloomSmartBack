const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');

// Route pour créer des données de capteur
router.post('/sensor-data', sensorDataController.createSensorData);

// Route pour récupérer toutes les données de capteur
router.get('/api/data', sensorDataController.getSensorData);

// Route pour récupérer les données de capteur de la dernière heure
router.get('/api/data/last-hour', sensorDataController.getSensorDataLastHour);

// Route pour récupérer les données de capteur du dernier jour
router.get('/api/data/last-day', sensorDataController.getSensorDataLastDay);

// Route pour récupérer les données de capteur du dernier mois
router.get('/api/data/last-month', sensorDataController.getSensorDataLastMonth);

module.exports = router;