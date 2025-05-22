#!/bin/bash

echo "🔍 Checking Backend (localhost:5000/todos)..."
curl -s http://localhost:5000/todos > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Backend is running on http://localhost:5000"
else
  echo "❌ Backend is NOT running on http://localhost:5000"
fi

echo "🔍 Checking Frontend (localhost:3000)..."
curl -s http://localhost:3000 > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Frontend is running on http://localhost:3000"
else
  echo "❌ Frontend is NOT running on http://localhost:3000"
fi

echo "📎 If any are failing, make sure to run:"
echo "👉 From backend/: node index.js"
echo "👉 From frontend/: npm start"
