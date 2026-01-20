# Admin CMS Plan: Project Management for Non-Tech Team

**Created:** January 19, 2026
**Status:** Planning
**Goal:** Allow non-technical team members to manage projects (add, edit, delete photos & metadata)

---

## Overview

Transform the static file-based project system into a dynamic CMS with:
- Super-admin authentication
- Web-based project management dashboard
- Photo upload/delete functionality
- Secure API endpoints

---

## Phase 1: Authentication

### 1.1 Super-Admin Login Page
- [ ] Create `/admin/login` route
- [ ] Simple email/password form
- [ ] Error handling for invalid credentials

### 1.2 Auth Backend

**Decision:** Simple password auth for 1-2 super admins

| Approach | Details |
|----------|---------|
| **Storage** | Admin credentials in environment variables |
| **Method** | Hashed password comparison |
| **Session** | JWT stored in httpOnly cookie |
| **Library** | NextAuth.js Credentials provider (or lightweight custom) |

### 1.3 Session Management
- [ ] JWT or session cookie
- [ ] Remember me option
- [ ] Session expiry (e.g., 7 days)

---

## Phase 2: Admin Dashboard

### 2.1 Dashboard Layout (`/admin`)
- [ ] Protected route (redirect to login if not authenticated)
- [ ] Navigation sidebar
- [ ] Project list view

### 2.2 Project List View
- [ ] Grid/table of all projects
- [ ] Thumbnail preview
- [ ] Quick stats (photo count)
- [ ] Search/filter

### 2.3 Project Editor (`/admin/projects/[slug]`)

| Feature | Description |
|---------|-------------|
| **Edit metadata** | Title, address, summary, description, notes |
| **View photos** | Gallery grid with thumbnails |
| **Reorder photos** | Drag-and-drop to change order |
| **Delete photos** | Remove individual photos |
| **Upload photos** | Add new photos with preview |
| **Delete project** | Remove entire project (with confirmation) |

### 2.4 Add New Project (`/admin/projects/new`)
- [ ] Form for metadata
- [ ] Multi-photo uploader
- [ ] Auto-generate slug from title
- [ ] Preview before save

---

## Phase 3: Backend API

### 3.1 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/auth/login` | POST | Authenticate admin |
| `POST /api/auth/logout` | POST | End session |
| `GET /api/projects` | GET | List all projects |
| `GET /api/projects/[slug]` | GET | Get single project |
| `POST /api/projects` | POST | Create new project |
| `PUT /api/projects/[slug]` | PUT | Update project metadata |
| `DELETE /api/projects/[slug]` | DELETE | Delete project |
| `POST /api/projects/[slug]/photos` | POST | Upload photos |
| `DELETE /api/projects/[slug]/photos/[id]` | DELETE | Delete photo |
| `PUT /api/projects/[slug]/photos/reorder` | PUT | Reorder photos |

### 3.2 Data Storage Migration

**Current:** Static files in `/public/images/projects/` + JSON metadata

**Decision:** AWS S3

| Phase | Storage | Notes |
|-------|---------|-------|
| **Phase 1 (MVP)** | Keep GitHub/local | Get UI working first |
| **Phase 2 (M4)** | Migrate to AWS S3 | Talk to Jason about setup |

**S3 Setup Needed:**
- [ ] S3 bucket for project images
- [ ] IAM credentials for app
- [ ] CloudFront CDN (optional, for performance)
- [ ] CORS configuration

### 3.3 Database for Metadata

**Options:**

| Option | Pros | Cons |
|--------|------|------|
| **Vercel Postgres** | Built-in, works with Vercel | Vercel-specific |
| **Supabase** | Free tier, realtime | External service |
| **PlanetScale** | MySQL, scalable | Paid beyond free tier |
| **JSON file + Git** | Simple, version controlled | Not scalable, needs deploy |

**Recommendation:** Vercel Postgres or Supabase for proper database

---

## Phase 4: Security & Guardrails

