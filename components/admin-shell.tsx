'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3, Bell, BookOpen, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardList, FileText, GraduationCap, LayoutDashboard, Menu, Settings, ShieldCheck,
  UserCog, Users, X, Search,
} from 'lucide-react'

const navGroups = [
  { label: 'Overview', items: [{ label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }] },
  { label: 'Management', items: [
    { label: 'Students', href: '/admin/students', icon: GraduationCap },
    { label: 'Faculty', href: '/admin/faculty', icon: Users },
    { label: 'Academic Master', href: '/admin/academic-master', icon: BookOpen },
    { label: 'Timetable', href: '/admin/timetable', icon: CalendarDays },
  ]},
  { label: 'Administration', items: [
    { label: 'Users & Roles', href: '/admin/users', icon: UserCog },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
  ]},
  { label: 'System', items: [{ label: 'Settings', href: '/admin/settings', icon: Settings }] },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const active = (href: string) => pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
  return <div className="min-h-screen bg-background text-foreground">
    {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-navy/40 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-white transition-transform duration-200 ${collapsed ? 'lg:w-[76px]' : ''} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-5"><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white"><ShieldCheck className="size-5" /></div><div className={collapsed ? 'lg:hidden' : ''}><p className="text-[15px] font-bold">SmartAttend</p><p className="text-[11px] text-blue-100/70">ADMIN CONSOLE</p></div><button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="ml-auto rounded-md p-1.5 text-blue-100 hover:bg-white/10 lg:hidden"><X className="size-5" /></button></div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">{navGroups.map(group => <div key={group.label}><p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-100/50 ${collapsed ? 'lg:hidden' : ''}`}>{group.label}</p><div className="space-y-1">{group.items.map(item => { const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${active(item.href) ? 'bg-blue-600 text-white' : 'text-blue-50/75 hover:bg-white/10 hover:text-white'}`}><Icon className="size-[18px] shrink-0" /><span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span></Link> })}</div></div>)}</nav>
      <div className="border-t border-white/10 p-3"><button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs text-blue-100/60 hover:bg-white/10"><BookOpen className="size-4" /><span className={collapsed ? 'lg:hidden' : ''}>Engineering College</span><ChevronDown className="ml-auto size-3.5" /></button></div>
    </aside>
    <div className={`transition-[padding] duration-200 ${collapsed ? 'lg:pl-[76px]' : 'lg:pl-64'}`}>
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8"><div className="flex items-center gap-3"><button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"><Menu className="size-5" /></button><button aria-label="Collapse navigation" onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted lg:block">{collapsed ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}</button><div className="hidden h-5 w-px bg-border lg:block" /><div><p className="text-xs text-muted-foreground">Wednesday, September 10, 2025</p><p className="text-sm font-semibold text-navy">Good morning, Administrator</p></div></div><div className="flex items-center gap-2 sm:gap-4"><div className="hidden items-center gap-2 rounded-lg border border-border bg-slate-50 px-3 py-2 md:flex md:w-56"><Search className="size-4 text-muted-foreground" /><input aria-label="Search anything" className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground" placeholder="Search anything..." /></div><button aria-label="Notifications" className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted"><Bell className="size-[19px]" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-500" /></button><div className="relative"><button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted"><div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">AK</div><div className="hidden text-left sm:block"><p className="text-xs font-semibold text-navy">Anita Kulkarni</p><p className="text-[11px] text-muted-foreground">Super Admin</p></div><ChevronDown className="hidden size-4 text-muted-foreground sm:block" /></button>{profileOpen && <div className="absolute right-0 top-12 w-44 rounded-xl border border-border bg-white p-1.5 shadow-lg"><Link href="/admin/settings" className="block rounded-lg px-3 py-2 text-xs hover:bg-muted">View profile</Link><button className="w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-muted">Sign out</button></div>}</div></div></header>
      <main>{children}</main>
    </div>
  </div>
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) { return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <p className="mb-1 text-sm font-medium text-blue-600">{eyebrow}</p>}<h1 className="text-[28px] font-bold tracking-tight text-navy">{title}</h1>{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</div>{actions && <div className="flex flex-wrap gap-2">{actions}</div>}</div> }

export const buttonClass = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors'
export const secondaryButton = `${buttonClass} border border-border bg-white text-slate-700 hover:bg-slate-50`
export const primaryButton = `${buttonClass} bg-blue-600 text-white shadow-sm hover:bg-blue-700`
export function AdminContent({ children }: { children: React.ReactNode }) { return <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8">{children}</div> }
export function StatusBadge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'red' | 'blue' | 'orange' }) { const colors = { green: 'bg-emerald-50 text-emerald-700', red: 'bg-red-50 text-red-700', blue: 'bg-blue-50 text-blue-700', orange: 'bg-orange-50 text-orange-700' }; return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[tone]}`}>{children}</span> }

export function Panel({ title, description, children, className = '' }: { title?: string; description?: string; children: React.ReactNode; className?: string }) { return <section className={`rounded-xl border border-border bg-white shadow-card ${className}`}>{title && <div className="border-b border-border px-5 py-4"><h2 className="text-base font-semibold text-navy">{title}</h2>{description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}</div>}{children}</section> }

