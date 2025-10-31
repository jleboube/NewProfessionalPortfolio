# Animated Professional Portfolio

Modern portfolio website with animated frontend and content management admin panel.

## Features

- 🎨 Animated React frontend with Framer Motion
- 📱 Responsive design with mobile hamburger menu
- ⚙️ Admin panel for content management
- 🎓 Certifications display with logo support
- 📄 Resume download functionality
- 🌐 Multi-domain support
- 🖼️ Image upload and management
- ☁️ Optional Cloudflare Tunnel support

## Quick Start

### 1. Configure Environment

```bash
# Copy and edit environment file
cp .env.example .env
nano .env
```

**Required settings:**
- Update `DOMAIN_NAME` and `ADMIN_DOMAIN_NAME` with your domains
- Generate new `SESSION_SECRET`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- (Optional) Add `CLOUDFLARE_TUNNEL_TOKEN` if using Cloudflare Tunnels
- (Optional) Add additional domains to `ADDITIONAL_DOMAINS` (comma-separated)

### 2. Start Application

```bash
# Build and start containers
docker compose up -d --build

# Check status
docker compose ps

# View logs
docker compose logs -f
```

**Access:**
- Frontend: http://localhost:3005
- Admin Panel: http://localhost:6905

### 3. Manage Content

Visit admin panel and configure:
- Profile information
- Projects
- Resume/Experience
- Skills
- Services
- Certifications (with logos)
- Upload images

## File Storage

All uploads stored in `./uploads/` directory (bind mounted to containers).

**To add resume for download:**
1. Place PDF in `./uploads/your-resume.pdf`
2. In admin panel, set "Resume Download URL" to: `/uploads/your-resume.pdf`

## Multi-Domain Setup

To serve on multiple domains:

1. Update `.env`:
   ```bash
   ADDITIONAL_DOMAINS=https://domain2.com,https://domain3.com
   ```

2. Configure DNS to point all domains to your server

3. Restart: `docker compose down && docker compose up -d --build`

## Remote Deployment

### Transfer to Server

```bash
# From local machine
rsync -avz --exclude 'node_modules' --exclude '.git' \
  /path/to/AnimatedProfessionalPortfolio-v2 \
  user@server-ip:/path/to/destination/
```

### On Remote Server

```bash
ssh user@server-ip
cd /path/to/destination/AnimatedProfessionalPortfolio-v2

# Configure environment
cp .env.example .env
nano .env

# IMPORTANT: Generate new SESSION_SECRET for production
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Start containers
docker compose up -d --build
```

### Configure Domains

**Option 1: Cloudflare Tunnel (Recommended)**
1. Create tunnel at https://one.dash.cloudflare.com/
2. Configure routes:
   - `yourdomain.com` → `http://localhost:3005`
   - `admin-yourdomain.com` → `http://localhost:6905`
3. Add `CLOUDFLARE_TUNNEL_TOKEN` to `.env`

**Option 2: Direct DNS**
1. Add A records pointing to server IP
2. Configure firewall to allow ports 3005 and 6905
3. Optional: Set up reverse proxy (Nginx/Caddy)

## Common Commands

```bash
# Stop containers
docker compose down

# Restart specific service
docker compose restart admin
docker compose restart frontend

# Rebuild after changes
docker compose up -d --build

# View logs
docker compose logs -f
docker compose logs admin
docker compose logs frontend
```

## Project Structure

```
.
├── apps/
│   ├── admin/          # Express.js admin panel
│   │   ├── server.js   # API server
│   │   └── public/     # Admin UI
│   └── frontend/       # React frontend
│       └── src/
├── content/
│   └── data.json       # Portfolio content
├── uploads/            # User-uploaded files
├── docker-compose.yml
├── .env
└── README.md
```

## Troubleshooting

### CORS Errors
- Add your domain to `.env` (`DOMAIN_NAME` or `ADDITIONAL_DOMAINS`)
- Restart admin: `docker compose restart admin`

### Images Not Loading
- Verify files exist in `./uploads/`
- Check permissions: `chmod 644 uploads/*`

### Can't Access Admin Panel
- Verify port 6905 is accessible
- Check admin logs: `docker compose logs admin`
- Ensure `SESSION_SECRET` is set in `.env`

## Tech Stack

- **Frontend**: React 19, Vite, Framer Motion, React Router
- **Backend**: Express.js, Node.js
- **Deployment**: Docker, Docker Compose, Nginx

## License

Private portfolio project