### 4.1 Authentication Guards
- [ ] Middleware to protect `/admin/*` routes
- [ ] Middleware to protect `/api/*` admin endpoints
- [ ] CSRF protection

### 4.2 Input Validation
- [ ] Validate file types (only images: jpg, png, webp, avif)
- [ ] Max file size limit (e.g., 10MB per image)
- [ ] Max photos per project (12)
- [ ] Sanitize text inputs (prevent XSS)

### 4.3 Rate Limiting
- [ ] Limit login attempts (prevent brute force)
- [ ] Limit upload requests

### 4.4 Audit Logging
- [ ] Log admin actions (who did what, when)
- [ ] Track changes to projects

### 4.5 Backup & Recovery
- [ ] Regular backups of images and database
- [ ] Soft delete (recoverable for 30 days)

---

## Phase 5: Image Processing

### 5.1 Upload Pipeline
1. User uploads image (any format)
2. Server validates file type and size
3. Convert to AVIF (for consistency)
4. Generate thumbnail for admin preview
5. Store in cloud storage
6. Update database with image URL

### 5.2 Image Optimization
- [ ] Auto-convert to AVIF
- [ ] Generate multiple sizes (thumbnail, medium, full)
- [ ] Strip EXIF data (privacy)

---

## Implementation Order

### MVP (Minimum Viable Product)
1. **Auth:** Simple login with hardcoded admin credentials (env vars)
2. **Dashboard:** Basic project list
3. **Edit:** Metadata editing only
4. **Photos:** Upload and delete (no reorder)
5. **Storage:** Vercel Blob for images

### V2 Enhancements
- Photo reorder (drag-and-drop)
- Multiple admin users
- Audit logging
- Soft delete / trash

### V3 Future
- Role-based access (viewer, editor, admin)
- Approval workflow
- Version history

---

## Technical Decisions Made

| Decision | Choice | Notes |
|----------|--------|-------|
| **Hosting** | AWS Amplify (already in use) | API routes supported |
| **Auth** | Simple password + JWT | 1-2 admins via env vars |
| **Image storage** | AWS S3 | Same AWS account |
| **Database** | DynamoDB or RDS | Keep in AWS ecosystem |

**Goal:** Enable team to manage projects independently without relying on Ling.

---

## Estimated Effort

| Phase | Complexity |
|-------|------------|
| Phase 1: Auth | Medium |
| Phase 2: Dashboard UI | Medium |
| Phase 3: API Backend | High |
| Phase 4: Security | Medium |
| Phase 5: Image Processing | Medium |

**MVP Total:** Significant effort — this is a full CMS feature

---

## Decisions (January 19, 2026)

| Question | Decision |
|----------|----------|
| **Admin users** | 1-2 super admins with password/secret |
| **Approval workflow** | Instant publish (with guardrails) |
| **Image storage** | GitHub now → AWS S3 later |
| **Timeline** | **Before May 4, 2026** (HD Expo is May 5-7) |

---

## Timeline to May 4

| Milestone | Target | Tasks |
|-----------|--------|-------|
| **M1: Auth + Basic UI** | Feb 15 | Login page, protected routes, project list view |
| **M2: Edit Metadata** | Mar 1 | Edit project name/address/description, save to DB |
| **M3: Photo Management** | Mar 20 | Upload photos, delete photos, view gallery |
| **M4: AWS S3 Integration** | Apr 5 | Move image storage from Git to S3 |
| **M5: Polish + Testing** | Apr 20 | Bug fixes, guardrails, testing with team |
| **M6: Ready** | May 1 | Final review, handoff to team |

---

## Next Steps

1. [x] Review this plan
2. [x] Decide on auth approach → Simple password (1-2 admins)
3. [x] Decide on image storage → AWS S3
4. [x] Hosting → Already on AWS Amplify
5. [ ] Talk to Jason about S3 bucket setup
6. [ ] Begin Phase 1 implementation (Auth + Admin UI)

---

**Document Status:** Approved — Ready for implementation
