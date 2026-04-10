# Sellis

A full-stack salon/spa service management platform with a Spring Boot REST API and React admin dashboard. Manages service catalogs, flexible pricing (fixed, range, variants), categories, and admin authentication.

## Tech Stack

### Backend
- **Java 21** / **Spring Boot 3.4.4**
- **MongoDB** (Spring Data MongoDB)
- **Spring Security** + **JWT** (jjwt 0.12.6)
- **Maven**

### Frontend (CMS)
- **React 18** + **Vite 5**
- **React Router 6**
- **Cloudinary** (image uploads)
- Custom CSS (mobile-first, no framework)

---

## Getting Started

### Prerequisites
- Java 21+
- MongoDB (running on `localhost:27017`)
- Node.js 18+
- Maven 3.9+

### Backend

```bash
cd server

# Set environment variables (optional, defaults are provided)
export MONGO_URI=mongodb://localhost:27017/sellis
export JWT_SECRET=<base64-encoded-256-bit-key>
export ADMIN_EMAIL=admin@sellis.com
export ADMIN_PASSWORD=Admin@123

# Build and run
mvn spring-boot:run
```

The API starts on **port 8080**. On first run, the database is seeded with a default admin account, 6 categories, and ~50 services.

### Frontend

```bash
cd server/client

# Install dependencies
npm install

# (Optional) Configure Cloudinary for image uploads
cp .env.example .env
# Edit .env with your Cloudinary cloud name and upload preset

# Start dev server
npm run dev
```

The frontend starts on **port 3000** and proxies `/api` requests to `localhost:8080`.

### Default Login
- **Email:** `admin@sellis.com`
- **Password:** `Admin@123`

---

## Project Structure

```
server/
├── pom.xml
├── src/main/java/com/sellis/server/
│   ├── SellisApplication.java
│   ├── config/
│   │   ├── DataSeeder.java            # Seeds admin, categories, services
│   │   └── MongoConfig.java
│   ├── controller/
│   │   ├── AuthController.java        # POST /api/auth/login
│   │   ├── PublicController.java      # GET /api/categories, /api/services
│   │   └── AdminController.java       # CRUD /api/admin/*
│   ├── model/
│   │   ├── Admin.java
│   │   ├── Category.java
│   │   ├── SalonService.java
│   │   ├── PriceRange.java            # Embedded
│   │   └── ServiceVariant.java        # Embedded
│   ├── dto/
│   │   ├── ApiResponse.java           # Unified response wrapper
│   │   ├── PagedResponse.java
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── ServiceRequest.java
│   │   └── CategoryRequest.java
│   ├── repository/
│   │   ├── AdminRepository.java
│   │   ├── CategoryRepository.java
│   │   └── SalonServiceRepository.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── CategoryService.java
│   │   └── SalonServiceService.java
│   ├── security/
│   │   ├── SecurityConfig.java
│   │   ├── JwtTokenProvider.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── CustomUserDetailsService.java
│   └── exception/
│       ├── GlobalExceptionHandler.java
│       ├── ResourceNotFoundException.java
│       └── BadRequestException.java
├── src/main/resources/
│   └── application.yml
└── client/
    ├── package.json
    ├── vite.config.js
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        │   ├── client.js              # Fetch wrapper with JWT
        │   └── cloudinary.js          # Image upload
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── ServicesPage.jsx
        │   └── CategoriesPage.jsx
        ├── components/
        │   ├── Layout.jsx             # Sidebar + topbar
        │   ├── ProtectedRoute.jsx
        │   ├── Modal.jsx
        │   ├── ServiceForm.jsx
        │   ├── CategoryForm.jsx
        │   └── ImageUpload.jsx
        └── styles/
            └── index.css
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email and password |

**Request:** `{ "email": "...", "password": "..." }`
**Response:** `{ "success": true, "data": { "token": "...", "email": "...", "name": "...", "role": "ADMIN" } }`

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all active categories |
| GET | `/api/services` | List services (paginated) |
| GET | `/api/services/{id}` | Get a single service |

**Query params for `/api/services`:** `page`, `size`, `category` (category ID), `search` (name search)

### Admin (requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/categories` | Create category |
| PUT | `/api/admin/categories/{id}` | Update category |
| DELETE | `/api/admin/categories/{id}` | Soft-delete category |
| POST | `/api/admin/services` | Create service |
| PUT | `/api/admin/services/{id}` | Update service |
| DELETE | `/api/admin/services/{id}` | Soft-delete service |

