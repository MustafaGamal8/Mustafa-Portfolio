@echo off
echo 🌱 Starting portfolio database seeding...
echo.

REM Check if .env file exists
if not exist .env (
    echo ❌ Error: .env file not found!
    echo Please create a .env file with your DATABASE_URL
    pause
    exit /b 1
)

REM Generate Prisma client
echo 🔧 Generating Prisma client...
call npm run db:generate

REM Apply migrations
echo 📦 Applying database migrations...
call npm run db:push

REM Run the seed
echo 🌱 Seeding database with portfolio data...
call npm run db:seed

echo.
echo ✅ Portfolio database seeding completed!
echo.
echo 🚀 You can now:
echo 1. Start your development server: npm run dev
echo 2. Open Prisma Studio: npm run db:studio
echo 3. Test your APIs at: http://localhost:3000/api/portfolio?lang=AR
echo.
echo 🔑 Admin credentials:
echo Email: admin@webnest.com
echo Password: password123
echo.
pause
