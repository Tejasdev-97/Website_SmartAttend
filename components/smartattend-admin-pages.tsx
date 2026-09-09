'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft, BarChart3, Bell, BookOpen, Check, CheckCircle2,
  ClipboardList, Download, Edit3, FileText, GraduationCap,
  Info, LockKeyhole, Monitor, Plus, RefreshCcw, Save,
  Search, Shield, SlidersHorizontal, Trash2, TrendingUp, Users, X,
} from 'lucide-react'
import {
  AdminContent, AdminShell, C, PageHeader, Panel,
  primaryButton, secondaryButton, StatusBadge,
} from './admin-shell'

// ─── Shared helpers ───────────────────────────────────────────────────────────
function Modal({ title, subtitle, children, onClose }: {
  title: string; subtitle?: string; children: React.ReactNode; onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(7,27,73,0.30)' }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-white" style={{ border: `1px solid ${C.border}`, boxShadow: '0 20px 60px rgba(7,27,73,0.16)' }}>
        <div className="flex items-start justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div>
            <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px]" style={{ color: C.textTertiary }}>{subtitle}</p>}
          </div>
          <button aria-label="Close" onClick={onClose} className="ml-4 rounded-lg p-1.5 hover:bg-[#F5F9FF]" style={{ color: C.textTertiary }}>
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
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-[13.5px] font-semibold shadow-[0_20px_60px_rgba(7,27,73,0.18)]" style={{ background: C.green, color: C.white }}>
      <CheckCircle2 className="size-4" />
      {message}
    </div>
  )
}

function Inp({ label, type = 'text', placeholder, required }: {
  label: string; type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>
        {label}{required && <span className="ml-0.5" style={{ color: C.red }}>*</span>}
      </span>
      <input type={type} placeholder={placeholder}
        className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none transition-all"
        style={{ borderColor: C.border, color: C.textPrimary }}
        onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
        onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
      />
    </label>
  )
}

// ─── System Users & Roles ─────────────────────────────────────────────────────
const roles = [
  { title: 'Super Admin', count: 2,    color: C.blue,   bg: C.blueLight,   perms: ['Full system access','User management','Audit logs','Settings'] },
  { title: 'Admin',       count: 8,    color: C.purple, bg: C.purpleLight, perms: ['Student management','Faculty management','Timetable','Reports'] },
  { title: 'Faculty',     count: 156,  color: C.green,  bg: C.greenLight,  perms: ['View own timetable','Mark attendance','View reports'] },
  { title: 'Student',     count: 2856, color: C.orange, bg: C.orangeLight, perms: ['View own timetable','View own attendance'] },
]

const users = [
  { name: 'Anita Kulkarni', email: 'anita@college.edu.in',  role: 'Super Admin', dept: 'Administration', status: 'Active'   },
  { name: 'Suresh Rao',     email: 'suresh@college.edu.in', role: 'Admin',       dept: 'Administration', status: 'Active'   },
  { name: 'Preeti Sharma',  email: 'preeti@college.edu.in', role: 'Admin',       dept: 'Administration', status: 'Active'   },
  { name: 'Rohit Sharma',   email: 'rohit@college.edu.in',  role: 'Faculty',     dept: 'CSE',            status: 'Active'   },
  { name: 'Neha Joshi',     email: 'neha@college.edu.in',   role: 'Faculty',     dept: 'CSE',            status: 'Inactive' },
]

const roleTone: Record<string, 'blue' | 'purple' | 'green' | 'orange'> = {
  'Super Admin': 'blue', 'Admin': 'purple', 'Faculty': 'green', 'Student': 'orange'
}

