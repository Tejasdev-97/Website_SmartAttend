'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertCircle, AlertTriangle, ArrowLeft, BarChart3, Bell, BookOpen,
  Check, CheckCircle2, ChevronDown, ClipboardList, Clock, Download,
  FileSpreadsheet, FileText, GraduationCap, Info, LockKeyhole, Mail,
  Plus, Save, Search, Settings, Shield, ShieldCheck, SlidersHorizontal,
  Trash2, Upload, UserCog, UserRound, Users, X, Monitor,
} from 'lucide-react'
import {
  AdminContent, AdminShell, PageHeader, Panel,
  primaryButton, secondaryButton, StatusBadge,
} from './admin-shell'

// ── Shared helpers ────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F3A]/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl border border-[#D9E0E8] bg-white shadow-[0_20px_60px_rgb(11_31_58/0.18)]">
        <div className="flex items-center justify-between border-b border-[#D9E0E8] px-5 py-4">
          <h2 className="font-700 text-[#0B1F3A]">{title}</h2>
          <button aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-[#64748B] hover:bg-slate-50">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-[#0B1F3A] px-5 py-3.5 text-sm font-600 text-white shadow-[0_20px_60px_rgb(11_31_58/0.18)]">
      <CheckCircle2 className="size-4 text-emerald-400" />
      {message}
    </div>
  )
}

function Notice({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'orange' | 'green' }) {
  const styles = {
    blue:   'border-blue-100 bg-[#EAF3FF] text-[#1565D8]',
    orange: 'border-orange-100 bg-orange-50 text-orange-800',
    green:  'border-emerald-100 bg-emerald-50 text-emerald-800',
  }
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${styles[tone]}`}>
      <Info className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}

// ── Users & Roles ─────────────────────────────────────────────────────────────
const roles = [
  { id: 1, title: 'Super Admin', count: 2, perms: ['Full system access', 'User management', 'Academic master', 'Audit logs', 'Settings'], color: 'bg-[#EAF3FF] text-[#1565D8]' },
  { id: 2, title: 'Admin', count: 8, perms: ['Student management', 'Faculty management', 'Timetable management', 'Reports'], color: 'bg-violet-50 text-violet-700' },
  { id: 3, title: 'Faculty', count: 156, perms: ['View own timetable', 'Mark attendance', 'View reports'], color: 'bg-emerald-50 text-emerald-700' },
  { id: 4, title: 'Student', count: 2856, perms: ['View own timetable', 'View own attendance'], color: 'bg-orange-50 text-orange-700' },
]

const users = [
  ['Anita Kulkarni', 'anita@college.edu.in', 'Super Admin', 'Active'],
  ['Suresh Rao', 'suresh@college.edu.in', 'Admin', 'Active'],
  ['Preeti Sharma', 'preeti@college.edu.in', 'Admin', 'Active'],
  ['Rohit Sharma', 'rohit@college.edu.in', 'Faculty', 'Active'],
  ['Neha Joshi', 'neha@college.edu.in', 'Faculty', 'Inactive'],
]

export function UsersRolesPage() {
  const [modal, setModal] = useState(false)
  const [saved, setSaved] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = users.filter(u => u[0].toLowerCase().includes(query.toLowerCase()) || u[1].toLowerCase().includes(query.toLowerCase()))

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Users & Roles"
          description="Manage system users, role assignments and access permissions."
          actions={
            <button onClick={() => setModal(true)} className={primaryButton}>
              <Plus className="size-4" /> Create User
            </button>
          }
        />

        {/* Role cards */}
        <h2 className="mb-4 text-[15px] font-700 text-[#0B1F3A]">Roles Overview</h2>
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roles.map(role => (
            <Panel key={role.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className={`rounded-lg px-3 py-1.5 text-xs font-700 uppercase tracking-wide ${role.color}`}>
                  {role.title}
                </div>
                <span className="text-[26px] font-800 text-[#0B1F3A] leading-none">
                  {role.count.toLocaleString()}
                </span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {role.perms.map(p => (
                  <li key={p} className="flex items-center gap-2 text-[12.5px] text-[#374151]">
                    <Check className="size-3.5 text-emerald-600 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>

        {/* Users table */}
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or email"
              className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none placeholder:text-[#9CA3AF] focus:border-[#1565D8]"
            />
          </div>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none">
            <option>All Roles</option>
            {roles.map(r => <option key={r.id}>{r.title}</option>)}
          </select>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <Panel>
          <div className="px-5 py-4">
            <h2 className="text-base font-700 text-[#0B1F3A]">System Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                <tr>
                  {['User', 'Email', 'Role', 'Status', 'Actions'].map(h => (
                    <th key={h} className={`px-5 py-3 ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.map(u => (
                  <tr key={u[1]} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-[#EAF3FF] text-xs font-700 text-[#1565D8]">
                          {u[0].split(' ').map(x => x[0]).join('')}
                        </div>
                        <p className="font-600 text-[#0B1F3A]">{u[0]}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#374151]">{u[1]}</td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={u[2] === 'Super Admin' ? 'blue' : u[2] === 'Admin' ? 'navy' : u[2] === 'Faculty' ? 'green' : 'orange'}>
                        {u[2]}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={u[3] === 'Active' ? 'green' : 'red'}>{u[3]}</StatusBadge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setModal(true)} className={`${secondaryButton} h-8 px-3 text-xs`}>Edit</button>
                        <button className="h-8 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-600 text-red-600 hover:bg-red-100 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="mt-5">
          <Notice>Changes to roles and permissions are logged in the Audit Log for compliance.</Notice>
        </div>
      </AdminContent>

      {modal && (
        <Modal title="Create System User" onClose={() => setModal(false)}>
          <div className="space-y-4">
            {[['Full Name', 'text'], ['Email', 'email'], ['Mobile', 'text'], ['Temporary Password', 'password']].map(([label, type]) => (
              <label key={label} className="block">
                <span className="text-[13px] font-600 text-[#374151]">{label}</span>
                <input type={type} className="mt-1.5 h-11 w-full rounded-lg border border-[#D9E0E8] px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8]" />
              </label>
            ))}
            <label className="block">
              <span className="text-[13px] font-600 text-[#374151]">Role</span>
              <select className="mt-1.5 h-11 w-full rounded-lg border border-[#D9E0E8] px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8]">
                {roles.map(r => <option key={r.id}>{r.title}</option>)}
              </select>
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModal(false)} className={secondaryButton}>Cancel</button>
              <button onClick={() => { setModal(false); setSaved(true) }} className={primaryButton}>Create User</button>
            </div>
          </div>
        </Modal>
      )}
      {saved && <Toast message="User created successfully." />}
    </AdminShell>
  )
}

