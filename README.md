please clone both file 
-- https://github.com/PeakpoonPK/vetAdmin-frontend
-- https://github.com/PeakpoonPK/vetAdmin-Backend-1

1. Create database
    1. Use ‘postgresql’ to create data base
    --> DATABASE_URL="postgresql://postgres:123456@localhost:5454/dogDoctor"
    2. Open Backend file and run ‘
    npx prisma migrate dev
    npx prisma generate
    npx prisma db seed
    ’
2. Run Program Using Node.Js for Frontend and Backend using ‘npm run dev’
Access program username/password
E-mail: admin@gmail.com
Password: admin1234

Working features
1. Doctor management
Doctor information
- Create ❌
- Read ✅
- Update ❌
- Delete ❌
- Search ✅
- Filter ❌

2. Appointment management
- View ✅
- Update ❌
- Confirm ❌
- Cancel ❌

3. Authentication ✅
- Implement admin login with encrypted password, generate a JWT token (valid for 1 hour) after successful login, and protect all API requests by requiring the JWT token for authentication. ✅




.env
Backend
***********
DATABASE_URL="postgresql://postgres:123456@localhost:5454/dogDoctor"
JWT_SECRET='Ce91WGfJ3vBmx5mp7N8L/dmDZVjStuw2TzkwhQ/dIeg='
PORT=8000
***********