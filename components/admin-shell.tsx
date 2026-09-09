'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3, Bell, BookOpen, CalendarDays, ChevronDown,
  ClipboardList, GraduationCap, LayoutDashboard, Menu,
  RefreshCcw, Search, Settings, Shield, UserCog, Users, X,
} from 'lucide-react'

// ─── Design Tokens (mirrors globals.css) ──────────────────────────────────────
export const C = {
  navy:          '#071B49',
  navyDark:      '#09204F',
  blue:          '#0B5CFF',
  blueBright:    '#1264F5',
  blueLight:     '#EAF3FF',
  blueFaint:     '#F5F9FF',
  pageBg:        '#F7FBFF',
  border:        '#D9E4F2',
  textPrimary:   '#071B49',
  textSecondary: '#243B64',
  textTertiary:  '#526887',
  green:         '#16A34A',
  greenLight:    '#E8F8EF',
  orange:        '#F59E0B',
  orangeLight:   '#FFF4DE',
  red:           '#EF4444',
  redLight:      '#FDECEC',
  purple:        '#6C3FF5',
  purpleLight:   '#F1ECFF',
  white:         '#FFFFFF',
} as const

// ─── Navigation definition ────────────────────────────────────────────────────
const primaryNav = [
  { label: 'Dashboard',         href: '/admin/dashboard',       icon: LayoutDashboard },
  { label: 'Students',          href: '/admin/students',         icon: GraduationCap   },
  { label: 'Faculty',           href: '/admin/faculty',          icon: Users            },
  { label: 'Academic Master',   href: '/admin/academic-master',  icon: BookOpen         },
  { label: 'Timetable',         href: '/admin/timetable',        icon: CalendarDays     },
  { label: 'Reports & Analytics', href: '/admin/reports',        icon: BarChart3        },
]

const moreNav = [
  { label: 'Bulk Update',        href: '/admin/bulk-update',          icon: RefreshCcw   },
  { label: 'Users & Roles',      href: '/admin/users',                icon: UserCog      },
  { label: 'Audit Logs',         href: '/admin/audit-logs',           icon: ClipboardList},
  { label: 'Settings',           href: '/admin/settings',             icon: Settings     },
  { label: 'Timetable Import',   href: '/admin/timetable/import',     icon: CalendarDays },
  { label: 'Timetable Publish',  href: '/admin/timetable/publish',    icon: CalendarDays },
]