// ── Audit Logs ────────────────────────────────────────────────────────────────
const auditEntries = [
  { actor: 'Anita Kulkarni', role: 'Super Admin', action: 'Timetable Published', target: 'CSE Sem 5 · CSE 3A', time: '20 May 2024, 10:30 AM', type: 'publish' },
  { actor: 'Suresh Rao', role: 'Admin', action: 'Student Account Created', target: '01CS128 · Sakshi Gupta', time: '19 May 2024, 03:15 PM', type: 'create' },
  { actor: 'Anita Kulkarni', role: 'Super Admin', action: 'Role Changed', target: 'Preeti Sharma → Admin', time: '18 May 2024, 11:00 AM', type: 'update' },
  { actor: 'Preeti Sharma', role: 'Admin', action: 'Student Device Replaced', target: '01CS123 · Rahul Sharma', time: '17 May 2024, 02:45 PM', type: 'update' },
  { actor: 'Suresh Rao', role: 'Admin', action: 'Timetable Imported (Draft)', target: 'CSE Sem 6 Timetable', time: '16 May 2024, 09:00 AM', type: 'import' },
  { actor: 'Anita Kulkarni', role: 'Super Admin', action: 'User Deleted', target: 'Rahul Mehta · Admin', time: '15 May 2024, 05:30 PM', type: 'delete' },
]

const typeStyle: Record<string, string> = {
  publish: 'bg-[#EAF3FF] text-[#1565D8]',
  create:  'bg-emerald-50 text-emerald-700',
  update:  'bg-orange-50 text-orange-700',
  import:  'bg-violet-50 text-violet-700',
  delete:  'bg-red-50 text-red-700',
}

