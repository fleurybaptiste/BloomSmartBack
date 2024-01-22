-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SensorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temperature" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SensorData" ("createdAt", "deviceId", "deviceName", "humidity", "id", "temperature") SELECT "createdAt", "deviceId", "deviceName", "humidity", "id", "temperature" FROM "SensorData";
DROP TABLE "SensorData";
ALTER TABLE "new_SensorData" RENAME TO "SensorData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
