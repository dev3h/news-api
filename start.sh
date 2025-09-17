#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting News API..."

# Check if swagger file exists, if not generate it
if [ ! -f "src/swagger-output.json" ]; then
    echo "📝 Generating Swagger documentation..."
    npm run swagger
fi

# Start the application
echo "✅ Starting server..."
npm start