export function AuditLogsPage() {
  const [query, setQuery] = useState('')
  const filtered = auditEntries.filter(e =>
    [e.actor, e.action, e.target].join(' ').toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Audit Logs"
          description="System-wide activity history for compliance and security reviews."
          actions={
            <button className={secondaryButton}>
              <Download className="size-4" /> Export Logs
            </button>
          }
        />

        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search actions, actors or targets"
              className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none placeholder:text-[#9CA3AF] focus:border-[#1565D8]"
            />
          </div>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none">
            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Admin</option>
          </select>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none">
            <option>All Actions</option>
            <option>Timetable Published</option>
            <option>Student Account Created</option>
            <option>Role Changed</option>
          </select>
        </div>

        <Panel>
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-base font-700 text-[#0B1F3A]">Activity History</h2>
            <span className="text-xs text-[#64748B]">{filtered.length} entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                <tr>
                  {['Actor / Role', 'Action', 'Target', 'Timestamp', 'Type'].map(h => (
                    <th key={h} className="px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.map((entry, i) => (
                  <tr key={i} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-600 text-[#0B1F3A]">{entry.actor}</p>
                      <p className="mt-0.5 text-xs text-[#64748B]">{entry.role}</p>
                    </td>
                    <td className="px-5 py-4 font-600 text-[#374151]">{entry.action}</td>
                    <td className="px-5 py-4 text-[13px] text-[#64748B]">{entry.target}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-[13px] text-[#64748B]">{entry.time}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide ${typeStyle[entry.type]}`}>
                        {entry.type}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <ClipboardList className="mx-auto size-10 text-[#D9E0E8]" />
                      <p className="mt-3 font-600 text-[#0B1F3A]">No audit entries found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="mt-5">
          <Notice>Audit logs are read-only and retained for compliance purposes.</Notice>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ── Reports ───────────────────────────────────────────────────────────────────
const reportTypes = [
  { icon: GraduationCap, title: 'Student Attendance Report', desc: 'Consolidated attendance for all students', tone: 'blue' },
  { icon: BarChart3, title: 'Department-wise Attendance', desc: 'Attendance statistics by department', tone: 'green' },
  { icon: Users, title: 'Faculty Activity Report', desc: 'Faculty class delivery and timetable data', tone: 'purple' },
  { icon: SlidersHorizontal, title: 'Low Attendance Students', desc: 'Students with attendance below threshold', tone: 'orange' },
  { icon: FileText, title: 'Semester Summary Report', desc: 'Complete academic semester overview', tone: 'navy' },
  { icon: ClipboardList, title: 'Timetable Utilization Report', desc: 'Room and timetable slot usage data', tone: 'blue' },
]

export function ReportsPage() {
  const [downloaded, setDownloaded] = useState<string | null>(null)
  const toneClass: Record<string, string> = {
    blue:   'bg-[#EAF3FF] text-[#1565D8]',
    green:  'bg-emerald-50 text-emerald-700',
    purple: 'bg-violet-50 text-violet-700',
    orange: 'bg-orange-50 text-orange-700',
    navy:   'bg-[#F1F5F9] text-[#374151]',
  }

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader title="Reports & Analytics" description="Generate and download institutional attendance and activity reports." />

        {/* Filters */}
        <Panel className="mb-6">
          <div className="grid gap-4 p-5 md:grid-cols-4">
            {[
              ['Department', ['CSE', 'ECE', 'IT', 'ME']],
              ['Year', ['3rd Year', '2nd Year', '1st Year']],
              ['Semester', ['5', '4', '3']],
              ['Date Range', ['May 2024', 'Apr 2024']],
            ].map(([label, options]) => (
              <label key={label as string} className="block">
                <span className="text-[13px] font-600 text-[#374151]">{label as string}</span>
                <select className="mt-1.5 h-11 w-full rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8]">
                  {(options as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </label>
            ))}
          </div>
        </Panel>

        {/* Report cards */}
        <h2 className="mb-4 text-[15px] font-700 text-[#0B1F3A]">Available Reports</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportTypes.map(r => {
            const Icon = r.icon
            return (
              <Panel key={r.title} className="p-5 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${toneClass[r.tone]}`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-700 text-[#0B1F3A]">{r.title}</h3>
                    <p className="mt-0.5 text-xs text-[#64748B]">{r.desc}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setDownloaded(r.title)}
                    className={`${secondaryButton} flex-1 text-xs`}
                  >
                    <Download className="size-3.5" /> Download PDF
                  </button>
                  <button
                    onClick={() => setDownloaded(`${r.title} (Excel)`)}
                    className={`${secondaryButton} flex-1 text-xs`}
                  >
                    <FileSpreadsheet className="size-3.5" /> Download Excel
                  </button>
                </div>
              </Panel>
            )
          })}
        </div>

        {downloaded && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-[#0B1F3A] px-5 py-3.5 text-sm font-600 text-white shadow-[0_20px_60px_rgb(11_31_58/0.18)]">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Downloading: {downloaded}
          </div>
        )}
      </AdminContent>
    </AdminShell>
  )
}

// ── Settings ──────────────────────────────────────────────────────────────────
const settingsSections = [
  { icon: BookOpen, label: 'Academic Year', desc: 'Configure active academic year', value: '2024–25' },
  { icon: SlidersHorizontal, label: 'Attendance Threshold', desc: 'Minimum attendance % for alerts', value: '75%' },
  { icon: Bell, label: 'Notification Preferences', desc: 'Low-attendance and system alerts', value: 'Enabled' },
  { icon: LockKeyhole, label: 'Password Policy', desc: 'Complexity and rotation rules', value: 'Strong — 90 days' },
  { icon: Monitor, label: 'Session Timeout', desc: 'Automatic logout after inactivity', value: '30 minutes' },
  { icon: Shield, label: 'Two-Factor Authentication', desc: 'Admin account 2FA requirement', value: 'Disabled' },
]

export function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [theme, setTheme] = useState('Light')
  const [notif, setNotif] = useState(true)
  const [twofa, setTwofa] = useState(false)
  const [year, setYear] = useState('2024–25')
  const [threshold, setThreshold] = useState('75')

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader title="System Settings" description="Manage platform configuration for SmartAttend Admin Console." />

        <div className="grid gap-5 lg:grid-cols-3">
          {settingsSections.map(s => {
            const Icon = s.icon
            return (
              <Panel key={s.label} className="p-5 flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1565D8]">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-700 text-[#0B1F3A]">{s.label}</p>
                  <p className="text-xs text-[#64748B]">{s.desc}</p>
                  <p className="mt-2 text-xs font-700 text-[#1565D8]">{s.value}</p>
                </div>
              </Panel>
            )
          })}
        </div>

        <Panel title="Edit Settings" className="mt-6">
          <div className="grid gap-5 p-5 md:grid-cols-2">
            <label className="block">
              <span className="text-[13px] font-600 text-[#374151]">Academic Year</span>
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8]"
              >
                {['2023–24', '2024–25', '2025–26'].map(y => <option key={y}>{y}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="text-[13px] font-600 text-[#374151]">Attendance Threshold (%)</span>
              <input
                type="number"
                min={50} max={100}
                value={threshold}
                onChange={e => setThreshold(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8]"
              />
            </label>

            <label className="block">
              <span className="text-[13px] font-600 text-[#374151]">Theme</span>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8]"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </label>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 rounded-lg border border-[#D9E0E8] px-4 py-3">
                <div className="flex-1">
                  <p className="text-[13px] font-600 text-[#374151]">Notifications</p>
                  <p className="text-xs text-[#64748B]">Low-attendance and system alerts</p>
                </div>
                <button
                  type="button"
                  aria-label="Toggle notifications"
                  onClick={() => setNotif(!notif)}
                  className={`h-6 w-11 rounded-full transition-colors ${notif ? 'bg-[#1565D8]' : 'bg-[#D9E0E8]'}`}
                >
                  <div className={`size-5 rounded-full bg-white shadow transition-transform mx-0.5 ${notif ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </label>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 rounded-lg border border-[#D9E0E8] px-4 py-3">
                <div className="flex-1">
                  <p className="text-[13px] font-600 text-[#374151]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#64748B]">Require 2FA for admin accounts</p>
                </div>
                <button
                  type="button"
                  aria-label="Toggle 2FA"
                  onClick={() => setTwofa(!twofa)}
                  className={`h-6 w-11 rounded-full transition-colors ${twofa ? 'bg-[#1565D8]' : 'bg-[#D9E0E8]'}`}
                >
                  <div className={`size-5 rounded-full bg-white shadow transition-transform mx-0.5 ${twofa ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t border-[#D9E0E8] p-5">
            <button className={secondaryButton}>Reset to Defaults</button>
            <button onClick={() => setSaved(true)} className={primaryButton}>
              <Save className="size-4" /> Save Settings
            </button>
          </div>
        </Panel>

        <div className="mt-5">
          <Notice>Settings changes are logged in the Audit Log and may require admin approval.</Notice>
        </div>
      </AdminContent>

      {saved && <Toast message="Settings saved successfully." />}
    </AdminShell>
  )
}

// ── Timetable Publish ─────────────────────────────────────────────────────────
const publishCriteria = [
  { label: 'All Subjects Scheduled', met: true },
  { label: 'No Room Conflicts', met: true },
  { label: 'No Faculty Conflicts', met: true },
  { label: 'Timetable Reviewed', met: true },
  { label: 'Pending Approval', met: false },
]

const publishRows = [
  ['CSE', '5', 'CSE 3A', 'Draft', '20 May 2024'],
  ['CSE', '5', 'CSE 3B', 'Published', '15 May 2024'],
  ['ECE', '4', 'ECE 3A', 'Draft', '20 May 2024'],
  ['IT', '5', 'IT 3A', 'Published', '15 May 2024'],
]

export function TimetablePublishPage() {
  const [confirm, setConfirm] = useState(false)
  const [selected, setSelected] = useState('CSE 3A')
  const [done, setDone] = useState(false)
  const allMet = publishCriteria.filter(c => c.met).length >= 4

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Timetable Publish"
          description="Review, validate and publish approved timetable records."
          actions={
            <Link href="/admin/timetable" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back
            </Link>
          }
        />

        {/* Summary stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Total Sections', value: '24', icon: Users, tone: 'blue' },
            { label: 'Draft', value: '8', icon: ClipboardList, tone: 'orange' },
            { label: 'Published', value: '16', icon: CheckCircle2, tone: 'green' },
          ].map(item => {
            const Icon = item.icon
            return (
              <Panel key={item.label} className="p-5 flex items-center gap-4">
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                  item.tone === 'blue'   ? 'bg-[#EAF3FF] text-[#1565D8]' :
                  item.tone === 'orange' ? 'bg-orange-50 text-orange-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">{item.label}</p>
                  <p className="text-[28px] font-800 text-[#0B1F3A] leading-none">{item.value}</p>
                </div>
              </Panel>
            )
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* Status table */}
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <h2 className="font-700 text-[#0B1F3A]">Publish Status by Section</h2>
              <button
                onClick={() => { setSelected('CSE 3A'); setConfirm(true) }}
                className={primaryButton}
              >
                Publish Selected
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                  <tr>
                    {['Dept.', 'Sem.', 'Section', 'Status', 'Last Updated', 'Action'].map(h => (
                      <th key={h} className="px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {publishRows.map(row => (
                    <tr key={row[2]} className="hover:bg-[#F7F9FC] transition-colors">
                      <td className="px-4 py-3 font-600 text-[#0B1F3A]">{row[0]}</td>
                      <td className="px-4 py-3 text-[#374151]">{row[1]}</td>
                      <td className="px-4 py-3 text-[#374151]">{row[2]}</td>
                      <td className="px-4 py-3">
                        <StatusBadge tone={row[3] === 'Published' ? 'green' : 'orange'}>{row[3]}</StatusBadge>
                      </td>
                      <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{row[4]}</td>
                      <td className="px-4 py-3">
                        {row[3] !== 'Published' && (
                          <button
                            onClick={() => { setSelected(row[2]); setConfirm(true) }}
                            className={`${primaryButton} h-8 px-3 text-xs`}
                          >
                            Publish
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Checklist */}
          <div className="space-y-4">
            <Panel title="Publish Readiness Checklist">
              <div className="p-5 space-y-3">
                {publishCriteria.map(c => (
                  <div key={c.label} className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                    c.met ? 'border-emerald-100 bg-emerald-50' : 'border-orange-100 bg-orange-50'
                  }`}>
                    {c.met
                      ? <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      : <AlertTriangle className="size-4 text-orange-600 shrink-0" />}
                    <span className={`font-600 ${c.met ? 'text-emerald-800' : 'text-orange-800'}`}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
              {allMet && (
                <div className="mx-5 mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-700 text-emerald-800">
                    Timetable is ready to publish. One item pending approval.
                  </p>
                </div>
              )}
            </Panel>

            <Notice>
              Once published, students and faculty will see the updated timetable immediately in SmartAttend.
            </Notice>
          </div>
        </div>
      </AdminContent>

      {confirm && (
        <Modal title={`Publish Timetable — ${selected}?`} onClose={() => setConfirm(false)}>
          <p className="text-sm text-[#4B5563]">
            The timetable for <strong>{selected}</strong> will be published. Students and faculty will see the update immediately.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setConfirm(false)} className={secondaryButton}>Cancel</button>
            <button
              onClick={() => { setConfirm(false); setDone(true) }}
              className={primaryButton}
            >
              Publish Timetable
            </button>
          </div>
        </Modal>
      )}
      {done && <Toast message="Timetable published successfully." />}
    </AdminShell>
  )
}
