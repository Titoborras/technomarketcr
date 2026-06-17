# TechnoMarketCR - Full Stack E-Commerce Platform

A complete full-stack e-commerce solution with product catalog, shopping cart, user authentication, payment processing, and admin dashboard.

## 🚀 Features

- **Product Catalog** - Browse and search products with filtering
- **Shopping Cart** - Add/remove products, manage quantities
- **User Authentication** - Secure signup/login with JWT
- **Payment Integration** - Stripe and PayPal support
- **Admin Dashboard** - Manage products, orders, and inventory
- **Search & Filtering** - Find products by category, price, ratings
- **Responsive Design** - Works on desktop, tablet, and mobile

## 📋 Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Stripe & PayPal SDK** - Payment processing
- **Bcryptjs** - Password hashing

## 🛠️ Installation & Setup (Windows)

### Prerequisites
- Node.js (v18+) - Download from https://nodejs.org/
- MongoDB (local or MongoDB Atlas) - https://www.mongodb.com/
- Git - Download from https://git-scm.com/

### Clone Repository
```bash
git clone https://github.com/Titoborras/technomarketcr.git
cd technomarketcr
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
echo. > .env
```

Add to `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/technomarketcr
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
NODE_ENV=development
```

```bash
npm start
```

### Frontend Setup
```bash
cd ../frontend
npm install

# Create .env.local
echo. > .env.local
```

Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

```bash
npm run dev
```

### Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin

## 📁 Project Structure

```
technomarketcr/
├── frontend/                 # Next.js frontend
│   ├── app/                 # Pages and routes
│   ├── components/          # React components
│   ├── store/              # Redux store
│   ├── styles/             # Tailwind CSS
│   └── public/             # Static files
├── backend/                # Express backend
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration
│   └── server.js           # Entry point
└── README.md
```

## 🔐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/stripe` - Process Stripe payment
- `POST /api/payments/paypal` - Process PayPal payment

## 📦 Database Schema

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  reviews: [Object],
  createdAt: Date
}
```

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  address: String,
  phone: String,
  role: String (user/admin),
  createdAt: Date
}
```

### Order
```javascript
{
  user: ObjectId,
  products: [Object],
  totalPrice: Number,
  status: String (pending/paid/shipped),
  paymentMethod: String,
  createdAt: Date
}
```

## 🔑 Key Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with nodemon
npm test         # Run tests
```

## 💳 Payment Integration

### Stripe Setup
1. Create account at https://stripe.com
2. Get API keys from Dashboard
3. Add keys to `.env`

### PayPal Setup
1. Create account at https://developer.paypal.com
2. Get Client ID and Secret
3. Add to `.env`

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm i -g vercel
vercel
```

### Backend (Heroku/Railway)
1. Push code to GitHub
2. Connect repository to Heroku/Railway
3. Set environment variables
4. Deploy

## 📝 License

MIT License - feel free to use this project

## 💬 Support

For issues and questions, please create a GitHub issue.

---

**Happy coding! 🎉**
