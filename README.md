# Next.js E-Commerce App

A modern e-commerce application with authentication and product management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and secrets

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 16** (Pages Router)
- **TypeScript**
- **MongoDB** + Mongoose
- **NextAuth.js** (Google & GitHub OAuth)
- **Tailwind CSS** + Shadcn/ui
- **Lucide Icons**

## 📝 Features

- Email/Password & OAuth authentication
- Product CRUD operations
- Search & category filters
- User profile management
- Responsive design

## 📄 License

MIT

2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Add callback URL: `http://localhost:3000/api/auth/callback/github`

### 5. Seed the Database (Optional)

\`\`\`bash
npm run seed
\`\`\`

### 6. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
next-project-pages/
├── components/ # React components
│ ├── ui/ # Shadcn/ui components
│ ├── Layout.tsx # Main layout wrapper
│ ├── ModernNavbar.tsx # Navigation bar
│ ├── ModernFooter.tsx # Footer
│ └── ModernProductCard.tsx
├── pages/ # Pages Router
│ ├── api/ # API routes
│ │ ├── auth/ # NextAuth endpoints
│ │ ├── products/ # Product CRUD
│ │ └── users/ # User management
│ ├── products/ # Product pages
│ ├── login.tsx # Login page
│ ├── register.tsx # Registration page
│ ├── profile.tsx # User profile
│ ├── about.tsx # About page
│ ├── index.tsx # Home page
│ ├── \_app.tsx # Custom App
│ └── \_document.tsx # Custom Document
├── lib/ # Utility functions
│ ├── auth.ts # NextAuth configuration
│ ├── mongodb.ts # Database connection
│ ├── utils.ts # Helper functions
│ └── constants.ts # App constants
├── models/ # Mongoose models
│ ├── User.ts
│ └── Product.ts
└── public/ # Static assets
\`\`\`

## 🔐 Authentication Flow

### Registration

1. User fills registration form
2. Password is hashed with bcryptjs
3. User document created in MongoDB
4. Auto-login after successful registration

### Login

- **Credentials**: Email + password validation
- **OAuth**: Google or GitHub sign-in
- Session stored as JWT token

### Protected Routes

- Profile page requires authentication
- Product creation/editing requires authentication
- API routes check session before operations

## 🎨 UI Components

Built with **Shadcn/ui** for consistency and accessibility:

- Button
- Card
- Input
- Label
- Avatar
- Dropdown Menu
- Separator
- And more...

## 🔄 API Endpoints

### Authentication

- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get session
- `POST /api/users/register` - Register new user
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile

### Products

- `GET /api/products` - List products (public, limited for non-auth)
- `POST /api/products` - Create product (auth required)
- `GET /api/products/[id]` - Get single product (public)
- `PUT /api/products/[id]` - Update product (auth required)
- `DELETE /api/products/[id]` - Delete product (auth required)

## 🚢 Deployment

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas Setup

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Add database user
3. Whitelist IP addresses
4. Copy connection string to `MONGODB_URI`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## 🎯 Key Differences from App Router

This project uses **Pages Router** instead of App Router:

| Feature        | App Router           | Pages Router (This Project)            |
| -------------- | -------------------- | -------------------------------------- |
| Routing        | `app/` directory     | `pages/` directory                     |
| API Routes     | `app/api/*/route.ts` | `pages/api/*.ts`                       |
| Layouts        | `layout.tsx`         | `_app.tsx` + `_document.tsx`           |
| Data Fetching  | Server Components    | `getServerSideProps`, `getStaticProps` |
| Authentication | Middleware           | API route checks                       |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)

---

**Built with ❤️ using Next.js & Shadcn/ui**
