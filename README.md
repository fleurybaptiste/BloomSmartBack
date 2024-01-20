# BloomSmartBack
# Backend du Projet BloomSmartBack

## Description
Ce projet est un serveur Node.js qui fournit des données de température et d'humidité via une API REST.

## Installation et Lancement

### Prérequis
- Node.js
- npm (gestionnaire de paquets Node)
- SQLite3

### Installation des Dépendances
1. Clonez le dépôt.
2. Dans le répertoire du projet, exécutez `npm install` pour installer les dépendances.

### Configuration de la Base de Données
- Assurez-vous que SQLite3 est installé sur votre système.
- Créez un fichier `.env` à la racine du projet et définissez la variable `DATABASE_URL` comme suit : `DATABASE_URL="file:./dev.db"`.

### Lancement du Serveur
- Exécutez `node index.js` pour lancer le serveur.
- Le serveur sera accessible sur `http://localhost:3000`.

## Utilisation
Le serveur reçoit des données de température et d'humidité et les stocke dans une base de données SQLite. Ces données peuvent être visualisées via le frontend.

## Installation de DB Browser for SQLite

### Windows
- Téléchargez et installez DB Browser for SQLite depuis [le site officiel](https://sqlitebrowser.org/dl/).

### Linux
- Installez via apt: `sudo apt install sqlitebrowser` ou via snap: `sudo snap install sqlitebrowser`.
