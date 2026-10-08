# 🏠 Dhaka Dream Nest

**Dhaka Dream Nest** is a modern **Building & Property Management System** designed to simplify apartment discovery, booking, payment, and property management.

The platform provides separate experiences for users and administrators, allowing users to explore available apartments, make bookings, complete payments securely, and manage their bookings. Administrators can manage properties, users, bookings, and overall platform activities from an admin dashboard.

---

## 🚀 Live Demo

🔗 **Live Website:** https://dhaka-dream-nest.vercel.app/

---

## 📌 Features

### 👤 User Features

- 🔐 User Registration & Login
- 🔑 Authentication with NextAuth
- 🏢 Browse available apartments
- 🔍 View apartment/property details
- 📅 Check apartment availability
- 📝 Request apartment booking
- 💳 Secure online payment with Stripe
- 📋 View booking history
- 👤 Manage user profile
- 🚫 Prevent booking unavailable apartments
- 📱 Responsive design for mobile, tablet, and desktop

### 🛠️ Admin Features

- 📊 Admin Dashboard
- 👥 Manage registered users
- 🏢 Manage apartments/properties
- 📋 Manage booking requests
- ✅ Approve or reject booking requests
- 💰 Monitor payment/booking information
- 📈 Manage overall property information
- 🔐 Role-based access control

---

## 🧰 Technologies Used

### Frontend

- **Next.js**
- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **Material UI (MUI)**
- **AOS (Animate On Scroll)**

### Backend & Database

- **Next.js API / Server-side functionality**
- **MongoDB**

### Authentication

- **NextAuth.js**

### Payment

- **Stripe**

### Development Tools

- **Git**
- **GitHub**
- **VS Code**
- **Vercel**

---

## 🏗️ Project Architecture

The project follows a modern full-stack architecture:

```text
User
 │
 ▼
Next.js Frontend
 │
 ├── Authentication
 │      └── NextAuth
 │
 ├── Property Management
 │
 ├── Booking System
 │
 └── Payment System
        │
        ▼
      Stripe
        │
        ▼
     Backend/API
        │
        ▼
     MongoDB
```

---

## 📂 Project Structure

```text
Dhaka-Dream-Nest/
│
├── public/
│   ├── images/
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── apartments/
│   │   ├── booking/
│   │   ├── login/
│   │   ├── register/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   └── ...
│   │
│   ├── lib/
│   │   └── ...
│   │
│   └── ...
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

> The exact folder structure may vary depending on the current version of the project.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mahmud256/Dhaka-Dream-Nest.git
```

### 2. Navigate to the Project

```bash
cd Dhaka-Dream-Nest
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

> Never upload `.env.local` or any secret API keys to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 💳 Payment System

The project integrates **Stripe** for online payment processing.

The booking/payment workflow is:

```text
Select Apartment
       ↓
Check Availability
       ↓
Submit Booking
       ↓
Proceed to Payment
       ↓
Stripe Checkout
       ↓
Payment Successful
       ↓
Booking Confirmation
```

The system is designed to prevent users from booking apartments that are no longer available.

---

## 🔐 Authentication & Authorization

The application uses **NextAuth.js** for authentication.

Different user roles can access different parts of the application.

### User

Users can:

- Browse properties
- View property details
- Make booking requests
- Make payments
- View their bookings
- Manage their account

### Admin

Administrators can:

- Access the admin dashboard
- Manage properties
- Manage users
- Manage bookings
- Approve/reject booking requests
- Monitor platform activities

---

## 📱 Responsive Design

Dhaka Dream Nest is designed to work across different screen sizes:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

The UI is built primarily with **Tailwind CSS** and **Material UI**.

---

## 🎨 UI & User Experience

The project focuses on providing a clean and modern user experience.

Key UI features include:

- Responsive navigation
- Modern property cards
- Interactive buttons
- Smooth animations
- Scroll animations using AOS
- Responsive forms
- User-friendly booking flow
- Admin dashboard
- Mobile-friendly layouts

---

## 🧪 Testing Considerations

Important areas that can be tested include:

### Authentication

- Registration
- Login
- Logout
- Invalid credentials
- Protected routes
- Role-based access

### Property Management

- Property listing
- Property details
- Availability
- Property information

### Booking

- Booking request
- Duplicate booking prevention
- Availability validation
- Booking status
- Booking history

### Payment

- Successful payment
- Failed payment
- Payment cancellation
- Payment confirmation

### Responsive Testing

- Desktop
- Tablet
- Mobile
- Different screen resolutions

---

## 🔮 Future Improvements

Potential future improvements include:

- ⭐ Property rating & review system
- 🔎 Advanced property filtering
- 📍 Google Maps integration
- 💬 Real-time chat between users and property managers
- 📧 Email booking notifications
- 📱 SMS notifications
- 📊 Advanced analytics dashboard
- 🧾 Automated invoices
- ❤️ Wishlist/Favorite properties
- 🔔 Real-time notifications
- 🌙 Dark mode
- 🤖 AI-powered property recommendations

---

## 📸 Screenshots

Add screenshots of the major pages here:

### 🏠 Home Page

```text
Add your Home Page screenshot here
```

### 🏢 Apartment Listing

```text
Add your Apartment Listing screenshot here
```

### 📄 Apartment Details

```text
Add your Apartment Details screenshot here
```

### 📊 Admin Dashboard

```text
Add your Admin Dashboard screenshot here
```

### 💳 Payment

```text
Add your Stripe Payment screenshot here
```

---

## 📈 Project Highlights

- Full-stack property management application
- Modern Next.js architecture
- TypeScript-based development
- MongoDB database integration
- NextAuth authentication
- Stripe payment integration
- Role-based access control
- Booking availability management
- Responsive UI
- Admin dashboard
- Production deployment with Vercel

---

## 👨‍💻 Developer

**Mahmudul Hasan Sarkar**

🎓 B.Sc. in Computer Science & Engineering

### Skills Demonstrated

- React.js
- Next.js
- TypeScript
- Tailwind CSS
- Material UI
- MongoDB
- NextAuth.js
- Stripe
- Git & GitHub
- Responsive Web Design
- Full-Stack Web Development

---

## 📄 License

This project is developed for **educational, portfolio, and demonstration purposes**.

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**Thank you for visiting Dhaka Dream Nest! 🏠**
