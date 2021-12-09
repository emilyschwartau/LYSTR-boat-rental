
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "profile_picture" VARCHAR (1000) NOT NULL,
);

-- listed vehicles go here:
CREATE TABLE "vehicle" (
    "id" SERIAL PRIMARY KEY,
    "owned_by" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "type_id" INTEGER NOT NULL REFERENCES "vehicle_type" ON DELETE CASCADE,
    "make" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "daily_rate" INTEGER NOT NULL,
    "cabins" INTEGER NOT NULL,
    "heads" INTEGER NOT NULL,
);

-- listed vehicles' addresses go here:
CREATE TABLE "vehicle_address" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicle" ON DELETE CASCADE,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zip" VARCHAR(255) NOT NULL,
    "address_type_id" INTEGER NOT NULL REFERENCES "address_type" ON DELETE CASCADE,
);

-- address types (dock, driveway, etc)
CREATE TABLE "address_type" (
    "id" SERIAL PRIMARY KEY,

)