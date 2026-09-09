# SmartAttend Admin Web

SmartAttend Admin Web is the institutional administration portal for the SmartAttend Student Attendance System. It provides university administrators with a clean, responsive console to manage student accounts, faculty profiles, academic structures, timetables, system roles, and attendance analytics.

## Current Status

- **Frontend:** Fully implemented with 15 complete administrative screens and interactive mock data.
- **Backend:** Integration is currently not connected (frontend-only mock state).

## Completed

- **15 Admin Web Pages:** Fully implemented and interactive.
- **Responsive UI:** Desktop, tablet, and mobile layouts with collapsible navigation.
- **Admin Dashboard:** Real-time summary overview and quick action shortcuts.
- **Student Management:** Directory filters, search, and student account setup (manual & bulk Excel/CSV import).
- **Faculty Management:** Directory search, department filtering, and faculty profile management.
- **Student Profile & Device Management:** Comprehensive student profile views and authorized admin device replacement UI.
- **Bulk Academic Update:** Batch section/year/semester updates with change preview and confirmation modals.
- **Academic Master:** Department, subject, section, and room master record management.
- **Timetable Management:** Spreadsheet import, draft review, schedule editing, and timetable publishing workflow.
- **System Users & Roles:** User management table, role assignments (Super Admin, Admin, Viewer), and status toggling.
- **Audit Logs:** Activity logs tracking administrative system events with timestamps.
- **System Settings:** 8 setting categories covering institution, academic, security, and notification configurations.
- **Reports & Analytics:** Analytics overview dashboard with tabbed insights and report export simulation.
- **Navigation & Routing:** Complete App Router navigation hierarchy with zero 404 links.
- **Validation:** Strict TypeScript checking and production build validation (`npm run build`) passing clean.

## Technologies Used

- **Next.js** — Web framework (v16.3.3 App Router)
- **React** — UI library (v19.2.4)
- **TypeScript** — Development language (v5.7.3)
- **Tailwind CSS** — Styling (v4.3.3)
- **shadcn/ui** — UI components
- **Lucide React** — Icons (v1.16.0)
- **npm** — Package management
- **Git + GitHub** — Version control

## Planned / Next Phase

- **Node.js + TypeScript** — Backend
- **REST API + HTTPS** — Web ↔ Backend communication
- **JWT** — Authentication
- **PostgreSQL** — Main database
- **Prisma/ORM** — Database access layer
- **BLE** — Attendance communication in the overall system
- **Vercel** — Admin Web deployment

## Local Installation & Setup

Follow these exact steps to clone, install, and run the SmartAttend Admin Web project locally on your machine:

### Prerequisites
Make sure you have Node.js (v18.0.0 or higher) and `npm` installed.

### 1. Clone the Repository
```bash
git clone https://github.com/Tejasdev-97/Website_SmartAttend.git
```

### 2. Navigate to Project Directory
```bash
cd Website_SmartAttend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the Admin Web Console.

### 5. Build for Production (Optional)
To verify or run a production build locally:
```bash
npm run build
npm run start
```

## Architecture

```
Admin Web → Backend API → PostgreSQL
```

*Note: The Admin Web web application communicates exclusively with the Backend API and does NOT connect directly to the PostgreSQL database.*

## Repository

- **GitHub Repository:** [https://github.com/Tejasdev-97/Website_SmartAttend.git](https://github.com/Tejasdev-97/Website_SmartAttend.git)
