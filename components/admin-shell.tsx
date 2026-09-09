'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3, Bell, BookOpen, CalendarDays, ChevronDown,
  ClipboardList, GraduationCap, LayoutDashboard, Menu,
  Search, Settings, ShieldCheck, UserCog, Users, X,
} from 'lucide-react'

// ── Navigation items ──────────────────────────────────────────────────────────
const primaryNav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/admin/students', icon: GraduationCap },
  { label: 'Faculty', href: '/admin/faculty', icon: Users },
  { label: 'Academic Master', href: '/admin/academic-master', icon: BookOpen },
  { label: 'Timetable', href: '/admin/timetable', icon: CalendarDays },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
]

const moreNav = [
  { label: 'Bulk Update', href: '/admin/bulk-update', icon: ClipboardList },
  { label: 'Users & Roles', href: '/admin/users', icon: UserCog },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Timetable Import', href: '/admin/timetable/import', icon: CalendarDays },
  { label: 'Timetable Publish', href: '/admin/timetable/publish', icon: CalendarDays },
]

// ── AdminShell ────────────────────────────────────────────────────────────────
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const active = (href: string) =>
    pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top Navigation ────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 w-full border-b border-border bg-white"
        style={{ boxShadow: '0 1px 0 #D9E0E8' }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className="flex shrink-0 items-center gap-2.5 mr-4"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#1565D8] text-white shadow-sm">
              <ShieldCheck className="size-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[15px] font-800 leading-tight tracking-tight text-[#0B1F3A]">
                <span className="font-bold">Smart</span>
                <span className="font-bold text-[#1565D8]">Attend</span>
              </p>
              <p className="text-[10px] font-600 tracking-[0.12em] text-[#64748B] uppercase">
                Admin Console
              </p>
            </div>
          </Link>

          {/* Primary nav — desktop */}
          <nav className="hidden xl:flex items-center gap-1 flex-1">
            {primaryNav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-600 transition-colors ${
                  active(item.href)
                    ? 'bg-[#EAF3FF] text-[#1565D8]'
                    : 'text-[#374151] hover:bg-slate-50 hover:text-[#0B1F3A]'
                }`}
              >
                {item.label}
                {active(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#1565D8]" />
                )}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-600 transition-colors ${
                  moreNav.some(n => active(n.href))
                    ? 'bg-[#EAF3FF] text-[#1565D8]'
                    : 'text-[#374151] hover:bg-slate-50 hover:text-[#0B1F3A]'
                }`}
              >
                More
                <ChevronDown className="size-3.5" />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                  <div className="absolute left-0 top-full mt-2 z-20 w-52 rounded-xl border border-border bg-white p-1.5 shadow-elevated">
                    {moreNav.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-500 transition-colors ${
                          active(item.href)
                            ? 'bg-[#EAF3FF] text-[#1565D8]'
                            : 'text-[#374151] hover:bg-slate-50'
                        }`}
                      >
                        <item.icon className="size-4 text-[#64748B]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1.5">
            {/* Search — desktop */}
            <div className="hidden md:flex items-center gap-2 h-9 rounded-lg border border-border bg-slate-50 px-3 w-48 lg:w-56">
              <Search className="size-3.5 text-[#64748B] shrink-0" />
              <input
                aria-label="Search"
                placeholder="Search anything..."
                className="w-full bg-transparent text-xs text-[#374151] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="relative flex size-9 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-50 hover:text-[#374151] transition-colors"
            >
              <Bell className="size-[18px]" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#C24141] ring-2 ring-white" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-[#EAF3FF] text-xs font-700 text-[#1565D8]">
                  AK
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[12.5px] font-600 text-[#0B1F3A] leading-tight">Anita Kulkarni</p>
                  <p className="text-[11px] text-[#64748B]">Super Admin</p>
                </div>
                <ChevronDown className="hidden sm:block size-3.5 text-[#64748B]" />
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-20 w-44 rounded-xl border border-border bg-white p-1.5 shadow-elevated">
                    <Link
                      href="/admin/settings"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-[#374151] hover:bg-slate-50"
                    >
                      View Profile
                    </Link>
                    <div className="my-1 h-px bg-border" />
                    <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#C24141] hover:bg-red-50">
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="flex xl:hidden size-9 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-50"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-[#0B1F3A]/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-modal overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#1565D8] text-white">
                  <ShieldCheck className="size-4" />
                </div>
                <p className="font-700 text-[#0B1F3A]">
                  <span>Smart</span>
                  <span className="text-[#1565D8]">Attend</span>
                </p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg p-2 text-[#64748B] hover:bg-slate-50"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              {[...primaryNav, ...moreNav].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-500 transition-colors ${
                    active(item.href)
                      ? 'bg-[#EAF3FF] text-[#1565D8] font-600'
                      : 'text-[#374151] hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* ── Page Content ───────────────────────────────────────────────────── */}
      <main>{children}</main>
    </div>
  )
}

// ── Shared layout helpers ─────────────────────────────────────────────────────
export function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-xs font-700 uppercase tracking-[0.12em] text-[#1565D8]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[28px] font-800 tracking-tight text-[#0B1F3A] leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-[#4B5563]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Panel({
  title,
  description,
  children,
  className = '',
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-white shadow-card ${className}`}
    >
      {title && (
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-700 text-[#0B1F3A]">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-[#64748B]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

export function StatusBadge({
  children,
  tone = 'green',
}: {
  children: React.ReactNode
  tone?: 'green' | 'red' | 'blue' | 'orange' | 'navy'
}) {
  const colors = {
    green:  'bg-emerald-50 text-emerald-700 border-emerald-100',
    red:    'bg-red-50 text-red-700 border-red-100',
    blue:   'bg-[#EAF3FF] text-[#1565D8] border-blue-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    navy:   'bg-[#F1F5F9] text-[#374151] border-[#D9E0E8]',
  }
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-700 uppercase tracking-wide ${colors[tone]}`}
    >
      {children}
    </span>
  )
}

// ── Button style exports ──────────────────────────────────────────────────────
export const buttonClass =
  'inline-flex h-[42px] items-center justify-center gap-2 rounded-lg px-4 text-[13.5px] font-600 transition-all duration-150'
export const primaryButton = `${buttonClass} bg-[#1565D8] text-white shadow-sm hover:bg-[#1250B0] active:scale-[0.98]`
export const secondaryButton = `${buttonClass} border border-border bg-white text-[#374151] hover:bg-slate-50 hover:border-[#9CA3AF] active:scale-[0.98]`