// ─── AdminShell ───────────────────────────────────────────────────────────────
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [moreOpen,    setMoreOpen]    = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))

  const isMoreActive = moreNav.some(n => isActive(n.href))

  return (
    <div className="min-h-screen" style={{ background: C.pageBg }}>

      {/* ── Top Navigation Bar ───────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 w-full bg-white"
        style={{ borderBottom: `1px solid ${C.border}`, boxShadow: '0 1px 0 #D9E4F2' }}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-5 px-5 lg:px-8">

          {/* Logo */}
          <Link href="/admin/dashboard" className="flex shrink-0 items-center gap-2.5 mr-3">
            <div
              className="flex size-8 items-center justify-center rounded-lg"
              style={{ background: C.blue }}
            >
              <Shield className="size-4 text-white" />
            </div>
            <div>
              <p className="text-[15px] font-bold leading-tight" style={{ color: C.navy }}>
                Smart<span style={{ color: C.blue }}>Attend</span>
              </p>
              <p className="hidden sm:block text-[10px] font-medium tracking-widest uppercase" style={{ color: C.textTertiary }}>
                ABC Engineering College
              </p>
            </div>
          </Link>

          {/* Primary nav — desktop */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {primaryNav.map(item => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors"
                  style={{
                    color:      active ? C.blue   : C.textSecondary,
                    background: active ? C.blueLight : 'transparent',
                    fontWeight: active ? 600 : 500,
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = C.navy }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = C.textSecondary }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full"
                      style={{ background: C.blue }}
                    />
                  )}
                </Link>
              )
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13.5px] transition-colors"
                style={{
                  color:      isMoreActive ? C.blue      : C.textSecondary,
                  background: isMoreActive ? C.blueLight : 'transparent',
                  fontWeight: isMoreActive ? 600 : 500,
                }}
              >
                More
                <ChevronDown
                  className="size-3.5 transition-transform"
                  style={{ transform: moreOpen ? 'rotate(180deg)' : 'none' }}
                />
                {isMoreActive && (
                  <span
                    className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full"
                    style={{ background: C.blue }}
                  />
                )}
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                  <div
                    className="absolute left-0 top-full mt-2 z-20 w-56 rounded-xl p-1.5"
                    style={{
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      boxShadow: '0 8px 32px rgba(7,27,73,0.12)',
                    }}
                  >
                    {moreNav.map(item => {
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors"
                          style={{
                            color:      active ? C.blue      : C.textSecondary,
                            background: active ? C.blueLight : 'transparent',
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          <item.icon className="size-[15px]" style={{ color: active ? C.blue : C.textTertiary }} />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right section */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 h-9 rounded-lg px-3 w-44 lg:w-52"
              style={{ border: `1px solid ${C.border}`, background: C.blueFaint }}
            >
              <Search className="size-3.5 shrink-0" style={{ color: C.textTertiary }} />
              <input
                aria-label="Search"
                placeholder="Search..."
                className="w-full bg-transparent text-[13px] outline-none"
                style={{ color: C.textPrimary }}
              />
            </div>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="relative flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-[#EAF3FF]"
              style={{ color: C.textTertiary }}
            >
              <Bell className="size-[18px]" />
              <span
                className="absolute right-1.5 top-1.5 size-2 rounded-full ring-2 ring-white"
                style={{ background: C.red }}
              />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#F5F9FF]"
              >
                <div
                  className="flex size-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: C.blue }}
                >
                  AK
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[12.5px] font-semibold leading-tight" style={{ color: C.navy }}>
                    Anita Kulkarni
                  </p>
                  <p className="text-[11px]" style={{ color: C.textTertiary }}>Super Admin</p>
                </div>
                <ChevronDown className="hidden sm:block size-3.5" style={{ color: C.textTertiary }} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-2 z-20 w-44 rounded-xl p-1.5"
                    style={{
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      boxShadow: '0 8px 32px rgba(7,27,73,0.12)',
                    }}
                  >
                    <Link
                      href="/admin/settings"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#F5F9FF]"
                      style={{ color: C.textSecondary }}
                    >
                      View Profile
                    </Link>
                    <div className="my-1 h-px" style={{ background: C.border }} />
                    <button
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-red-50"
                      style={{ color: C.red }}
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden size-9 items-center justify-center rounded-lg transition-colors hover:bg-[#EAF3FF]"
              style={{ color: C.textTertiary }}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(7,27,73,0.35)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed inset-y-0 right-0 z-50 w-72 overflow-y-auto"
            style={{ background: C.white }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg" style={{ background: C.blue }}>
                  <Shield className="size-4 text-white" />
                </div>
                <p className="font-bold" style={{ color: C.navy }}>
                  Smart<span style={{ color: C.blue }}>Attend</span>
                </p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg p-2 transition-colors hover:bg-[#F5F9FF]"
                style={{ color: C.textTertiary }}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              {[...primaryNav, ...moreNav].map(item => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors"
                    style={{
                      color:      active ? C.blue      : C.textSecondary,
                      background: active ? C.blueLight : 'transparent',
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <item.icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </>
      )}

      {/* ── Page ─────────────────────────────────────────────────────────────── */}
      <main>{children}</main>
    </div>
  )
}

// ─── Shared layout components ─────────────────────────────────────────────────

export function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  eyebrow?: string
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: C.blue }}>
            {eyebrow}
          </p>
        )}
        <h1 className="text-[26px] font-bold leading-tight" style={{ color: C.navy }}>
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-[14px]" style={{ color: C.textSecondary }}>
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

export function Panel({
  title,
  description,
  children,
  className = '',
  noPad = false,
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  noPad?: boolean
}) {
  return (
    <section
      className={`rounded-xl bg-white ${className}`}
      style={{ border: `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(7,27,73,0.05)' }}
    >
      {title && (
        <div
          className="px-5 py-4"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>{title}</h2>
          {description && (
            <p className="mt-0.5 text-[13px]" style={{ color: C.textTertiary }}>{description}</p>
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
  tone?: 'green' | 'red' | 'blue' | 'orange' | 'navy' | 'purple'
}) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    green:  { bg: '#E8F8EF', text: '#14532D', border: '#BBF7D0' },
    red:    { bg: '#FDECEC', text: '#991B1B', border: '#FECACA' },
    blue:   { bg: '#EAF3FF', text: '#1E40AF', border: '#BFDBFE' },
    orange: { bg: '#FFF4DE', text: '#92400E', border: '#FED7AA' },
    navy:   { bg: '#F5F9FF', text: '#243B64', border: '#D9E4F2' },
    purple: { bg: '#F1ECFF', text: '#4C1D95', border: '#DDD6FE' },
  }
  const s = styles[tone]
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-[3px] text-[11.5px] font-semibold"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {children}
    </span>
  )
}

// ─── Button exports ───────────────────────────────────────────────────────────
export const primaryButton =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0B5CFF] px-4 text-[13.5px] font-semibold text-white transition-all hover:bg-[#0A50E0] active:scale-[0.98] shadow-sm'

export const secondaryButton =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#D9E4F2] bg-white px-4 text-[13.5px] font-medium text-[#243B64] transition-all hover:border-[#0B5CFF] hover:text-[#0B5CFF] hover:bg-[#F5F9FF] active:scale-[0.98]'

export const dangerButton =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#EF4444] px-4 text-[13.5px] font-semibold text-white transition-all hover:bg-[#DC2626] active:scale-[0.98]'
