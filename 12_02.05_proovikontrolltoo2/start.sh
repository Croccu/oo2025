#!/bin/bash

echo "🚀 Starting Spring Boot backend..."
cd dictionary
./mvnw spring-boot:run &
cd ..

echo "⚛️ Starting React frontend..."
cd frontend
npm run dev