---

## Data Models

### Category
| Field | Type | Notes |
|-------|------|-------|
| name | String | Unique, required |
| slug | String | Auto-generated from name |
| description | String | Optional |
| displayOrder | int | Controls sort order |
| active | boolean | Soft delete flag |

### SalonService
| Field | Type | Notes |
|-------|------|-------|
| name | String | Required |
| categoryId | String | Required, references Category |
| categoryName | String | Denormalized for display |
| description | String | Optional |
| price | Double | Fixed price (one of three pricing modes) |
| priceRange | PriceRange | `{ min, max }` |
| variants | List\<ServiceVariant\> | `[{ name, price }]` |
| hasVariants | boolean | Flag for variant pricing |
| imageUrl | String | Cloudinary URL, optional |
| active | boolean | Soft delete flag |

Each service uses exactly one pricing mode: **fixed price**, **price range**, or **variants**.

### Admin
| Field | Type | Notes |
|-------|------|-------|
| email | String | Unique, indexed |
| password | String | BCrypt hashed |
| name | String | Display name |
| role | String | `"ADMIN"` |

---

## Authentication

1. Admin submits credentials at `/api/auth/login`
2. Backend validates against MongoDB, returns a JWT token (24h expiry)
3. Token is stored in `localStorage` on the frontend
4. All subsequent requests include `Authorization: Bearer <token>`
5. `JwtAuthenticationFilter` validates the token on each request

Public GET endpoints (`/api/categories`, `/api/services`) do not require authentication.

---

## CMS Dashboard

### Login
Email/password form with error handling and loading state.

### Dashboard
- **Stat cards:** Total services, categories, average price (clickable, navigate to respective pages)
- **Pricing breakdown:** Fixed / range / variant counts (clickable)
- **Category table:** Services per category with percentage bars
- **Recently added:** Last 5 services by creation date
- **Highest priced:** Top 5 fixed-price services

### Services
- Search by name, filter by category
- Paginated table (20 per page)
- Image thumbnails or initials fallback
- Create / edit / delete via modals
- Pricing mode toggle: fixed, range, or variants

### Categories
- Table with name, slug, description, display order
- Create / edit / delete via modals

---

## Seed Data

On first startup, the database is populated with:

- **1 Admin:** `admin@sellis.com` / `Admin@123`
- **6 Categories:** Hair, Facials, SPA, Nails, Waxing, Lashes & Brows
- **~50 Services** across all categories with mixed pricing types

Currency is **Ghana Cedis (GH₵)**.

---

## Configuration

### Backend (`application.yml`)

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGO_URI` | `mongodb://localhost:27017/sellis` | MongoDB connection string |
| `JWT_SECRET` | (built-in default) | Base64-encoded HMAC key (min 256 bits) |
| `ADMIN_EMAIL` | `admin@sellis.com` | Default admin email |
| `ADMIN_PASSWORD` | `Admin@123` | Default admin password |

### Frontend (`.env`)

| Variable | Description |
|----------|-------------|
| `VITE_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset name |

Image upload is optional. Services work without Cloudinary configured.

---

## Design

- Two-color palette: cream (`#f7f3ee`) and white (`#ffffff`)
- Black and grey for text and accents
- Mobile-first responsive layout (breakpoints at 600px, 900px, 1200px)
- Collapsible sidebar on all screen sizes
- Minimal borders, no shadows
