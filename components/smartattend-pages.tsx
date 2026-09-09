'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertCircle, ArrowLeft, BarChart3, Check, ChevronDown,
  ClipboardList, Eye, EyeOff, FileSpreadsheet, GraduationCap,
  Info, LockKeyhole, MoreHorizontal, Plus, Search,
  Settings, ShieldCheck, SlidersHorizontal, Upload, UserCog,
  UserRound, Users, X,
} from 'lucide-react'
import {
  AdminContent, AdminShell, PageHeader, Panel,
  primaryButton, secondaryButton, StatusBadge,
} from './admin-shell'

// ── Login Page ────────────────────────────────────────────────────────────────
export function LoginPage() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  function login(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!id.trim() || !password.trim()) {
      setError('Please enter your university identifier and password.')
      return
    }
    setLoading(true)
    setTimeout(() => router.push('/admin/dashboard'), 500)
  }

  return (
    <main className="flex min-h-screen bg-[#F7F9FC]">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[52%] flex-col bg-[#0B1F3A] relative overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Blue accent shape */}
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-[#1565D8] opacity-[0.12] blur-3xl" />
        <div className="absolute -bottom-32 -left-16 size-80 rounded-full bg-[#247BFF] opacity-[0.08] blur-3xl" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#1565D8] shadow-lg">
              <ShieldCheck className="size-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-800 text-white leading-tight">
                Smart<span className="text-[#247BFF]">Attend</span>
              </p>
              <p className="text-[10px] font-600 tracking-[0.14em] text-white/50 uppercase">
                Admin Console
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-[36px] xl:text-[44px] font-800 text-white leading-[1.15] tracking-tight">
              Unified Campus<br />
              <span className="text-[#247BFF]">Administration</span>
            </h2>
            <p className="mt-5 text-[15px] text-white/60 leading-relaxed max-w-sm">
              Manage students, faculty, timetables and attendance — all from a single trusted platform.
            </p>

            {/* Feature list */}
            <div className="mt-10 space-y-3">
              {[
                'Student & Faculty Management',
                'Timetable Import & Publishing',
                'BLE Attendance Integration',
                'Role-Based System Access',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#1565D8]/30">
                    <Check className="size-3 text-[#247BFF]" />
                  </div>
                  <p className="text-sm text-white/70">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-[11px] font-600 tracking-[0.14em] text-white/30 uppercase">
            <ShieldCheck className="size-3.5" />
            Unified Institutional Gateway
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2.5 lg:hidden">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#1565D8]">
            <ShieldCheck className="size-5 text-white" />
          </div>
          <p className="text-xl font-800 text-[#0B1F3A]">
            Smart<span className="text-[#1565D8]">Attend</span>
          </p>
        </div>

        <div className="w-full max-w-[400px]">
          <h1 className="text-[28px] font-800 tracking-tight text-[#0B1F3A]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#64748B]">
            Sign in with your institutional credentials to continue.
          </p>

          <form onSubmit={login} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-[13.5px] font-600 text-[#374151]">
                University Identifier
              </span>
              <div className="relative mt-2">
                <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  value={id}
                  onChange={e => setId(e.target.value)}
                  placeholder="USN / Faculty ID / Admin ID"
                  className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[13.5px] font-600 text-[#374151]">Password</span>
              <div className="relative mt-2">
                <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-11 text-sm text-[#172033] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#64748B]"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    'Please contact your institution administrator to reset your password.',
                  )
                }
                className="text-[13px] font-600 text-[#1565D8] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {notice && (
              <div className="flex items-start gap-2.5 rounded-lg border border-blue-100 bg-[#EAF3FF] px-4 py-3">
                <Info className="mt-0.5 size-4 shrink-0 text-[#1565D8]" />
                <p className="text-sm text-[#1565D8]">{notice}</p>
              </div>
            )}

            <button
              disabled={loading}
              className={`${primaryButton} h-11 w-full text-[13.5px] font-700 tracking-wide disabled:opacity-60`}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-[#D9E0E8] bg-[#FFF9EF] p-4">
            <p className="text-[12.5px] font-700 text-[#0B1F3A]">
              Campus Network Credential
            </p>
            <p className="mt-1 text-xs leading-5 text-[#4B5563]">
              Use the credentials provided by your institution to sign in.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
type QuickAction = {
  title: string
  href: string
  icon: React.ElementType
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'navy'
  detail: string
  badge?: string
  primary?: boolean
}

const quickActions: QuickAction[] = [
  { title: 'Student Management', href: '/admin/students', icon: GraduationCap, tone: 'blue', detail: 'Manage accounts & devices', primary: true },
  { title: 'Faculty Management', href: '/admin/faculty', icon: Users, tone: 'green', detail: 'Manage faculty profiles', primary: true },
  { title: 'Timetable', href: '/admin/timetable', icon: ClipboardList, tone: 'purple', detail: 'Plan academic schedules', primary: true },
  { title: 'Attendance Overview', href: '/admin/reports', icon: Check, tone: 'orange', detail: 'Review attendance data', primary: true },
  { title: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, tone: 'blue', detail: 'View institutional reports', primary: true },
  { title: 'Notifications', href: '/admin/settings', icon: AlertCircle, tone: 'orange', detail: 'Review system updates', badge: '6' },
  { title: 'Settings', href: '/admin/settings', icon: Settings, tone: 'navy', detail: 'Configure your console' },
  { title: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList, tone: 'navy', detail: 'Track admin activity' },
  { title: 'Users & Roles', href: '/admin/users', icon: UserCog, tone: 'navy', detail: 'Manage system access' },
]

const toneCard: Record<string, string> = {
  blue:   'bg-[#EAF3FF] border-blue-100',
  green:  'bg-emerald-50 border-emerald-100',
  purple: 'bg-violet-50 border-violet-100',
  orange: 'bg-orange-50 border-orange-100',
  navy:   'bg-white border-[#D9E0E8]',
}
const toneIcon: Record<string, string> = {
  blue:   'bg-[#1565D8] text-white',
  green:  'bg-emerald-600 text-white',
  purple: 'bg-violet-600 text-white',
  orange: 'bg-[#E98A45] text-white',
  navy:   'bg-[#0B1F3A] text-white',
}

type StatItem = { label: string; value: string; icon: React.ElementType; change: string }
const stats: StatItem[] = [
  { label: 'Total Students', value: '2,856', icon: GraduationCap, change: '+48 this semester' },
  { label: 'Faculty', value: '156', icon: Users, change: '12 departments' },
  { label: 'Active Classes', value: '128', icon: ClipboardList, change: 'This week' },
  { label: 'Avg Attendance', value: '82%', icon: SlidersHorizontal, change: 'Current semester' },
]

export function DashboardPage() {
  return (
    <AdminShell>
      <AdminContent>
        {/* Hero greeting */}
        <div className="mb-8 rounded-2xl border border-[#D9E0E8] bg-[#0B1F3A] px-8 py-7 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-[#1565D8]/20 to-transparent" />
          <div className="relative z-10">
            <p className="text-xs font-700 uppercase tracking-[0.14em] text-[#247BFF]">
              Overview
            </p>
            <h1 className="mt-2 text-[28px] font-800 text-white leading-tight">
              Good morning, Administrator
            </h1>
            <p className="mt-1.5 text-sm text-white/60">
              ABC Engineering College · Super Admin ·{' '}
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <h2 className="mb-4 text-[15px] font-700 text-[#0B1F3A]">
          SmartAttend Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`rounded-xl border p-5 shadow-card transition hover:-translate-y-0.5 ${
                  i === 0
                    ? 'border-[#1565D8]/20 bg-[#1565D8] text-white'
                    : 'border-[#D9E0E8] bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-xs font-600 ${i === 0 ? 'text-white/70' : 'text-[#64748B]'}`}>
                      {item.label}
                    </p>
                    <p className={`mt-2 text-[34px] font-800 leading-none ${i === 0 ? 'text-white' : 'text-[#0B1F3A]'}`}>
                      {item.value}
                    </p>
                    <p className={`mt-1.5 text-xs ${i === 0 ? 'text-white/60' : 'text-[#64748B]'}`}>
                      {item.change}
                    </p>
                  </div>
                  <div className={`flex size-10 items-center justify-center rounded-xl ${
                    i === 0 ? 'bg-white/20' : 'bg-[#EAF3FF] text-[#1565D8]'
                  }`}>
                    <Icon className="size-5" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-[15px] font-700 text-[#0B1F3A]">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map(action => {
              const Icon = action.icon
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`relative flex items-center gap-4 rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-card ${toneCard[action.tone]}`}
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${toneIcon[action.tone]}`}>
                    <Icon className="size-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-700 text-[#0B1F3A]">{action.title}</p>
                    <p className="mt-0.5 text-xs text-[#64748B]">{action.detail}</p>
                  </div>
                  {action.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#C24141] px-2 py-0.5 text-[10px] font-700 text-white">
                      {action.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ── Students Page ─────────────────────────────────────────────────────────────
const students = [
  { name: 'Rahul Sharma', usn: '01CS123', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Ananya Singh', usn: '01CS124', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Vikram Patel', usn: '01CS125', section: 'CSE 3B', account: 'Active', device: 'Linked' },
  { name: 'Neha Verma', usn: '01CS126', section: 'CSE 3B', account: 'Inactive', device: 'Not Linked' },
  { name: 'Arjun Kumar', usn: '01CS127', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Ishita Rao', usn: '01EC203', section: 'ECE 2A', account: 'Active', device: 'Linked' },
  { name: 'Karan Shah', usn: '01IT118', section: 'IT 3A', account: 'Active', device: 'Not Linked' },
]

export function StudentsPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [account, setAccount] = useState('All')
  const filtered = useMemo(
    () =>
      students.filter(
        s =>
          (s.name + s.usn).toLowerCase().includes(query.toLowerCase()) &&
          (account === 'All' || s.account === account),
      ),
    [query, account],
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Student Management"
          description="Manage student accounts, academic information and registered devices."
          actions={
            <>
              <button className={secondaryButton}>
                <Upload className="size-4" /> Import Excel / CSV
              </button>
              <button
                onClick={() => router.push('/admin/students/create')}
                className={primaryButton}
              >
                <Plus className="size-4" /> Add Student
              </button>
            </>
          }
        />

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[260px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by USN or Name"
              className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none placeholder:text-[#9CA3AF] focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
            />
          </div>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#1565D8]">
            <option>All Departments</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>IT</option>
          </select>
          <select
            value={account}
            onChange={e => setAccount(e.target.value)}
            className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#1565D8]"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button
            onClick={() => { setQuery(''); setAccount('All') }}
            className={secondaryButton}
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <Panel>
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <h2 className="text-base font-700 text-[#0B1F3A]">Student Directory</h2>
              <p className="mt-0.5 text-xs text-[#64748B]">
                Total Students: <span className="font-700 text-[#0B1F3A]">2,856</span>
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Account</th>
                  <th className="px-5 py-3">Device</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.map((student, i) => (
                  <tr key={student.usn} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-[#EAF3FF] text-xs font-700 text-[#1565D8]">
                          {student.name.split(' ').map(x => x[0]).join('')}
                        </div>
                        <div>
                          <p className="font-600 text-[#0B1F3A]">{student.name}</p>
                          <p className="text-xs text-[#64748B]">{student.usn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#374151]">
                      {student.section}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={student.account === 'Active' ? 'green' : 'red'}>
                        {student.account}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={student.device === 'Linked' ? 'blue' : 'orange'}>
                        {student.device}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => router.push(`/admin/students/${i + 1}`)}
                        aria-label={`View ${student.name}`}
                        className="rounded-lg p-2 text-[#64748B] hover:bg-[#EAF3FF] hover:text-[#1565D8] transition-colors"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <GraduationCap className="mx-auto size-10 text-[#D9E0E8]" />
                      <p className="mt-3 font-600 text-[#0B1F3A]">No students found</p>
                      <p className="mt-1 text-sm text-[#64748B]">
                        Try adjusting your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[#D9E0E8] px-5 py-4">
            <span className="text-xs text-[#64748B]">
              Showing{' '}
              <span className="font-600 text-[#374151]">{filtered.length}</span> of{' '}
              <span className="font-600 text-[#374151]">2,856</span> students
            </span>
            <div className="flex gap-2">
              <button className={secondaryButton}>Previous</button>
              <button className={secondaryButton}>Next</button>
            </div>
          </div>
        </Panel>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-[#EAF3FF] p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-[#1565D8]" />
          <p className="text-sm text-[#1565D8]">
            Student accounts are created by Admin or Faculty. Students cannot self-register.
          </p>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ── Create Student Page ───────────────────────────────────────────────────────
export function CreateStudentPage() {
  const router = useRouter()
  const [created, setCreated] = useState(false)
  const [file, setFile] = useState('students_import_may2024.xlsx')
  const [form, setForm] = useState({
    usn: '01CS128', name: 'Sakshi Gupta', department: 'CSE',
    gender: 'Female', mobile: '+91 98765 43210',
    year: '3rd Year', semester: '5', section: 'CSE 3A',
  })
  const update = (key: string, value: string) => setForm({ ...form, [key]: value })
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(form).some((x, i) => i !== 4 && !x)) return
    setCreated(true)
  }

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Create Student Accounts"
          actions={
            <Link href="/admin/students" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back to Students
            </Link>
          }
        />

        {/* Bulk import */}
        <Panel title="Import Excel / CSV (Bulk)" description="Create multiple student accounts at once.">
          <div className="m-5 rounded-xl border border-dashed border-violet-200 bg-violet-50/50 p-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <FileSpreadsheet className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-600 text-[#0B1F3A]">{file}</p>
                <p className="mt-0.5 text-xs text-[#64748B]">1,254 records selected</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-700 text-emerald-700">
                <Check className="size-4" /> Validated
              </span>
              <label className={secondaryButton}>
                <Upload className="size-4" /> Choose file
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  className="sr-only"
                  onChange={e => setFile(e.target.files?.[0]?.name || file)}
                />
              </label>
              <button className={secondaryButton}>Review Imported Data</button>
            </div>
          </div>
        </Panel>

        <div className="my-7 flex items-center gap-4 text-xs font-700 tracking-[0.2em] text-[#64748B]">
          <div className="h-px flex-1 bg-[#D9E0E8]" />
          OR
          <div className="h-px flex-1 bg-[#D9E0E8]" />
        </div>

        {/* Single student form */}
        <Panel
          title="Add Single Student (Exceptional Case)"
          description="Create one student account manually."
        >
          <form onSubmit={submit} className="p-5">
            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ['usn', 'USN'],
                  ['name', 'Full Name'],
                  ['department', 'Department'],
                  ['gender', 'Gender'],
                  ['mobile', 'Mobile (Optional)'],
                  ['year', 'Year'],
                  ['semester', 'Semester'],
                  ['section', 'Section'],
                ] as [string, string][]
              ).map(([key, label]) => (
                <label key={key} className="block">
                  <span className="text-[13px] font-600 text-[#374151]">
                    {label}
                    {key !== 'mobile' && <span className="text-[#C24141]"> *</span>}
                  </span>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={e => update(key, e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#D9E0E8] px-3 text-sm text-[#172033] outline-none placeholder:text-[#9CA3AF] focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-700 text-emerald-800">
                Temporary Password (Auto Generated)
              </p>
              <p className="mt-1 font-mono text-sm text-emerald-700">01CS128@123</p>
              <p className="mt-1 text-xs text-emerald-700">
                Student will change this temporary password on first login. Device registration
                happens automatically after password change.
              </p>
            </div>

            {created && (
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
                <Check className="size-4 text-emerald-600" />
                <p className="text-sm font-600 text-emerald-700">
                  Student account created successfully.
                </p>
              </div>
            )}

            <button className={`${primaryButton} mt-6`}>Create Account</button>
          </form>
        </Panel>
      </AdminContent>
    </AdminShell>
  )
}

// ── Faculty Page ──────────────────────────────────────────────────────────────
const faculty = [
  ['Prof. Rohit Sharma', 'FAC123', 'CSE', '8 Classes', 'Active'],
  ['Prof. Neha Joshi', 'FAC124', 'CSE', '6 Classes', 'Active'],
  ['Prof. Amit Verma', 'FAC125', 'ECE', '5 Classes', 'Active'],
  ['Prof. Pooja Singh', 'FAC126', 'ME', '4 Classes', 'Inactive'],
  ['Prof. Rahul Mehta', 'FAC127', 'IT', '3 Classes', 'Active'],
  ['Prof. Sneha Reddy', 'FAC128', 'CSE', '4 Classes', 'Active'],
]

export function FacultyPage() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = faculty.filter(f =>
    f.join(' ').toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Faculty Management"
          description="Manage faculty records, departments and assigned classes."
          actions={
            <button onClick={() => setOpen(true)} className={primaryButton}>
              <Plus className="size-4" /> Add Faculty
            </button>
          }
        />

        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[260px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by Faculty ID or Name"
              className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none placeholder:text-[#9CA3AF] focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
            />
          </div>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#1565D8]">
            <option>All Departments</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>ME</option>
            <option>IT</option>
          </select>
          <select className="h-11 rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#1565D8]">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <Panel>
          <div className="px-5 py-4">
            <h2 className="text-base font-700 text-[#0B1F3A]">Faculty Directory</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Total Faculty: <span className="font-700 text-[#0B1F3A]">156</span>
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                <tr>
                  <th className="px-5 py-3">Faculty</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Assigned</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.map(f => (
                  <tr key={f[1]} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-xs font-700 text-emerald-700">
                          {f[0]
                            .split(' ')
                            .slice(1)
                            .map(x => x[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-600 text-[#0B1F3A]">{f[0]}</p>
                          <p className="text-xs text-[#64748B]">{f[1]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#374151]">{f[2]}</td>
                    <td className="px-5 py-4 text-[13px] text-[#374151]">{f[3]}</td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={f[4] === 'Active' ? 'green' : 'red'}>{f[4]}</StatusBadge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setOpen(true)}
                        aria-label={`Edit ${f[0]}`}
                        className="rounded-lg p-2 text-[#64748B] hover:bg-[#EAF3FF] hover:text-[#1565D8] transition-colors"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Add Faculty modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F3A]/40 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-modal">
              <div className="flex items-center justify-between border-b border-[#D9E0E8] px-6 py-4">
                <div>
                  <h2 className="font-700 text-[#0B1F3A]">Create Faculty Profile</h2>
                  <p className="mt-0.5 text-xs text-[#64748B]">Enter faculty details below.</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-lg p-2 text-[#64748B] hover:bg-slate-50"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {[
                  ['Faculty ID', 'FAC128'],
                  ['Full Name', 'Prof. Sneha Reddy'],
                  ['Department', 'CSE'],
                  ['Email', 'sneha.reddy@college.edu.in'],
                  ['Mobile', '+91 99876 54321'],
                  ['Assigned Subjects / Classes', ''],
                ].map(([label, val], i) => (
                  <label key={label} className="block">
                    <span className="text-[13px] font-600 text-[#374151]">
                      {label}
                      {i < 5 && <span className="text-[#C24141]"> *</span>}
                    </span>
                    <input
                      defaultValue={val}
                      placeholder={i === 5 ? 'Select subjects / classes' : ''}
                      className="mt-2 h-11 w-full rounded-lg border border-[#D9E0E8] px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
                    />
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 border-t border-[#D9E0E8] px-6 py-4">
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