export function UsersRolesPage() {
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = users.filter(u =>
    (u.name + u.email).toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="System Users & Roles"
          description="Manage admin users, assign roles and control access permissions."
          actions={
            <button onClick={() => setModal(true)} className={primaryButton}>
              <Plus className="size-4" /> Add User
            </button>
          }
        />

        {/* Role overview */}
        <h2 className="mb-4 text-[14px] font-semibold" style={{ color: C.navy }}>Roles Overview</h2>
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roles.map(role => (
            <Panel key={role.title} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span
                  className="rounded-lg px-2.5 py-1 text-[12px] font-semibold"
                  style={{ background: role.bg, color: role.color }}
                >
                  {role.title}
                </span>
                <span className="text-[28px] font-bold leading-none" style={{ color: C.navy }}>
                  {role.count.toLocaleString()}
                </span>
              </div>
              <div className="space-y-1.5">
                {role.perms.map(p => (
                  <div key={p} className="flex items-center gap-2 text-[12.5px]" style={{ color: C.textSecondary }}>
                    <Check className="size-3.5 shrink-0" style={{ color: C.green }} />
                    {p}
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl p-4" style={{ background: C.white, border: `1px solid ${C.border}` }}>
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2" style={{ color: C.textTertiary }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or email"
              className="h-10 w-full rounded-lg border pl-10 pr-4 text-[13.5px] outline-none"
              style={{ borderColor: C.border, color: C.textPrimary }}
              onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
              onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
            />
          </div>
          <select className="h-10 rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
            <option value="">All Roles</option>
            {roles.map(r => <option key={r.title}>{r.title}</option>)}
          </select>
          <select className="h-10 rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button onClick={() => setQuery('')} className={secondaryButton}>Reset</button>
        </div>

        <Panel>
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>System Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                <tr>
                  {['#','Name','Email','Role','Department','Status','Actions'].map((h, i) => (
                    <th key={h} className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: C.navy, textAlign: i === 6 ? 'right' : 'left' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.email} style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                    <td className="px-5 py-[14px]">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: C.blue }}>
                          {u.name.split(' ').map(x => x[0]).join('').slice(0,2)}
                        </div>
                        <span className="text-[13.5px] font-medium" style={{ color: C.navy }}>{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{u.email}</td>
                    <td className="px-5 py-[14px]">
                      <StatusBadge tone={roleTone[u.role] ?? 'navy'}>{u.role}</StatusBadge>
                    </td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{u.dept}</td>
                    <td className="px-5 py-[14px]">
                      <StatusBadge tone={u.status === 'Active' ? 'green' : 'red'}>{u.status}</StatusBadge>
                    </td>
                    <td className="px-5 py-[14px] text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setModal(true)} className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-medium hover:bg-[#EAF3FF]" style={{ borderColor: C.border, color: C.blue }}>
                          <Edit3 className="size-3.5" /> Edit
                        </button>
                        <button onClick={() => setToast(true)} className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-medium hover:bg-red-50" style={{ borderColor: '#FECACA', color: C.red }}>
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </AdminContent>

      {modal && (
        <Modal title="Create System User" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <Inp label="Full Name"           required placeholder="e.g. Dr. Rajesh Kumar" />
            <Inp label="Email"       type="email" required placeholder="user@college.edu.in" />
            <Inp label="Mobile"              placeholder="+91 98765 43210" />
            <Inp label="Temporary Password" type="password" required />
            <label className="block">
              <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>
                Role<span style={{ color: C.red }}>*</span>
              </span>
              <select className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
                {roles.map(r => <option key={r.title}>{r.title}</option>)}
              </select>
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModal(false)} className={secondaryButton}>Cancel</button>
              <button onClick={() => { setModal(false); setToast(true) }} className={primaryButton}>Create User</button>
            </div>
          </div>
        </Modal>
      )}
      {toast && <Toast message="User created successfully." />}
    </AdminShell>
  )
}

// ─── Audit Logs ───────────────────────────────────────────────────────────────
const auditLogs = [
  { dt: '20 May 2024 · 10:30 AM', user: 'Anita Kulkarni', action: 'Timetable Published',       module: 'Timetable', details: 'CSE Sem 5 · CSE 3A',     ip: '192.168.1.10' },
  { dt: '19 May 2024 · 03:15 PM', user: 'Suresh Rao',     action: 'Student Account Created',   module: 'Students',  details: '01CS128 · Sakshi Gupta', ip: '192.168.1.22' },
  { dt: '18 May 2024 · 11:00 AM', user: 'Anita Kulkarni', action: 'Role Changed',              module: 'Users',     details: 'Preeti Sharma → Admin',   ip: '192.168.1.10' },
  { dt: '17 May 2024 · 02:45 PM', user: 'Preeti Sharma',  action: 'Device Replaced',           module: 'Students',  details: '01CS123 · Rahul Sharma',  ip: '192.168.1.31' },
  { dt: '16 May 2024 · 09:00 AM', user: 'Suresh Rao',     action: 'Timetable Imported (Draft)',module: 'Timetable', details: 'CSE Sem 6 file',           ip: '192.168.1.22' },
  { dt: '15 May 2024 · 05:30 PM', user: 'Anita Kulkarni', action: 'User Deleted',              module: 'Users',     details: 'Rahul Mehta · Admin',     ip: '192.168.1.10' },
  { dt: '14 May 2024 · 08:15 AM', user: 'Suresh Rao',     action: 'Bulk Academic Update',      module: 'Students',  details: '68 students · CSE 2nd Yr', ip: '192.168.1.22' },
  { dt: '13 May 2024 · 10:00 AM', user: 'Anita Kulkarni', action: 'Login Failed',              module: 'Auth',      details: 'Failed attempt #1',       ip: '203.0.113.45' },
]

const actionTone: Record<string, 'blue' | 'green' | 'orange' | 'red' | 'purple'> = {
  'Timetable':  'blue',
  'Students':   'green',
  'Users':      'orange',
  'Auth':       'red',
}

export function AuditLogsPage() {
  const [query, setQuery]           = useState('')
  const [activePage, setActivePage] = useState(1)
  const [toast, setToast]           = useState(false)

  const filtered = auditLogs.filter(e =>
    [e.action, e.user, e.module, e.details].join(' ').toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Audit Logs"
          description="Track all important activities performed in the system."
          actions={
            <button onClick={() => setToast(true)} className={secondaryButton}>
              <Download className="size-4" /> Export Logs
            </button>
          }
        />

        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl p-4" style={{ background: C.white, border: `1px solid ${C.border}` }}>
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2" style={{ color: C.textTertiary }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by action, user or module"
              className="h-10 w-full rounded-lg border pl-10 pr-4 text-[13.5px] outline-none"
              style={{ borderColor: C.border, color: C.textPrimary }}
              onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
              onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
            />
          </div>
          <select className="h-10 rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
            <option value="">All Actions</option>
            <option>Timetable Published</option>
            <option>Student Account Created</option>
            <option>Role Changed</option>
            <option>Login Failed</option>
          </select>
          <select className="h-10 rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
            <option value="">All Users</option>
            {['Anita Kulkarni','Suresh Rao','Preeti Sharma'].map(u => <option key={u}>{u}</option>)}
          </select>
          <input type="date" className="h-10 rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }} />
          <button onClick={() => setQuery('')} className={secondaryButton}>Reset</button>
        </div>

        <Panel>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>Activity History</h2>
            <span className="text-[13px] font-medium" style={{ color: C.textSecondary }}>
              {filtered.length} entries found
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                <tr>
                  {['#','Date & Time','User','Action','Module','Details','IP Address'].map(h => (
                    <th key={h} className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: C.navy }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={e2 => (e2.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                    onMouseLeave={e2 => (e2.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td className="px-5 py-[13px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                    <td className="px-5 py-[13px] whitespace-nowrap text-[13px]" style={{ color: C.textSecondary }}>{e.dt}</td>
                    <td className="px-5 py-[13px] text-[13.5px] font-medium" style={{ color: C.navy }}>{e.user}</td>
                    <td className="px-5 py-[13px] text-[13.5px] font-medium" style={{ color: C.navy }}>{e.action}</td>
                    <td className="px-5 py-[13px]">
                      <StatusBadge tone={actionTone[e.module] ?? 'navy'}>{e.module}</StatusBadge>
                    </td>
                    <td className="px-5 py-[13px] text-[13px]" style={{ color: C.textSecondary }}>{e.details}</td>
                    <td className="px-5 py-[13px] text-[13px] font-mono" style={{ color: C.textTertiary }}>{e.ip}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <ClipboardList className="mx-auto size-10 mb-3" style={{ color: C.border }} />
                      <p className="font-semibold" style={{ color: C.navy }}>No audit entries found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[13px]" style={{ color: C.textSecondary }}>
              Showing <span className="font-semibold" style={{ color: C.navy }}>{filtered.length}</span> of <span className="font-semibold" style={{ color: C.navy }}>248</span> entries
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePage(p)}
                  className="flex size-8 items-center justify-center rounded-lg text-[13px] font-medium"
                  style={activePage === p ? { background: C.blue, color: C.white } : { color: C.textSecondary }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Panel>
        {toast && <Toast message="Audit logs exported successfully." />}
      </AdminContent>
    </AdminShell>
  )
}

// ─── Reports & Analytics ──────────────────────────────────────────────────────
const reportTypes = [
  { icon: GraduationCap,    title: 'Attendance Report',        desc: 'Daily / Monthly attendance report',      color: C.blue,   bg: C.blueLight   },
  { icon: Users,            title: 'Student List Report',      desc: 'By department, year, section',           color: C.green,  bg: C.greenLight  },
  { icon: BarChart3,        title: 'Subject-wise Attendance',  desc: 'Attendance by subject / class',          color: C.purple, bg: C.purpleLight },
  { icon: ClipboardList,    title: 'Timetable Report',         desc: 'Class timetable summary',                color: C.orange, bg: C.orangeLight },
  { icon: SlidersHorizontal,title: 'Inactive Students Report', desc: 'Students with low attendance',           color: C.red,    bg: C.redLight    },
]

const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep']
const attendance = [68, 72, 76, 80, 82]

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [toast, setToast] = useState<string | null>(null)
  const tabs = ['Overview', 'Attendance', 'Academics', 'Users']

  const maxVal = Math.max(...attendance)

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Reports & Analytics"
          description="Gain insights into attendance, academics and system usage."
          actions={
            <>
              <input type="date" className="h-10 rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }} />
              <button onClick={() => setToast('Full Attendance & Academic Reports Package (ZIP)')} className={primaryButton}>
                <Download className="size-4" /> Export Reports
              </button>
            </>
          }
        />

        {/* Tabs */}
        <div className="mb-6 flex rounded-xl bg-white p-1 w-fit" style={{ border: `1px solid ${C.border}` }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="rounded-lg px-5 py-2 text-[13.5px] font-medium transition-all"
              style={
                activeTab === tab
                  ? { background: C.blue, color: C.white, fontWeight: 600 }
                  : { color: C.textSecondary }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Students',  value: '2,856', icon: GraduationCap,     color: C.blue   },
            { label: 'Total Faculty',   value: '156',   icon: Users,             color: C.green  },
            { label: 'Total Classes',   value: '128',   icon: ClipboardList,     color: C.purple },
            { label: 'Avg. Attendance', value: '82%',   icon: SlidersHorizontal, color: C.orange },
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-xl p-5" style={{ background: C.white, border: `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(7,27,73,0.05)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[12.5px] font-medium" style={{ color: C.textSecondary }}>{item.label}</p>
                    <p className="mt-2 text-[32px] font-bold leading-none" style={{ color: C.navy }}>{item.value}</p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: C.blueLight }}>
                    <Icon className="size-5" style={{ color: item.color }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Popular reports */}
          <Panel title="Popular Reports">
            <div className="divide-y" style={{ borderColor: C.border }}>
              {reportTypes.map(r => {
                const Icon = r.icon
                return (
                  <div key={r.title} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ background: r.bg }}>
                      <Icon className="size-5" style={{ color: r.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold" style={{ color: C.navy }}>{r.title}</p>
                      <p className="mt-0.5 text-[12.5px]" style={{ color: C.textSecondary }}>{r.desc}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button onClick={() => setToast(`${r.title} (PDF)`)} className={`${secondaryButton} h-8 px-3 text-[12px]`}>
                        <FileText className="size-3.5" /> PDF
                      </button>
                      <button onClick={() => setToast(`${r.title} (Excel)`)} className={`${secondaryButton} h-8 px-3 text-[12px]`}>
                        <Download className="size-3.5" /> Excel
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>

          {/* Attendance trend */}
          <div className="space-y-4">
            <Panel title="Attendance Trend">
              <div className="p-5">
                <p className="text-[12.5px] font-medium mb-4" style={{ color: C.textTertiary }}>
                  Monthly Attendance (%)
                </p>
                {/* Simple bar chart */}
                <div className="flex items-end gap-2 h-32">
                  {attendance.map((val, i) => (
                    <div key={months[i]} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[11px] font-semibold" style={{ color: C.navy }}>{val}%</span>
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{
                          height: `${(val / maxVal) * 80}%`,
                          background: i === attendance.length - 1 ? C.blue : C.blueLight,
                          minHeight: '8px',
                        }}
                      />
                      <span className="text-[11px]" style={{ color: C.textTertiary }}>{months[i]}</span>
                    </div>
                  ))}
                </div>
                {/* Trend icon */}
                <div className="mt-4 flex items-center gap-2 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
                  <TrendingUp className="size-4" style={{ color: C.green }} />
                  <span className="text-[12.5px] font-medium" style={{ color: C.green }}>+14% improvement over 5 months</span>
                </div>
              </div>
            </Panel>

            <Panel title="Attendance Highlights">
              <div className="divide-y p-5 space-y-3" style={{ borderColor: C.border }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12.5px] font-medium" style={{ color: C.textSecondary }}>Highest Attendance</p>
                    <p className="text-[13.5px] font-semibold" style={{ color: C.navy }}>Mathematics — CSE 3A</p>
                  </div>
                  <span className="text-[22px] font-bold" style={{ color: C.green }}>92%</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="text-[12.5px] font-medium" style={{ color: C.textSecondary }}>Lowest Attendance</p>
                    <p className="text-[13.5px] font-semibold" style={{ color: C.navy }}>OS Lab — CSE 3B</p>
                  </div>
                  <span className="text-[22px] font-bold" style={{ color: C.red }}>68%</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-[13.5px] font-semibold shadow-[0_20px_60px_rgba(7,27,73,0.18)]" style={{ background: C.green, color: C.white }}>
            <CheckCircle2 className="size-4" />
            Downloading: {toast}
          </div>
        )}
      </AdminContent>
    </AdminShell>
  )
}

// ─── System Settings ──────────────────────────────────────────────────────────
const settingsSidebar = [
  { key: 'institution', label: 'Institution Information', icon: BookOpen },
  { key: 'academic',    label: 'Academic Settings',       icon: GraduationCap },
  { key: 'attendance',  label: 'Attendance Settings',     icon: SlidersHorizontal },
  { key: 'notification',label: 'Notification Settings',   icon: Bell },
  { key: 'security',    label: 'Security Settings',       icon: LockKeyhole },
  { key: 'backup',      label: 'Backup & Restore',        icon: RefreshCcw },
  { key: 'integration', label: 'Integration Settings',    icon: Monitor },
  { key: 'preferences', label: 'System Preferences',      icon: SlidersHorizontal },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('institution')
  const [saved, setSaved] = useState(false)
  const [notif, setNotif] = useState(true)
  const [twofa, setTwofa] = useState(false)
  const [threshold, setThreshold] = useState('75')

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="System Settings"
          description="Configure the system as per your institution's requirements."
        />

        <div className="flex gap-6">
          {/* Left sidebar */}
          <div
            className="w-56 shrink-0 rounded-xl bg-white self-start"
            style={{ border: `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(7,27,73,0.05)' }}
          >
            <div className="p-3 space-y-0.5">
              {settingsSidebar.map(item => {
                const active = activeSection === item.key
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-colors text-left"
                    style={{
                      background: active ? C.blueLight : 'transparent',
                      color:      active ? C.blue      : C.textSecondary,
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <Icon className="size-4 shrink-0" style={{ color: active ? C.blue : C.textTertiary }} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right main content */}
          <div className="flex-1 min-w-0 space-y-5">
            <Panel>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <h2 className="text-[16px] font-semibold" style={{ color: C.navy }}>
                    {settingsSidebar.find(s => s.key === activeSection)?.label || 'Institution Information'}
                  </h2>
                  <p className="mt-0.5 text-[13px]" style={{ color: C.textTertiary }}>Configure institutional preferences and parameters.</p>
                </div>
                <button onClick={() => setSaved(true)} className={primaryButton}>
                  <Save className="size-4" /> Save Changes
                </button>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1fr_200px]">
                <div className="space-y-4">
                  {([
                    ['College Name',    'ABC Engineering College',        'text'],
                    ['Address',        '123 Main Road, Bangalore - 560001','text'],
                    ['Contact Number', '+91 80 2345 6789',                'text'],
                    ['Email',          'admin@abc.edu.in',                'email'],
                    ['Website',        'www.abc.edu.in',                  'text'],
                  ] as [string,string,string][]).map(([label, val, type]) => (
                    <label key={label} className="block">
                      <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>{label}</span>
                      <input
                        type={type}
                        defaultValue={val}
                        className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none transition-all"
                        style={{ borderColor: C.border, color: C.textPrimary }}
                        onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
                        onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
                      />
                    </label>
                  ))}
                </div>

                {/* Logo */}
                <div className="flex flex-col items-center">
                  <p className="mb-3 text-[13px] font-medium" style={{ color: C.textSecondary }}>College Logo</p>
                  <div
                    className="flex size-28 items-center justify-center rounded-2xl"
                    style={{ background: C.blueLight, border: `1px solid ${C.border}` }}
                  >
                    <Shield className="size-12" style={{ color: C.blue }} />
                  </div>
                  <button onClick={() => setSaved(true)} className={`${secondaryButton} mt-3 w-full text-[12.5px]`}>
                    Change Logo
                  </button>
                </div>
              </div>
            </Panel>

            {/* Additional settings */}
            <Panel title="Quick Settings">
              <div className="grid gap-5 p-5 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>Academic Year</span>
                  <select className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
                    {['2023–24','2024–25','2025–26'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>Attendance Threshold (%)</span>
                  <input
                    type="number"
                    min={50} max={100}
                    value={threshold}
                    onChange={e => setThreshold(e.target.value)}
                    className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none"
                    style={{ borderColor: C.border, color: C.textPrimary }}
                  />
                </label>

                {/* Toggle: Notifications */}
                <div className="flex items-center justify-between rounded-xl p-4" style={{ border: `1px solid ${C.border}` }}>
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: C.navy }}>Notifications</p>
                    <p className="text-[12px]" style={{ color: C.textTertiary }}>Low-attendance alerts</p>
                  </div>
                  <button
                    onClick={() => setNotif(!notif)}
                    className="h-6 w-11 rounded-full transition-colors relative"
                    style={{ background: notif ? C.blue : C.border }}
                  >
                    <div
                      className="absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform"
                      style={{ left: '2px', transform: notif ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>

                {/* Toggle: 2FA */}
                <div className="flex items-center justify-between rounded-xl p-4" style={{ border: `1px solid ${C.border}` }}>
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: C.navy }}>Two-Factor Auth</p>
                    <p className="text-[12px]" style={{ color: C.textTertiary }}>Require 2FA for admins</p>
                  </div>
                  <button
                    onClick={() => setTwofa(!twofa)}
                    className="h-6 w-11 rounded-full transition-colors relative"
                    style={{ background: twofa ? C.blue : C.border }}
                  >
                    <div
                      className="absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform"
                      style={{ left: '2px', transform: twofa ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>
              </div>
            </Panel>

            {/* Info notice */}
            <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: C.blueLight, border: `1px solid #BFDBFE` }}>
              <Info className="mt-0.5 size-4 shrink-0" style={{ color: C.blue }} />
              <p className="text-[13px]" style={{ color: C.textSecondary }}>
                These details will be used across the system, including reports and communications.
              </p>
            </div>
          </div>
        </div>
      </AdminContent>
      {saved && <Toast message="Settings saved successfully." />}
    </AdminShell>
  )
}

// ─── Timetable Publish ────────────────────────────────────────────────────────
const publishRows = [
  { dept: 'CSE', sem: '5', section: 'CSE 3A', status: 'Draft',     date: '20 May 2024' },
  { dept: 'CSE', sem: '5', section: 'CSE 3B', status: 'Published', date: '15 May 2024' },
  { dept: 'ECE', sem: '4', section: 'ECE 3A', status: 'Draft',     date: '20 May 2024' },
  { dept: 'IT',  sem: '5', section: 'IT 3A',  status: 'Published', date: '15 May 2024' },
]

const timetableGrid = {
  times: ['09:00–10:00', '10:00–11:00', '11:15–12:15', '02:00–03:00', '03:00–04:00'],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  data: [
    ['Maths','DS','Physics','Maths','DS'],
    ['DS','OS','Maths','DSP','OS'],
    ['Physics','Maths','DS','OS','Physics'],
    ['Lab','Lab','DS','Maths','Lab'],
    ['OS','Physics','OS','DS','Maths'],
  ],
}

export function TimetablePublishPage() {
  const [confirm, setConfirm]   = useState<string | null>(null)
  const [done, setDone]         = useState(false)
  const [faculty, setFaculty]   = useState(true)
  const [students, setStudents] = useState(true)

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Publish Timetable"
          description="Make the timetable visible to faculty and students after verification."
          actions={
            <Link href="/admin/timetable" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left — Publish summary */}
          <div className="space-y-4">
            <Panel title="Publish Summary">
              <div className="p-5 space-y-3">
                {[
                  ['Academic Session', 'Aug 2025 – Dec 2025'],
                  ['Departments',      'CSE, ECE, ME, CE, IT, AE'],
                  ['Classes',          '96'],
                  ['Total Entries',    '1,248'],
                ].map(([l, v]) => (
                  <div key={l} className="flex items-start justify-between gap-2 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <span className="text-[13px]" style={{ color: C.textTertiary }}>{l}</span>
                    <span className="text-[13.5px] font-semibold text-right" style={{ color: C.navy }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-5 space-y-3">
                <p className="text-[13px] font-semibold" style={{ color: C.navy }}>Publish To</p>
                {[
                  { label: 'Faculty', sub: '156 faculty members will get access', checked: faculty, toggle: () => setFaculty(!faculty) },
                  { label: 'Students', sub: '2,856 students will get access',     checked: students, toggle: () => setStudents(!students) },
                ].map(item => (
                  <label key={item.label} className="flex items-center gap-3 cursor-pointer rounded-xl p-3" style={{ border: `1px solid ${C.border}` }}>
                    <input type="checkbox" checked={item.checked} onChange={item.toggle} className="size-4 rounded" style={{ accentColor: C.blue }} />
                    <div>
                      <p className="text-[13.5px] font-medium" style={{ color: C.navy }}>{item.label}</p>
                      <p className="text-[12px]" style={{ color: C.textTertiary }}>{item.sub}</p>
                    </div>
                  </label>
                ))}

                <p className="text-[13px] font-semibold mt-4" style={{ color: C.navy }}>Publish Date & Time</p>
                <input type="date" className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }} />
                <input type="time" className="h-10 w-full rounded-lg border bg-white px-3 text-[13.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }} />

                <button onClick={() => setConfirm('All Sections')} className={`${primaryButton} w-full mt-2`}>
                  Publish Timetable
                </button>
              </div>
            </Panel>

            <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: C.greenLight, border: `1px solid #BBF7D0` }}>
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: C.green }} />
              <p className="text-[13px]" style={{ color: '#14532D' }}>
                Timetable is ready to be published. Once published, it will be visible in the student and faculty portals.
              </p>
            </div>
          </div>

          {/* Right — Status table + preview */}
          <div className="space-y-5">
            <Panel title="Publish Status by Section">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                    <tr>
                      {['Dept.','Sem.','Section','Status','Last Updated','Action'].map(h => (
                        <th key={h} className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: C.textSecondary }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {publishRows.map(row => (
                      <tr key={row.section} style={{ borderBottom: `1px solid ${C.border}` }}
                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                      >
                        <td className="px-5 py-[14px] text-[13.5px] font-semibold" style={{ color: C.navy }}>{row.dept}</td>
                        <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{row.sem}</td>
                        <td className="px-5 py-[14px] text-[13.5px] font-medium" style={{ color: C.navy }}>{row.section}</td>
                        <td className="px-5 py-[14px]"><StatusBadge tone={row.status === 'Published' ? 'green' : 'orange'}>{row.status}</StatusBadge></td>
                        <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textTertiary }}>{row.date}</td>
                        <td className="px-5 py-[14px]">
                          {row.status !== 'Published' ? (
                            <button onClick={() => setConfirm(row.section)} className={`${primaryButton} h-8 px-3 text-[12.5px]`}>
                              Publish
                            </button>
                          ) : (
                            <span className="text-[12.5px] font-medium" style={{ color: C.green }}>Live</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            {/* Timetable grid preview */}
            <Panel title="Timetable Preview">
              <div className="p-4 overflow-x-auto">
                <div className="mb-3 flex gap-3">
                  {[['Department','CSE'],['Year','3rd Year'],['Semester','5'],['Section','CSE 3A']].map(([l, v]) => (
                    <select key={l} className="h-9 rounded-lg border bg-white px-2 text-[12.5px] outline-none" style={{ borderColor: C.border, color: C.textPrimary }}>
                      <option>{v}</option>
                    </select>
                  ))}
                </div>
                <table className="w-full min-w-[640px] text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-[11px] font-semibold rounded-tl-lg" style={{ background: C.navy, color: 'rgba(255,255,255,0.7)', width: '100px' }}>Time</th>
                      {timetableGrid.days.map(d => (
                        <th key={d} className="px-3 py-2 text-[11px] font-semibold" style={{ background: C.navy, color: C.white }}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timetableGrid.times.map((time, i) => (
                      <tr key={time}>
                        <td className="px-3 py-2.5 text-[11.5px] font-medium whitespace-nowrap" style={{ background: C.blueLight, color: C.blue, border: `1px solid ${C.border}` }}>{time}</td>
                        {timetableGrid.days.map((_, j) => (
                          <td key={j} className="px-3 py-2.5 text-[12px] text-center" style={{ border: `1px solid ${C.border}`, color: C.navy, background: j === 0 && i === 0 ? C.blueLight : C.white }}>
                            {timetableGrid.data[i][j]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </div>
      </AdminContent>

      {confirm && (
        <Modal title={`Publish Timetable — ${confirm}?`} onClose={() => setConfirm(null)}>
          <p className="text-[13.5px]" style={{ color: C.textSecondary }}>
            The timetable for <strong>{confirm}</strong> will be published and immediately visible in the student and faculty portals.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setConfirm(null)} className={secondaryButton}>Cancel</button>
            <button onClick={() => { setConfirm(null); setDone(true) }} className={primaryButton}>
              Publish Timetable
            </button>
          </div>
        </Modal>
      )}
      {done && <Toast message="Timetable published successfully." />}
    </AdminShell>
  )
}
