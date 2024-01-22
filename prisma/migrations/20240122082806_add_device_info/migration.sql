/*
  Warnings:

  - Added the required column `deviceId` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceName` to the `SensorData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_SensorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temperature" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "deviceId" TEXT NOT NULL DEFAULT '',
    "deviceName" TEXT NOT NULL DEFAULT 'Unknown Device',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "new_SensorData" ("id", "temperature", "humidity", "createdAt")
SELECT "id", "temperature", "humidity", "createdAt" FROM "SensorData";

DROP TABLE "SensorData";

ALTER TABLE "new_SensorData" RENAME TO "SensorData";

PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;