-- Database name is "lystr"


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
    "profile_picture" VARCHAR (1000) 
);

-- vehicle type table - mainly for generating select options
CREATE TABLE "type" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

-- listed vehicles go here:
CREATE TABLE "vehicle" (
    "id" SERIAL PRIMARY KEY,
    "owned_by" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "type_id" INTEGER NOT NULL REFERENCES "vehicle_type" ON DELETE CASCADE,
    "title" VARCHAR(255) NOT NULL,
    "make" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "daily_rate" INTEGER NOT NULL,
    "cabins" INTEGER NOT NULL,
    "heads" INTEGER NOT NULL,
    "instructions" VARCHAR(1000)
);

-- listed vehicles' addresses go here:
CREATE TABLE "address" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicle" ON DELETE CASCADE,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zip" VARCHAR(255) NOT NULL
);

-- photos for each vehicle
CREATE TABLE "photos" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicle" ON DELETE CASCADE,
    "image_path" VARCHAR(510) NOT NULL
);

-- vehicle features (boolean values, used to generate inputs)
CREATE TABLE "features" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

-- junction table
CREATE TABLE "vehicle_features" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicle" ON DELETE CASCADE,
    "feature_id" INTEGER NOT NULL REFERENCES "features" ON DELETE CASCADE
);

-- table of dates that vehicles are available to rent
CREATE TABLE "availability" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicle" ON DELETE CASCADE,
    "date" DATE NOT NULL,
    "is_rented" BOOLEAN DEFAULT FALSE
);

-- holds rental apointments
CREATE TABLE "rental" (
    "id" SERIAL PRIMARY KEY,
    "rented_by" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "date_id" INTEGER NOT NULL REFERENCES "availability" ON DELETE CASCADE
);

-- STRETCH table for messages between users
CREATE TABLE "messages" (
    "id" SERIAL PRIMARY KEY,
    "sent_by" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "received_by" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "msg" VARCHAR(1000) NOT NULL
)