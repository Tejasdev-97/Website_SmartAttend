'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertCircle, ArrowLeft, BarChart3, Check, CheckCircle2,
  ClipboardList, Copy, Eye, EyeOff, FileSpreadsheet,
  GraduationCap, Info, LockKeyhole, MoreHorizontal, Plus,
  Search, Settings, Shield, SlidersHorizontal, Upload,
  UserCog, UserRound, Users, X,
} from 'lucide-react'
import {
  AdminContent, AdminShell, C, PageHeader, Panel,
  primaryButton, secondaryButton, StatusBadge,
} from './admin-shell'

// ─── Shared Form Helpers ──────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>
      {children}
      {required && <span className="ml-0.5" style={{ color: C.red }}>*</span>}
    </span>
  )
}

function Inp({
  type = 'text',
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  type?: string
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textTertiary }}>
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border bg-white text-sm outline-none transition-all"
        style={{
          borderColor: C.border,
          color: C.textPrimary,
          paddingLeft: prefix ? '2.75rem' : '0.75rem',
          paddingRight: suffix ? '2.75rem' : '0.75rem',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(11,92,255,0.10)` }}
        onBlur={e =>  { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none' }}
      />
      {suffix && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: C.textTertiary }}>
          {suffix}
        </span>
      )}
    </div>
  )
}

function Sel({ value, onChange, options, placeholder }: {
  value?: string
  onChange?: (v: string) => void
  options: string[]
  placeholder?: string
}) {
  return (
    <select
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="h-11 w-full appearance-none rounded-lg border bg-white px-3 text-sm outline-none transition-all"
      style={{ borderColor: C.border, color: C.textPrimary }}
      onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
      onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export function LoginPage() {
  const router = useRouter()
  const [show, setShow]         = useState(false)
  const [id, setId]             = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [notice, setNotice]     = useState('')
  const [loading, setLoading]   = useState(false)

  function login(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setNotice('')
    if (!id.trim() || !password.trim()) {
      setError('Please enter your Admin ID and password to continue.')
      return
    }
    setLoading(true)
    setTimeout(() => router.push('/admin/dashboard'), 600)
  }

  const features = [
    { icon: Shield,          title: 'Secure & Reliable',         desc: 'Your data is always protected.' },
    { icon: SlidersHorizontal, title: 'Effortless Management',   desc: 'Manage students, faculty and academics with ease.' },
    { icon: GraduationCap,   title: 'Built for Modern Campuses', desc: 'Technology that simplifies everyday tasks.' },
  ]

  return (
    <main className="flex min-h-screen">
      {/* ── Left branding panel ─── */}
      <div
        className="hidden lg:flex lg:w-[46%] xl:w-[48%] flex-col relative overflow-hidden"
        style={{ background: C.navy }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Blue glow accent */}
        <div
          className="absolute -top-20 -right-20 size-80 rounded-full blur-3xl"
          style={{ background: 'rgba(11,92,255,0.18)' }}
        />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 items-center justify-center rounded-lg"
              style={{ background: C.blue }}
            >
              <Shield className="size-4 text-white" />
            </div>
            <div>
              <p className="text-[16px] font-bold text-white leading-tight">
                Smart<span style={{ color: '#60A5FA' }}>Attend</span>
              </p>
              <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Admin Console
              </p>
            </div>
          </div>

          {/* Main headline */}
          <div className="flex-1 flex flex-col justify-center">
            <h2
              className="text-[38px] xl:text-[44px] font-bold text-white leading-[1.15] tracking-tight"
            >
              Smarter<br />
              Attendance for a<br />
              <span className="relative inline-block">
                Brighter Tomorrow
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                  style={{ background: C.orange }}
                />
              </span>
            </h2>
            <p className="mt-7 text-[14px] leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.58)' }}>
              A connected campus for students, faculty and a smarter administration.
            </p>

            {/* Feature list */}
            <div className="mt-9 space-y-5">
              {features.map(f => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="flex items-start gap-3.5">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg mt-0.5"
                      style={{ background: 'rgba(11,92,255,0.25)' }}
                    >
                      <Icon className="size-4" style={{ color: '#93C5FD' }} />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-white">{f.title}</p>
                      <p className="text-[12.5px] mt-0.5" style={{ color: 'rgba(255,255,255,0.50)' }}>{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div>
            <p className="text-[13px] font-semibold text-white">ABC Engineering College</p>
            <p className="text-[11px] tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Discipline · Learning · Growth
            </p>
          </div>
        </div>
      </div>

      {/* ── Right login panel ─── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-6 py-12"
        style={{ background: C.blueFaint }}
      >
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2.5 lg:hidden">
          <div className="flex size-8 items-center justify-center rounded-lg" style={{ background: C.blue }}>
            <Shield className="size-4 text-white" />
          </div>
          <p className="text-lg font-bold" style={{ color: C.navy }}>
            Smart<span style={{ color: C.blue }}>Attend</span>
          </p>
        </div>

        {/* Login card */}
        <div
          className="w-full max-w-[420px] rounded-2xl bg-white p-8"
          style={{ border: `1px solid ${C.border}`, boxShadow: '0 4px 24px rgba(7,27,73,0.08)' }}
        >
          <h1 className="text-[26px] font-bold" style={{ color: C.navy }}>Welcome Back</h1>
          <p className="mt-1.5 text-[14px]" style={{ color: C.textSecondary }}>
            Log in to your admin account
          </p>

          <form onSubmit={login} className="mt-7 space-y-5">
            <div>
              <Label required>Admin ID / Email</Label>
              <Inp
                value={id}
                onChange={setId}
                placeholder="Enter your Admin ID or email"
                prefix={<UserRound className="size-4" />}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label required>Password</Label>
                <button
                  type="button"
                  className="text-[12.5px] font-medium transition-colors hover:underline"
                  style={{ color: C.blue }}
                  onClick={() => setNotice('Please contact your institution administrator to reset your password.')}
                >
                  Forgot Password?
                </button>
              </div>
              <Inp
                type={show ? 'text' : 'password'}
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                prefix={<LockKeyhole className="size-4" />}
                suffix={
                  <button type="button" onClick={() => setShow(!show)}>
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                }
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 rounded-lg p-3" style={{ background: C.redLight, border: `1px solid #FECACA` }}>
                <AlertCircle className="mt-0.5 size-4 shrink-0" style={{ color: C.red }} />
                <p className="text-[13px]" style={{ color: '#991B1B' }}>{error}</p>
              </div>
            )}
            {notice && (
              <div className="flex items-start gap-2.5 rounded-lg p-3" style={{ background: C.blueLight, border: `1px solid #BFDBFE` }}>
                <Info className="mt-0.5 size-4 shrink-0" style={{ color: C.blue }} />
                <p className="text-[13px]" style={{ color: C.textSecondary }}>{notice}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg text-[14px] font-semibold text-white transition-all disabled:opacity-60"
              style={{ background: C.blue }}
            >
              {loading ? 'Signing in…' : 'Log In'}
            </button>
          </form>

          {/* Info panel */}
          <div
            className="mt-6 rounded-xl p-4"
            style={{ background: C.blueLight, border: `1px solid #BFDBFE` }}
          >
            <p className="text-[12.5px] font-semibold" style={{ color: C.navy }}>
              Authorized Access Only
            </p>
            <p className="mt-1 text-[12px]" style={{ color: C.textSecondary }}>
              Use your institution-provided credentials to continue.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
type StatItem = { label: string; value: string; icon: React.ElementType; sub: string; accent?: boolean }
const stats: StatItem[] = [
  { label: 'Total Students',   value: '2,856', icon: GraduationCap,    sub: '+48 this semester'  },
  { label: 'Total Faculty',    value: '156',   icon: Users,            sub: '12 departments'      },
  { label: 'Active Classes',   value: '128',   icon: ClipboardList,    sub: 'This week'           },
  { label: 'Avg. Attendance',  value: '82%',   icon: SlidersHorizontal,sub: 'Current semester', accent: true },
]

const quickActions = [
  { title: 'Student Management',   href: '/admin/students',       icon: GraduationCap,  desc: 'Manage student records',        color: C.blue,   bg: C.blueLight   },
  { title: 'Faculty Management',   href: '/admin/faculty',        icon: Users,          desc: 'Manage faculty profiles',       color: C.green,  bg: C.greenLight  },
  { title: 'Timetable Management', href: '/admin/timetable',      icon: ClipboardList,  desc: 'Plan and manage classes',       color: C.purple, bg: C.purpleLight },
  { title: 'Attendance Overview',  href: '/admin/reports',        icon: SlidersHorizontal, desc: 'View attendance data',       color: C.orange, bg: C.orangeLight },
  { title: 'Reports & Analytics',  href: '/admin/reports',        icon: BarChart3,      desc: 'View institutional reports',    color: C.blue,   bg: C.blueFaint   },
  { title: 'Users & Roles',        href: '/admin/users',          icon: UserCog,        desc: 'Manage system users',           color: C.navy,   bg: '#F4F8FD'     },
  { title: 'Audit Logs',           href: '/admin/audit-logs',     icon: ClipboardList,  desc: 'Track admin activity',          color: C.navy,   bg: '#F4F8FD'     },
  { title: 'System Settings',      href: '/admin/settings',       icon: Settings,       desc: 'Configure your console',        color: C.navy,   bg: '#F4F8FD'     },
]

export function DashboardPage() {
  const dateStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <AdminShell>
      <AdminContent>
        {/* Greeting banner */}
        <div
          className="mb-8 rounded-xl px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: C.white, border: `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(7,27,73,0.05)' }}
        >
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: C.blue }}>
              Dashboard
            </p>
            <h1 className="text-[26px] font-bold leading-tight" style={{ color: C.navy }}>
              Good morning, Administrator
            </h1>
            <p className="mt-1.5 text-[14px]" style={{ color: C.textSecondary }}>
              Here&apos;s what&apos;s happening at ABC Engineering College today.
            </p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <p className="text-[13px] font-medium" style={{ color: C.textSecondary }}>{dateStr}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <Shield className="size-4" style={{ color: C.blue }} />
              <span className="text-[12px] font-medium" style={{ color: C.textSecondary }}>Super Admin</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(item => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="rounded-xl p-5"
                style={{
                  background: item.accent ? C.blue : C.white,
                  border: item.accent ? 'none' : `1px solid ${C.border}`,
                  boxShadow: item.accent
                    ? '0 4px 20px rgba(11,92,255,0.25)'
                    : '0 2px 10px rgba(7,27,73,0.05)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="text-[12.5px] font-medium"
                      style={{ color: item.accent ? 'rgba(255,255,255,0.85)' : C.textSecondary }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-2.5 text-[36px] font-bold leading-none"
                      style={{ color: item.accent ? C.white : C.navy }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="mt-1.5 text-[12px]"
                      style={{ color: item.accent ? 'rgba(255,255,255,0.75)' : C.textSecondary }}
                    >
                      {item.sub}
                    </p>
                  </div>
                  <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ background: item.accent ? 'rgba(255,255,255,0.18)' : C.blueLight }}
                  >
                    <Icon
                      className="size-5"
                      style={{ color: item.accent ? C.white : C.blue }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-[15px] font-semibold" style={{ color: C.navy }}>Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {quickActions.map(action => {
              const Icon = action.icon
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center gap-3.5 rounded-xl p-4 transition-all hover:-translate-y-0.5"
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    boxShadow: '0 2px 8px rgba(7,27,73,0.04)',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(7,27,73,0.10)'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 8px rgba(7,27,73,0.04)'}
                >
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: action.bg }}
                  >
                    <Icon className="size-[18px]" style={{ color: action.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold" style={{ color: C.navy }}>{action.title}</p>
                    <p className="mt-0.5 text-[12px]" style={{ color: C.textSecondary }}>{action.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Quote footer */}
        <div className="mt-8 flex items-center justify-center">
          <p className="text-[13px] font-medium" style={{ color: C.textSecondary }}>
            &ldquo;Better Attendance. A Stronger Tomorrow.&rdquo;
          </p>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ─── Students Page ────────────────────────────────────────────────────────────
const students = [
  { name: 'Rahul Sharma',  usn: '01CS123', dept: 'CSE', year: '3rd Year', section: 'CSE 3A', account: 'Active',   device: 'Linked'     },
  { name: 'Ananya Singh',  usn: '01CS124', dept: 'CSE', year: '3rd Year', section: 'CSE 3A', account: 'Active',   device: 'Linked'     },
  { name: 'Vikram Patel',  usn: '01CS125', dept: 'CSE', year: '3rd Year', section: 'CSE 3B', account: 'Active',   device: 'Linked'     },
  { name: 'Neha Verma',    usn: '01CS126', dept: 'CSE', year: '3rd Year', section: 'CSE 3B', account: 'Inactive', device: 'Not Linked' },
  { name: 'Arjun Kumar',   usn: '01CS127', dept: 'CSE', year: '3rd Year', section: 'CSE 3A', account: 'Active',   device: 'Linked'     },
  { name: 'Ishita Rao',    usn: '01EC203', dept: 'ECE', year: '2nd Year', section: 'ECE 2A', account: 'Active',   device: 'Linked'     },
  { name: 'Karan Shah',    usn: '01IT118', dept: 'IT',  year: '3rd Year', section: 'IT 3A',  account: 'Active',   device: 'Not Linked' },
]

export function StudentsPage() {
  const router = useRouter()
  const [query,      setQuery]      = useState('')
  const [dept,       setDept]       = useState('')
  const [status,     setStatus]     = useState('')
  const [activePage, setActivePage] = useState(1)

  const filtered = useMemo(
    () => students.filter(s =>
      (s.name + s.usn).toLowerCase().includes(query.toLowerCase()) &&
      (!dept   || s.dept    === dept)   &&
      (!status || s.account === status)
    ),
    [query, dept, status],
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Student Management"
          description="Manage student accounts, academic information and registered devices."
          actions={
            <>
              <button onClick={() => router.push('/admin/students/create')} className={secondaryButton}>
                <Upload className="size-4" /> Import Excel / CSV
              </button>
              <button onClick={() => router.push('/admin/students/create')} className={primaryButton}>
                <Plus className="size-4" /> Add Student
              </button>
            </>
          }
        />

        {/* Filter bar */}
        <div
          className="mb-5 flex flex-wrap items-center gap-3 rounded-xl p-4"
          style={{ background: C.white, border: `1px solid ${C.border}` }}
        >
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2" style={{ color: C.textTertiary }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by USN or Name"
              className="h-10 w-full rounded-lg border pl-10 pr-4 text-[13.5px] outline-none transition-all"
              style={{ borderColor: C.border, color: C.textPrimary }}
              onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
              onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
            />
          </div>
          <Sel value={dept}   onChange={setDept}   options={['CSE','ECE','IT','ME']} placeholder="Department" />
          <Sel value=""       onChange={() => {}}   options={['1st Year','2nd Year','3rd Year','4th Year']} placeholder="Year" />
          <Sel value=""       onChange={() => {}}   options={['1','2','3','4','5','6','7','8']} placeholder="Semester" />
          <Sel value=""       onChange={() => {}}   options={['CSE 3A','CSE 3B','ECE 2A']} placeholder="Section" />
          <Sel value={status} onChange={setStatus}  options={['Active','Inactive']} placeholder="Account Status" />
          <button
            onClick={() => { setQuery(''); setDept(''); setStatus('') }}
            className={secondaryButton}
          >
            Reset
          </button>
        </div>

        <Panel>
          {/* Table header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            <div>
              <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>Student Directory</h2>
              <p className="mt-0.5 text-[13px]" style={{ color: C.textSecondary }}>
                Total: <span className="font-semibold" style={{ color: C.navy }}>2,856</span> students
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
              <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                <tr>
                  {['#','Student','USN','Department','Year','Section','Account','Device','Actions'].map((h, i) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide"
                      style={{ color: C.navy, textAlign: i === 8 ? 'right' : 'left' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s.usn}
                    style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                    <td className="px-5 py-[14px]">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{ background: C.blue }}
                        >
                          {s.name.split(' ').map(x => x[0]).join('')}
                        </div>
                        <span className="text-[13.5px] font-medium" style={{ color: C.navy }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-[14px] text-[13px] font-medium" style={{ color: C.textSecondary }}>{s.usn}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{s.dept}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{s.year}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{s.section}</td>
                    <td className="px-5 py-[14px]">
                      <StatusBadge tone={s.account === 'Active' ? 'green' : 'red'}>{s.account}</StatusBadge>
                    </td>
                    <td className="px-5 py-[14px]">
                      <StatusBadge tone={s.device === 'Linked' ? 'blue' : 'orange'}>{s.device}</StatusBadge>
                    </td>
                    <td className="px-5 py-[14px] text-right">
                      <button
                        onClick={() => router.push(`/admin/students/${i + 1}`)}
                        aria-label={`View ${s.name}`}
                        className="rounded-lg p-2 transition-colors hover:bg-[#EAF3FF]"
                        style={{ color: C.textTertiary }}
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-16 text-center">
                      <GraduationCap className="mx-auto size-10 mb-3" style={{ color: C.border }} />
                      <p className="font-semibold" style={{ color: C.navy }}>No students found</p>
                      <p className="mt-1 text-[13px]" style={{ color: C.textTertiary }}>
                        Try adjusting your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <p className="text-[13px]" style={{ color: C.textSecondary }}>
              Showing <span className="font-semibold" style={{ color: C.navy }}>{filtered.length}</span> of{' '}
              <span className="font-semibold" style={{ color: C.navy }}>2,856</span>
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePage(p)}
                  className="flex size-8 items-center justify-center rounded-lg text-[13px] font-medium transition-colors"
                  style={
                    activePage === p
                      ? { background: C.blue, color: C.white }
                      : { color: C.textSecondary, background: 'transparent' }
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Panel>

        {/* Info notice */}
        <div className="mt-4 flex items-start gap-3 rounded-xl p-4" style={{ background: C.blueLight, border: `1px solid #BFDBFE` }}>
          <Info className="mt-0.5 size-4 shrink-0" style={{ color: C.blue }} />
          <p className="text-[13px] font-medium" style={{ color: C.textSecondary }}>
            Student accounts are created by Admin or Faculty. Students cannot self-register.
          </p>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ─── Create Student Page ──────────────────────────────────────────────────────
export function CreateStudentPage() {
  const router  = useRouter()
  const [created, setCreated] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const [file,    setFile]    = useState('students_import_may2024.xlsx')
  const [form, setForm] = useState({
    name: 'Sakshi Gupta', usn: '01CS128', gender: 'Female',
    mobile: '+91 98765 43210', email: '',
    department: 'CSE', year: '3rd Year', semester: '5', section: 'CSE 3A',
  })
  const update = (k: string, v: string) => setForm({ ...form, [k]: v })
  const tempPassword = `${form.usn}@SmartAttend`

  function copyPassword() {
    navigator.clipboard.writeText(tempPassword).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Create Student Account"
          description="Add a new student account to the system."
          actions={
            <Link href="/admin/students" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back to Students
            </Link>
          }
        />

        {/* Bulk import */}
        <Panel title="Import Excel / CSV (Bulk)" description="Create multiple student accounts at once.">
          <div className="m-5 rounded-xl p-5" style={{ background: C.blueFaint, border: `1px dashed ${C.blue}` }}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-lg" style={{ background: C.blueLight }}>
                <FileSpreadsheet className="size-5" style={{ color: C.blue }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold" style={{ color: C.navy }}>{file}</p>
                <p className="mt-0.5 text-[12.5px]" style={{ color: C.textTertiary }}>1,254 records detected</p>
              </div>
              <span className="flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: C.green }}>
                <CheckCircle2 className="size-4" /> Validated
              </span>
              <label className={secondaryButton}>
                <Upload className="size-4" /> Choose File
                <input type="file" accept=".xlsx,.csv" className="sr-only"
                  onChange={e => setFile(e.target.files?.[0]?.name || file)} />
              </label>
              <button onClick={() => setCreated(true)} className={primaryButton}>Review Imported Data</button>
            </div>
          </div>
        </Panel>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: C.border }} />
          <span className="text-[11px] font-semibold uppercase tracking-widest px-2" style={{ color: C.textTertiary }}>
            Or add single student
          </span>
          <div className="h-px flex-1" style={{ background: C.border }} />
        </div>

        {/* Single student form — two columns */}
        <div className="grid gap-5 lg:grid-cols-[1fr_360px] min-w-0">
          {/* Left — personal + academic */}
          <div className="space-y-5 min-w-0">
            <Panel title="Personal Information">
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                {([['name','Full Name',true],['usn','USN',true],['gender','Gender',true],['mobile','Mobile Number',false],['email','Email (Optional)',false]] as [string,string,boolean][]).map(([k,l,req]) => (
                  <label key={k} className="block">
                    <Label required={req}>{l}</Label>
                    <Inp value={form[k as keyof typeof form]} onChange={v => update(k, v)} />
                  </label>
                ))}
              </div>
            </Panel>

            <Panel title="Academic Information">
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <label className="block">
                  <Label required>Department</Label>
                  <Sel value={form.department} onChange={v => update('department', v)} options={['CSE','ECE','IT','ME','CE']} />
                </label>
                <label className="block">
                  <Label required>Year</Label>
                  <Sel value={form.year} onChange={v => update('year', v)} options={['1st Year','2nd Year','3rd Year','4th Year']} />
                </label>
                <label className="block">
                  <Label required>Semester</Label>
                  <Sel value={form.semester} onChange={v => update('semester', v)} options={['1','2','3','4','5','6','7','8']} />
                </label>
                <label className="block">
                  <Label required>Section</Label>
                  <Inp value={form.section} onChange={v => update('section', v)} />
                </label>
              </div>
            </Panel>
          </div>

          {/* Right — account info */}
          <div className="space-y-4">
            <Panel title="Account Information">
              <div className="p-5 space-y-4">
                <div>
                  <Label>Temporary Password</Label>
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-3 mt-1"
                    style={{ background: C.blueFaint, border: `1px solid ${C.border}` }}
                  >
                    <code className="flex-1 text-[13px] font-mono font-semibold" style={{ color: C.navy }}>
                      {tempPassword}
                    </code>
                    <button
                      onClick={copyPassword}
                      className="flex size-7 items-center justify-center rounded-md transition-colors hover:bg-[#EAF3FF]"
                      style={{ color: C.blue }}
                    >
                      {copied ? <CheckCircle2 className="size-4" /> : <Copy className="size-4" />}
                    </button>
                  </div>
                  <p className="mt-2 text-[12px]" style={{ color: C.textTertiary }}>
                    Student will be required to change this password on first login.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {['Send login credentials via email', 'Send credentials via SMS', 'Link device later (optional)'].map(opt => (
                    <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" className="rounded" style={{ accentColor: C.blue }} />
                      <span className="text-[13px]" style={{ color: C.textSecondary }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Panel>

            <div
              className="rounded-xl p-4"
              style={{ background: C.blueLight, border: `1px solid #BFDBFE` }}
            >
              <p className="text-[12.5px] font-semibold" style={{ color: C.navy }}>Note</p>
              <p className="mt-1 text-[12.5px]" style={{ color: C.textSecondary }}>
                A student account will be created with the selected academic information.
                The student cannot self-register.
              </p>
            </div>

            {created && (
              <div className="flex items-center gap-2 rounded-xl p-4" style={{ background: C.greenLight, border: `1px solid #BBF7D0` }}>
                <CheckCircle2 className="size-4 shrink-0" style={{ color: C.green }} />
                <p className="text-[13px] font-semibold" style={{ color: '#14532D' }}>
                  Student account created successfully.
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button onClick={() => router.push('/admin/students')} className={`${secondaryButton} flex-1`}>
                Cancel
              </button>
              <button onClick={() => setCreated(true)} className={`${primaryButton} flex-1`}>
                Create Student Account
              </button>
            </div>
          </div>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ─── Faculty Page ─────────────────────────────────────────────────────────────
const faculty = [
  { name: 'Prof. Rohit Sharma',  id: 'FAC123', dept: 'CSE', designation: 'Associate Prof.', classes: '8 Classes', status: 'Active'   },
  { name: 'Prof. Neha Joshi',    id: 'FAC124', dept: 'CSE', designation: 'Assistant Prof.', classes: '6 Classes', status: 'Active'   },
  { name: 'Prof. Amit Verma',    id: 'FAC125', dept: 'ECE', designation: 'Professor',       classes: '5 Classes', status: 'Active'   },
  { name: 'Prof. Pooja Singh',   id: 'FAC126', dept: 'ME',  designation: 'Assistant Prof.', classes: '4 Classes', status: 'Inactive' },
  { name: 'Prof. Rahul Mehta',   id: 'FAC127', dept: 'IT',  designation: 'Associate Prof.', classes: '3 Classes', status: 'Active'   },
  { name: 'Prof. Sneha Reddy',   id: 'FAC128', dept: 'CSE', designation: 'Assistant Prof.', classes: '4 Classes', status: 'Active'   },
]

const greenFacultyColors = ['#1E40AF','#5B21B6','#166534','#92400E','#1E40AF','#5B21B6']

export function FacultyPage() {
  const router = useRouter()
  const [open,  setOpen]  = useState(false)
  const [query, setQuery] = useState('')
  const filtered = faculty.filter(f =>
    (f.name + f.id).toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Faculty Management"
          description="Manage faculty accounts, profiles and their academic assignments."
          actions={
            <button onClick={() => setOpen(true)} className={primaryButton}>
              <Plus className="size-4" /> Add Faculty
            </button>
          }
        />

        <div
          className="mb-5 flex flex-wrap items-center gap-3 rounded-xl p-4"
          style={{ background: C.white, border: `1px solid ${C.border}` }}
        >
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2" style={{ color: C.textTertiary }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by Faculty ID or Name"
              className="h-10 w-full rounded-lg border pl-10 pr-4 text-[13.5px] outline-none transition-all"
              style={{ borderColor: C.border, color: C.textPrimary }}
              onFocus={e => { e.currentTarget.style.borderColor = C.blue }}
              onBlur={e =>  { e.currentTarget.style.borderColor = C.border }}
            />
          </div>
          <Sel value="" onChange={() => {}} options={['CSE','ECE','IT','ME']} placeholder="Department" />
          <Sel value="" onChange={() => {}} options={['Professor','Associate Prof.','Assistant Prof.']} placeholder="Designation" />
          <Sel value="" onChange={() => {}} options={['Active','Inactive']} placeholder="Status" />
          <button onClick={() => setQuery('')} className={secondaryButton}>Reset</button>
        </div>

        <Panel>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <div>
              <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>Faculty Directory</h2>
              <p className="mt-0.5 text-[13px]" style={{ color: C.textSecondary }}>
                Total: <span className="font-semibold" style={{ color: C.navy }}>156</span> faculty members
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                <tr>
                  {['#','Faculty','Faculty ID','Department','Designation','Assigned Classes','Status','Actions'].map((h, i) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide"
                      style={{ color: C.navy, textAlign: i === 7 ? 'right' : 'left' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((f, i) => (
                  <tr
                    key={f.id}
                    style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                    <td className="px-5 py-[14px]">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{ background: greenFacultyColors[i % greenFacultyColors.length] }}
                        >
                          {f.name.split(' ').slice(1).map(x => x[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-[13.5px] font-medium" style={{ color: C.navy }}>{f.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-[14px] text-[13px] font-medium" style={{ color: C.textSecondary }}>{f.id}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{f.dept}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{f.designation}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{f.classes}</td>
                    <td className="px-5 py-[14px]">
                      <StatusBadge tone={f.status === 'Active' ? 'green' : 'red'}>{f.status}</StatusBadge>
                    </td>
                    <td className="px-5 py-[14px] text-right">
                      <button
                        onClick={() => router.push(`/admin/faculty/${i + 1}`)}
                        aria-label={`View ${f.name}`}
                        className="rounded-lg p-2 transition-colors hover:bg-[#EAF3FF]"
                        style={{ color: C.textTertiary }}
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[13px]" style={{ color: C.textSecondary }}>
              Showing <span className="font-semibold" style={{ color: C.navy }}>{filtered.length}</span> of{' '}
              <span className="font-semibold" style={{ color: C.navy }}>156</span>
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, '…', 8].map((p, i) => (
                <button
                  key={i}
                  className="flex size-8 items-center justify-center rounded-lg text-[13px] font-medium"
                  style={p === 1 ? { background: C.blue, color: C.white } : { color: C.textSecondary }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Panel>

        {/* Add Faculty modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(7,27,73,0.30)' }}>
            <div className="w-full max-w-2xl rounded-2xl bg-white" style={{ border: `1px solid ${C.border}`, boxShadow: '0 20px 60px rgba(7,27,73,0.16)' }}>
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <h2 className="text-[16px] font-semibold" style={{ color: C.navy }}>Create Faculty Profile</h2>
                  <p className="mt-0.5 text-[13px]" style={{ color: C.textTertiary }}>Enter faculty details below.</p>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-2 hover:bg-[#F5F9FF]" style={{ color: C.textTertiary }}>
                  <X className="size-5" />
                </button>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {([
                  ['Faculty ID','FAC129',true],['Full Name','Prof. New Member',true],
                  ['Department','CSE',true],['Designation','Assistant Prof.',true],
                  ['Email','faculty@college.edu.in',true],['Mobile','+91 99876 54321',false],
                ] as [string,string,boolean][]).map(([label, val, req]) => (
                  <label key={label} className="block">
                    <Label required={req}>{label}</Label>
                    <Inp placeholder={val} />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <Label>Assigned Subjects / Classes</Label>
                  <Inp placeholder="e.g. Data Structures (CS301), Digital Logic (CS302)" />
                </label>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4" style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setOpen(false)} className={secondaryButton}>Cancel</button>
                <button onClick={() => setOpen(false)} className={primaryButton}>Create Faculty</button>
              </div>
            </div>
          </div>
        )}
      </AdminContent>
    </AdminShell>
  )
}
