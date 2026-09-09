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

- **Next.js** (v16.3.3 - App Router)
- **React** (v19.2.4)
- **TypeScript** (v5.7.3)
- **Tailwind CSS** (v4.3.3)
- **shadcn/ui**
- **Lucide React** (v1.16.0)
- **npm**
- **Git / GitHub**

## Planned / Next Phase

- **Backend Integration:** Connecting the Admin Web frontend to the SmartAttend Node.js + TypeScript backend.
- **REST API Communication:** Secure HTTPS requests using API client abstractions.
- **PostgreSQL Database:** Storing persistent institutional data via backend services.
- **Authentication & Authorization:** JWT-based bearer authentication and role-based access control (RBAC).
- **Live Data:** Replacing mock arrays with dynamic backend API data.
- **BLE Attendance Integration:** Integrating native BLE beacon management within the broader SmartAttend ecosystem.
- **Deployment:** Production deployment to Vercel.

## Architecture

```
Admin Web → Backend API → PostgreSQL
```

*Note: The Admin Web web application communicates exclusively with the Backend API and does NOT connect directly to the PostgreSQL database.*

## Repository

- **GitHub Repository:** [https://github.com/Tejasdev-97/Website_SmartAttend.git](https://github.com/Tejasdev-97/Website_SmartAttend.git)
