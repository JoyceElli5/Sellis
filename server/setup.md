# Sellis Server & Admin CMS Setup

## Prerequisites

- **Java 21+** installed and in PATH
- **Maven 3.9+** installed and in PATH
- **MongoDB 7+** installed
- **Node.js 18+** installed and in PATH

If Maven is not installed, download and extract it:

```powershell
# Download Maven 3.9.6
Invoke-WebRequest -Uri "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip" -OutFile "$env:USERPROFILE\maven.zip"
Expand-Archive "$env:USERPROFILE\maven.zip" -DestinationPath "$env:USERPROFILE\tools"
$env:Path = "$env:USERPROFILE\tools\apache-maven-3.9.6\bin;" + $env:Path
```

---

## Step 1: Start MongoDB

MongoDB must be running before the backend starts (the backend seeds default data on first run).

```powershell
# Create data directory if it doesn't exist
mkdir C:\data\db -Force

# Start MongoDB
& "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath C:\data\db
```

> Leave this terminal open. MongoDB runs in the foreground.

To verify MongoDB is running, open a **new terminal**:

```powershell
mongosh --eval "db.runCommand({ping:1})"
# Should output: { ok: 1 }
```

---

## Step 2: Start the Backend (Spring Boot API)

Open a **new terminal**:

```powershell
cd C:\Users\Administrator\Sellis\server
mvn spring-boot:run
```

Wait until you see output like:

```
Started SellisApplication in X.XX seconds
```

The API is now running at **http://localhost:8080**.

On the first run with a fresh database, it automatically seeds:
- 1 admin account
- 6 categories
- ~50 services

### Environment Variables (optional)

These have defaults in `application.yml`, so you only need to set them to override:

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGO_URI` | `mongodb://localhost:27017/sellis` | MongoDB connection string |
| `JWT_SECRET` | *(built-in)* | Base64-encoded HMAC key (min 256 bits) |
| `ADMIN_EMAIL` | `admin@sellis.com` | Default admin email |
| `ADMIN_PASSWORD` | `Admin@123` | Default admin password |

---

## Step 3: Start the Admin CMS (React + Vite)

Open a **new terminal**:

```powershell
cd C:\Users\Administrator\Sellis\server\client

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

The CMS is now running at **http://localhost:3000**.

It proxies all `/api` requests to the backend at `localhost:8080`.

### Cloudinary (optional)

For image uploads, create a `.env` file:

```powershell
cp .env.example .env
```

Edit `.env` with your Cloudinary cloud name and upload preset. Image upload works without this — services just won't have images.

---

## Step 4: Log In

Open **http://localhost:3000** in your browser.

- **Email:** `admin@sellis.com`
- **Password:** `Admin@123`

---

## Startup Order (Important)

Always start services in this order:

1. **MongoDB** — must be running before the backend starts
2. **Backend** — connects to MongoDB and seeds data on first run
3. **CMS** — connects to the backend via proxy

If the backend starts before MongoDB is ready, the database won't be seeded and login will fail. If this happens, stop the backend, make sure MongoDB is running, and start the backend again.

---

## Stopping Services

- **CMS:** `Ctrl+C` in its terminal
- **Backend:** `Ctrl+C` in its terminal
- **MongoDB:** `Ctrl+C` in its terminal

---

## Troubleshooting

### `mvn` is not recognized
Maven is not in your PATH. Either install it or add it manually:
```powershell
$env:Path = "C:\Users\Administrator\tools\apache-maven-3.9.6\bin;" + $env:Path
```

### Login fails with "Invalid email or password"
MongoDB was not running when the backend started, so the admin account was not seeded. Fix:
1. Make sure MongoDB is running
2. Restart the backend (`Ctrl+C`, then `mvn spring-boot:run`)

### Port already in use
Kill the process using the port:
```powershell
netstat -ano | findstr :8080
taskkill /F /PID <PID>
```
