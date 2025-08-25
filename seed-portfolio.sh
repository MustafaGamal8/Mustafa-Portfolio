#!/bin/bash

echo "🌱 Starting portfolio database seeding..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your DATABASE_URL"
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Apply migrations (optional - if you want to reset schema)
echo "📦 Applying database migrations..."
npm run db:push

# Run the seed
echo "🌱 Seeding database with portfolio data..."
npm run db:seed

echo ""
echo "✅ Portfolio database seeding completed!"
echo ""
echo "🚀 You can now:"
echo "1. Start your development server: npm run dev"
echo "2. Open Prisma Studio: npm run db:studio"
echo "3. Test your APIs at: http://localhost:3000/api/portfolio?lang=AR"
echo ""
echo "🔑 Admin credentials:"
echo "Email: admin@webnest.com"
echo "Password: password123"
