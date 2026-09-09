'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertTriangle, ArrowLeft, BookOpen, Check, CheckCircle2,
  ChevronDown, CloudUpload, Edit3, FileSpreadsheet,
  Laptop, Monitor, Plus, Save, Search, Shield,
  Smartphone, Upload, Users, X,
} from 'lucide-react'
import {
  AdminContent, AdminShell, C, PageHeader, Panel,
  primaryButton, secondaryButton, StatusBadge,
} from './admin-shell'

// ─── Shared helpers ───────────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="block text-[13px] font-medium mb-1.5" style={{ color: C.textSecondary }}>
      {children}
      {required && <span className="ml-0.5" style={{ color: C.red }}>*</span>}
    </span>
  )
}

function Field({ label, value, onChange, options, required = true, placeholder }: {
  label: string; value: string; onChange?: (v: string) => void
  options?: string[]; required?: boolean; placeholder?: string
}) {
  const cls = "h-10 w-full rounded-lg border bg-white text-[13.5px] outline-none transition-all"
  const style: React.CSSProperties = { borderColor: C.border, color: C.textPrimary, paddingLeft: '0.75rem', paddingRight: options ? '2rem' : '0.75rem' }
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      {options ? (
        <div className="relative">
          <select value={value} onChange={e => onChange?.(e.target.value)}
            className={cls} style={style}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2" style={{ color: C.textTertiary }} />
        </div>
      ) : (
        <input value={value} onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cls} style={{ ...style, paddingRight: '0.75rem' }}
          onFocus={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(11,92,255,0.10)` }}
          onBlur={e =>  { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none' }}
        />
      )}
    </label>
  )
}

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
          <button aria-label="Close" onClick={onClose} className="ml-4 mt-0.5 rounded-lg p-1.5 hover:bg-[#F5F9FF]" style={{ color: C.textTertiary }}>
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

function Toast({ message, tone = 'green' }: { message: string; tone?: 'green' | 'blue' }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-[13.5px] font-semibold shadow-[0_20px_60px_rgba(7,27,73,0.18)]"
      style={{ background: tone === 'green' ? C.green : C.blue, color: C.white }}
    >
      <CheckCircle2 className="size-4" />
      {message}
    </div>
  )
}

function Notice({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'orange' | 'green' }) {
  const s = tone === 'blue'   ? { bg: C.blueLight,   border: '#BFDBFE', text: C.textSecondary } :
            tone === 'orange' ? { bg: C.orangeLight,  border: '#FED7AA', text: '#92400E' } :
                               { bg: C.greenLight,   border: '#BBF7D0', text: '#14532D' }
  return (
    <div className="flex items-start gap-3 rounded-xl p-4 text-[13px]" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
      <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}

// ─── Academic Master ──────────────────────────────────────────────────────────
const masterNav = [
  { key: 'departments', label: 'Departments', icon: BookOpen   },
  { key: 'subjects',    label: 'Subjects',    icon: FileSpreadsheet },
  { key: 'sections',    label: 'Sections',    icon: Users      },
  { key: 'rooms',       label: 'Rooms',       icon: Monitor    },
]

const departments = [
  { code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. Ramesh Kumar',   subjects: 24, status: 'Active' },
  { code: 'ECE', name: 'Electronics & Communication',    hod: 'Dr. Anita Sharma',   subjects: 22, status: 'Active' },
  { code: 'ME',  name: 'Mechanical Engineering',         hod: 'Dr. Suresh Rao',     subjects: 18, status: 'Active' },
  { code: 'CE',  name: 'Civil Engineering',              hod: 'Dr. Priya Nair',     subjects: 16, status: 'Active' },
  { code: 'IT',  name: 'Information Technology',         hod: 'Dr. Neha Joshi',     subjects: 20, status: 'Active' },
  { code: 'AE',  name: 'Artificial Intelligence',        hod: 'Dr. Rajesh Mehta',   subjects: 14, status: 'Active' },
]

export function AcademicMasterPage() {
  const [activeNav, setActiveNav] = useState('departments')
  const [modal, setModal]         = useState<'add' | 'edit' | null>(null)
  const [toast, setToast]         = useState(false)
  const [editRow, setEditRow]     = useState(departments[0])

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Academic Master"
          description="Manage departments, subjects, sections and rooms."
        />

        <div className="flex gap-6">
          {/* Left sidebar nav */}
          <div
            className="w-52 shrink-0 rounded-xl bg-white self-start"
            style={{ border: `1px solid ${C.border}`, boxShadow: '0 2px 10px rgba(7,27,73,0.05)' }}
          >
            <div className="p-3 space-y-0.5">
              {masterNav.map(item => {
                const active = activeNav === item.key
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors text-left"
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

          {/* Right content */}
          <div className="flex-1 min-w-0">
            <Panel>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>Departments</h2>
                  <p className="mt-0.5 text-[13px]" style={{ color: C.textTertiary }}>
                    Total: <span className="font-semibold" style={{ color: C.navy }}>6 Departments</span>
                  </p>
                </div>
                <button onClick={() => setModal('add')} className={primaryButton}>
                  <Plus className="size-4" /> Add Department
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                    <tr>
                      {['#','Dept. Code','Department Name','HOD','Total Subjects','Status','Actions'].map((h, i) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide"
                          style={{ color: C.textSecondary, textAlign: i === 6 ? 'right' : 'left' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, i) => (
                      <tr
                        key={dept.code}
                        style={{ borderBottom: `1px solid ${C.border}` }}
                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                      >
                        <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                        <td className="px-5 py-[14px]">
                          <span
                            className="rounded-lg px-2.5 py-1 text-[12px] font-bold"
                            style={{ background: C.blueLight, color: C.blue }}
                          >
                            {dept.code}
                          </span>
                        </td>
                        <td className="px-5 py-[14px] text-[13.5px] font-medium" style={{ color: C.navy }}>{dept.name}</td>
                        <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{dept.hod}</td>
                        <td className="px-5 py-[14px] text-[13px] font-medium" style={{ color: C.navy }}>{dept.subjects}</td>
                        <td className="px-5 py-[14px]"><StatusBadge tone="green">{dept.status}</StatusBadge></td>
                        <td className="px-5 py-[14px] text-right">
                          <button
                            onClick={() => { setEditRow(dept); setModal('edit') }}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-medium transition-colors hover:bg-[#EAF3FF]"
                            style={{ borderColor: C.border, color: C.blue }}
                          >
                            <Edit3 className="size-3.5" /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </div>
      </AdminContent>

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Department' : `Edit — ${editRow.code}`}
          subtitle={modal === 'edit' ? editRow.name : undefined}
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            <Field label="Department Code"  value={modal === 'edit' ? editRow.code : ''}  onChange={() => {}} required />
            <Field label="Department Name"  value={modal === 'edit' ? editRow.name : ''}  onChange={() => {}} required />
            <Field label="Head of Department (HOD)" value={modal === 'edit' ? editRow.hod : ''} onChange={() => {}} required />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModal(null)} className={secondaryButton}>Cancel</button>
              <button onClick={() => { setModal(null); setToast(true) }} className={primaryButton}>
                <Save className="size-4" /> Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
      {toast && <Toast message="Changes saved successfully." />}
    </AdminShell>
  )
}

// ─── Timetable Management ─────────────────────────────────────────────────────
const timetableRows = [
  { id: 1, time: '10:00 AM – 11:00 AM', subject: 'Data Structures',  code: 'CS301', type: 'Theory', faculty: 'Prof. Rohit Sharma', room: '201' },
  { id: 2, time: '11:15 AM – 12:15 PM', subject: 'Digital Logic',    code: 'CS302', type: 'Theory', faculty: 'Prof. Neha Joshi',   room: '203' },
  { id: 3, time: '02:00 PM – 03:00 PM', subject: 'Mathematics',      code: 'MA303', type: 'Theory', faculty: 'Prof. Amit Verma',   room: '205' },
  { id: 4, time: '03:15 PM – 04:15 PM', subject: 'Operating Systems',code: 'CS304', type: 'Lab',    faculty: 'Prof. Pooja Singh',  room: 'Lab 2' },
]

export function TimetablePage() {
  const [selected, setSelected] = useState<number[]>([])
  const [editing, setEditing]   = useState<typeof timetableRows[0] | null>(null)
  const [toast, setToast]       = useState(false)

  const toggleRow = (id: number) =>
    setSelected(cur => cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id])

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Timetable Management"
          description="Create, view, edit and manage class timetable records."
          actions={
            <>
              <Link href="/admin/timetable/import" className={secondaryButton}>
                <Upload className="size-4" /> Import Timetable
              </Link>
              <Link href="/admin/timetable/publish" className={primaryButton}>
                Publish Timetable
              </Link>
            </>
          }
        />

        {/* Filter row */}
        <div className="mb-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'Department', opts: ['CSE','ECE','IT'] },
            { label: 'Year',       opts: ['3rd Year','2nd Year'] },
            { label: 'Semester',   opts: ['5','4','3'] },
            { label: 'Section',    opts: ['CSE 3A','CSE 3B'] },
            { label: 'Day',        opts: ['Monday','Tuesday','Wednesday','Thursday','Friday'] },
          ].map(f => (
            <Field key={f.label} label={f.label} value={f.opts[0]} options={f.opts} required={false} />
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <StatusBadge tone="orange">Draft</StatusBadge>
            <span className="text-[12.5px]" style={{ color: C.textTertiary }}>
              Last Updated: 20 May 2024, 10:30 AM
            </span>
          </div>
          <button
            disabled={!selected.length}
            className={`${secondaryButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Edit Selected ({selected.length})
          </button>
        </div>

        <Panel>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                <tr>
                  <th className="w-12 px-5 py-3" />
                  {['#','Time Slot','Subject','Faculty','Room','Actions'].map((h, i) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[11.5px] font-semibold uppercase tracking-wide"
                      style={{ color: C.textSecondary, textAlign: i === 5 ? 'right' : 'left' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableRows.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.blueFaint}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = selected.includes(row.id) ? C.blueLight + '40' : 'transparent'}
                  >
                    <td className="px-5 py-[14px]">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="size-4 rounded"
                        style={{ accentColor: C.blue }}
                      />
                    </td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                    <td className="px-5 py-[14px]">
                      <p className="text-[13.5px] font-semibold whitespace-nowrap" style={{ color: C.navy }}>{row.time}</p>
                    </td>
                    <td className="px-5 py-[14px]">
                      <p className="text-[13.5px] font-medium" style={{ color: C.navy }}>{row.subject}</p>
                      <p className="mt-0.5 text-[12px]" style={{ color: C.textTertiary }}>
                        {row.code} · {row.type}
                      </p>
                    </td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>{row.faculty}</td>
                    <td className="px-5 py-[14px] text-[13px]" style={{ color: C.textSecondary }}>Room {row.room}</td>
                    <td className="px-5 py-[14px] text-right">
                      <button
                        onClick={() => setEditing(row)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-medium transition-colors hover:bg-[#EAF3FF]"
                        style={{ borderColor: C.border, color: C.blue }}
                      >
                        <Edit3 className="size-3.5" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-[13px]" style={{ color: C.textTertiary }}>Showing 4 of 48 entries</p>
            <div className="flex gap-1">
              {[1, 2, 3, '…', 6].map((p, i) => (
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
      </AdminContent>

      {editing && (
        <Modal title="Edit Timetable Entry" onClose={() => setEditing(null)}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Department', opts: ['CSE','ECE','IT'] },
              { label: 'Year',       opts: ['3rd Year','2nd Year'] },
              { label: 'Semester',   opts: ['5','4'] },
              { label: 'Section',    opts: ['CSE 3A','CSE 3B'] },
            ].map(f => <Field key={f.label} label={f.label} value={f.opts[0]} options={f.opts} />)}
            <Field label="Subject"    value={editing.subject} onChange={() => {}} />
            <Field label="Subject Code" value={editing.code} onChange={() => {}} />
            <Field label="Faculty"    value={editing.faculty} onChange={() => {}} />
            <Field label="Room"       value={editing.room}   onChange={() => {}} />
            <Field label="Day"        value="Monday"         options={['Monday','Tuesday','Wednesday','Thursday','Friday']} />
            <Field label="Start Time" value="10:00 AM"       onChange={() => {}} />
            <Field label="End Time"   value="11:00 AM"       onChange={() => {}} />
            <Field label="Class Type" value={editing.type}   options={['Theory','Lab']} />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className={secondaryButton}>Cancel</button>
            <button onClick={() => { setEditing(null); setToast(true) }} className={primaryButton}>
              Save Changes
            </button>
          </div>
        </Modal>
      )}
      {toast && <Toast message="Timetable entry updated." />}
    </AdminShell>
  )
}

// ─── Timetable Import ─────────────────────────────────────────────────────────
const recentImports = [
  { file: 'timetable_sem5_2026.xlsx', date: '20 May 2024, 10:30 AM', records: 248, status: 'Success' },
  { file: 'timetable_sem4_2026.csv',  date: '15 May 2024, 03:15 PM', records: 192, status: 'Success' },
  { file: 'timetable_sem3_2026.xlsx', date: '10 May 2024, 09:00 AM', records: 0,   status: 'Failed'  },
]

export function TimetableImportPage() {
  const [file, setFile]         = useState<string | null>(null)
  const [preview, setPreview]   = useState(false)
  const [imported, setImported] = useState(false)
  const [dragging, setDragging] = useState(false)

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Import Timetable"
          description="Upload timetable data using an Excel or CSV file."
          actions={
            <Link href="/admin/timetable" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Upload area */}
          <div className="space-y-5">
            {/* Dropzone */}
            <Panel>
              <div
                className="m-5 flex flex-col items-center justify-center rounded-xl p-10 text-center transition-all"
                style={{
                  border: `2px dashed ${dragging ? C.blue : C.border}`,
                  background: dragging ? C.blueLight : C.blueFaint,
                }}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f.name) }}
              >
                <div
                  className="flex size-14 items-center justify-center rounded-2xl mb-4"
                  style={{ background: C.blueLight }}
                >
                  <CloudUpload className="size-7" style={{ color: C.blue }} />
                </div>
                <p className="text-[15px] font-semibold" style={{ color: C.navy }}>
                  {file ? file : 'Drag & drop your file here'}
                </p>
                <p className="mt-1.5 text-[13px]" style={{ color: C.textTertiary }}>
                  {file ? `File ready to import` : 'or click to browse'}
                </p>
                <p className="mt-3 text-[12px]" style={{ color: C.textTertiary }}>
                  Supported formats: .xlsx, .xls, .csv · Max size: 10 MB
                </p>
                <label className={`${primaryButton} mt-5 cursor-pointer`}>
                  <Upload className="size-4" />
                  {file ? 'Change File' : 'Choose File'}
                  <input type="file" accept=".xlsx,.xls,.csv" className="sr-only"
                    onChange={e => setFile(e.target.files?.[0]?.name || null)} />
                </label>
              </div>

              {file && (
                <div className="mx-5 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl p-4" style={{ background: C.greenLight, border: `1px solid #BBF7D0` }}>
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="size-4 shrink-0" style={{ color: C.green }} />
                    <span className="text-[13.5px] font-semibold" style={{ color: '#14532D' }}>{file}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setPreview(true)} className={secondaryButton}>Preview Data</button>
                    <button onClick={() => setImported(true)} className={primaryButton}>Import as Draft</button>
                  </div>
                </div>
              )}
            </Panel>

            {/* Preview table */}
            {preview && (
              <Panel title="Data Preview" description="Sample rows from your uploaded file.">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left">
                    <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                      <tr>
                        {['Dept','Year','Sem','Section','Subject','Faculty','Room','Day','Time','Type'].map(h => (
                          <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textSecondary }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['CSE','3rd','5','CSE 3A','Data Structures','Prof. Rohit Sharma','201','Monday','10:00–11:00','Theory'],
                        ['CSE','3rd','5','CSE 3A','Digital Logic',   'Prof. Neha Joshi',  '203','Monday','11:15–12:15','Theory'],
                      ].map(row => (
                        <tr key={row[4]} style={{ borderBottom: `1px solid ${C.border}` }}>
                          {row.map((cell, i) => (
                            <td key={i} className="px-4 py-[12px] text-[13px] whitespace-nowrap" style={{ color: C.textSecondary }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            )}

            {imported && <Notice tone="green">Timetable imported as Draft. Go to Timetable Management to review before publishing.</Notice>}

            {/* Recent imports */}
            <Panel title="Recent Imports">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                    <tr>
                      {['#','File Name','Imported On','Records','Status','Actions'].map(h => (
                        <th key={h} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textSecondary }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentImports.map((r, i) => (
                      <tr key={r.file} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td className="px-5 py-[13px] text-[13px]" style={{ color: C.textTertiary }}>{i + 1}</td>
                        <td className="px-5 py-[13px] text-[13px] font-medium" style={{ color: C.navy }}>{r.file}</td>
                        <td className="px-5 py-[13px] text-[13px]" style={{ color: C.textSecondary }}>{r.date}</td>
                        <td className="px-5 py-[13px] text-[13px] font-semibold" style={{ color: C.navy }}>{r.records}</td>
                        <td className="px-5 py-[13px]">
                          <StatusBadge tone={r.status === 'Success' ? 'green' : 'red'}>{r.status}</StatusBadge>
                        </td>
                        <td className="px-5 py-[13px]">
                          <button className="text-[12.5px] font-medium transition-colors hover:underline" style={{ color: C.blue }}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          {/* Right guidelines */}
          <div className="space-y-4">
            <Panel title="Import Guidelines">
              <div className="p-5 space-y-3">
                {[
                  'Use the provided template format',
                  'Ensure correct column names',
                  'Required: Department, Year, Semester, Section, Day, Time, Subject, Faculty, Room',
                  'Check for duplicate entries before importing',
                  'Review data before publishing',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: C.blueLight }}
                    >
                      <Check className="size-3" style={{ color: C.blue }} />
                    </div>
                    <p className="text-[13px]" style={{ color: C.textSecondary }}>{tip}</p>
                  </div>
                ))}
                <button className={`${secondaryButton} w-full mt-2`}>
                  <FileSpreadsheet className="size-4" /> Download Template
                </button>
              </div>
            </Panel>

            <Notice>
              Imported data will remain as Draft until reviewed and published by an admin.
            </Notice>
          </div>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ─── Bulk Academic Update ─────────────────────────────────────────────────────
const bulkStudents = [
  { usn: '01CS123', name: 'Rahul Sharma',  info: 'CSE 1A · Sem 2' },
  { usn: '01CS124', name: 'Ananya Singh',  info: 'CSE 1A · Sem 2' },
  { usn: '01CS125', name: 'Vikram Patel',  info: 'CSE 1A · Sem 2' },
  { usn: '01CS190', name: 'Neha Verma',    info: 'CSE 1A · Sem 2' },
  { usn: '01CS191', name: 'Arjun Kumar',   info: 'CSE 1A · Sem 2' },
  { usn: '01CS192', name: 'Ishita Rao',    info: 'CSE 1A · Sem 2' },
  { usn: '01CS193', name: 'Karan Shah',    info: 'CSE 1A · Sem 2' },
]

const steps = [
  { n: 1, label: 'Select Students' },
  { n: 2, label: 'Choose Updates'  },
  { n: 3, label: 'Preview & Confirm' },
]

export function BulkAcademicUpdatePage() {
  const [checked,  setChecked]  = useState(bulkStudents.map(s => s.usn))
  const [step,     setStep]     = useState(1)
  const [confirm,  setConfirm]  = useState(false)
  const [done,     setDone]     = useState(false)
  const [newYear,  setNewYear]  = useState('2nd Year')
  const [newSem,   setNewSem]   = useState('3')
  const [newSec,   setNewSec]   = useState('CSE 3A')

  const toggle = (usn: string) =>
    setChecked(cur => cur.includes(usn) ? cur.filter(x => x !== usn) : [...cur, usn])

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Bulk Academic Update"
          description="Update year, semester or section for multiple students at once."
        />

        {/* Step indicator */}
        <div className="mb-7 flex items-center gap-0">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex size-8 items-center justify-center rounded-full text-[13px] font-bold border-2 transition-all"
                  style={
                    step === s.n
                      ? { background: C.blue, borderColor: C.blue, color: C.white }
                      : step > s.n
                      ? { background: C.green, borderColor: C.green, color: C.white }
                      : { background: C.white, borderColor: C.border, color: C.textTertiary }
                  }
                >
                  {step > s.n ? <Check className="size-3.5" /> : s.n}
                </div>
                <span
                  className="text-[13px] font-medium"
                  style={{ color: step === s.n ? C.navy : C.textTertiary }}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-4 h-px w-16 flex-1" style={{ background: step > s.n ? C.green : C.border }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left — select students */}
          <div className="space-y-4">
            <Panel title="Filter Current Students">
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <Field label="Department"  value="CSE"    options={['CSE','ECE','IT','ME']} />
                <Field label="Current Year"    value="1st Year"  options={['1st Year','2nd Year','3rd Year']} />
                <Field label="Current Semester" value="2"  options={['1','2','3','4']} />
                <Field label="Current Section" value="CSE 1A" options={['CSE 1A','CSE 1B']} />
              </div>
            </Panel>

            <Panel>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <h2 className="text-[15px] font-semibold" style={{ color: C.navy }}>Select Students</h2>
                  <p className="mt-0.5 text-[13px] font-semibold" style={{ color: C.green }}>
                    {checked.length === bulkStudents.length ? '68' : checked.length} students selected
                  </p>
                </div>
                <button
                  onClick={() => setChecked(checked.length ? [] : bulkStudents.map(s => s.usn))}
                  className={secondaryButton}
                >
                  {checked.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead style={{ background: '#F4F8FD', borderBottom: `1px solid ${C.border}` }}>
                    <tr>
                      <th className="w-12 px-5 py-3" />
                      {['USN','Student Name','Current Info','Status'].map(h => (
                        <th key={h} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textSecondary }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bulkStudents.map(s => {
                      const sel = checked.includes(s.usn)
                      return (
                        <tr
                          key={s.usn}
                          style={{ borderBottom: `1px solid ${C.border}`, background: sel ? '#EAF3FF40' : 'transparent' }}
                          onClick={() => toggle(s.usn)}
                          className="cursor-pointer"
                        >
                          <td className="px-5 py-[13px]">
                            <input type="checkbox" checked={sel} onChange={() => toggle(s.usn)} className="size-4 rounded" style={{ accentColor: C.blue }} />
                          </td>
                          <td className="px-5 py-[13px] text-[13px] font-semibold" style={{ color: C.navy }}>{s.usn}</td>
                          <td className="px-5 py-[13px] text-[13px]" style={{ color: C.textSecondary }}>{s.name}</td>
                          <td className="px-5 py-[13px] text-[13px]" style={{ color: C.textTertiary }}>{s.info}</td>
                          <td className="px-5 py-[13px]">
                            <StatusBadge tone={sel ? 'blue' : 'navy'}>{sel ? 'Selected' : 'Not selected'}</StatusBadge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          {/* Right — new academic details */}
          <div className="space-y-4">
            <Panel title="Set New Academic Details">
              <div className="space-y-4 p-5">
                <Field label="New Year"     value={newYear} onChange={setNewYear} options={['2nd Year','3rd Year','4th Year']} />
                <Field label="New Semester" value={newSem}  onChange={setNewSem}  options={['3','4','5','6']} />
                <Field label="New Section"  value={newSec}  onChange={setNewSec}  options={['CSE 3A','CSE 3B','CSE 3C']} />

                <div className="rounded-xl p-4" style={{ background: C.blueLight, border: `1px solid #BFDBFE` }}>
                  <p className="text-[12.5px] font-semibold" style={{ color: C.navy }}>Change Preview</p>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="rounded-lg border px-2.5 py-1.5 text-[12px]" style={{ borderColor: C.border, color: C.textSecondary }}>
                      1st Year · Sem 2 · CSE 1A
                    </span>
                    <span className="text-[12px] font-bold" style={{ color: C.blue }}>→</span>
                    <span className="rounded-lg px-2.5 py-1.5 text-[12px] font-semibold" style={{ background: C.blue, color: C.white }}>
                      {newYear} · Sem {newSem} · {newSec}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[12px]" style={{ color: C.textSecondary }}>
                    This update will apply to all{' '}
                    <strong>{checked.length === bulkStudents.length ? '68' : checked.length}</strong>{' '}
                    selected students. Review the changes before confirming.
                  </p>
                </div>
              </div>
            </Panel>

            <Notice>
              Academic Year / Semester / Section changes are admin-controlled and cannot be reversed by students.
            </Notice>

            <div className="flex flex-col gap-2">
              <button onClick={() => setStep(s => Math.min(3, s + 1))} className={secondaryButton}>
                Preview Changes →
              </button>
              <button
                disabled={!checked.length}
                onClick={() => setConfirm(true)}
                className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Apply to {checked.length === bulkStudents.length ? '68' : checked.length} Students
              </button>
            </div>
          </div>
        </div>
      </AdminContent>

      {confirm && (
        <Modal title="Apply Academic Changes?" onClose={() => setConfirm(false)}>
          <div className="rounded-xl p-4 mb-5" style={{ background: C.orangeLight, border: `1px solid #FED7AA` }}>
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" style={{ color: C.orange }} />
              <p className="text-[13px]" style={{ color: '#92400E' }}>
                This will update academic information for <strong>{checked.length === bulkStudents.length ? '68' : checked.length}</strong> students. This action is logged for audit purposes.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setConfirm(false)} className={secondaryButton}>Cancel</button>
            <button onClick={() => { setConfirm(false); setDone(true) }} className={primaryButton}>
              Confirm & Apply
            </button>
          </div>
        </Modal>
      )}
      {done && <Toast message="Academic information updated successfully." />}
    </AdminShell>
  )
}

// ─── Student Profile & Device ─────────────────────────────────────────────────
export function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState<'device' | 'academic' | 'attendance'>('device')
  const [replacing, setReplacing] = useState(false)
  const [replaced,  setReplaced]  = useState(false)

  const tabs = [
    { key: 'device',     label: 'Registered Device'  },
    { key: 'academic',   label: 'Academic Details'    },
    { key: 'attendance', label: 'Attendance Summary'  },
  ] as const

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Student Profile & Device"
          description="View student details, manage registered devices and account status."
          actions={
            <Link href="/admin/students" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back to Students
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Left identity card */}
          <div className="space-y-4">
            <Panel>
              <div className="p-6 text-center">
                <div
                  className="mx-auto flex size-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{ background: C.blue }}
                >
                  RS
                </div>
                <p className="mt-3 text-[17px] font-semibold" style={{ color: C.navy }}>Rahul Sharma</p>
                <p className="mt-0.5 text-[13px]" style={{ color: C.textTertiary }}>01CS123 · CSE 3A</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <StatusBadge tone="green">Active</StatusBadge>
                  <StatusBadge tone="blue">Linked</StatusBadge>
                </div>
                <button className={`${secondaryButton} mt-4 w-full`}>View Full Profile</button>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <div className="px-5 py-4">
                  <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: C.textTertiary }}>
                    Basic Information
                  </p>
                  <div className="space-y-3">
                    {[
                      ['Full Name',   'Rahul Sharma'],
                      ['USN',        '01CS123'],
                      ['Department', 'CSE'],
                      ['Year',       '3rd Year'],
                      ['Section',    'CSE 3A'],
                      ['Semester',   '5'],
                      ['Mobile',     '+91 98765 43210'],
                    ].map(([l, v]) => (
                      <div key={l} className="flex items-start justify-between gap-2">
                        <span className="text-[12.5px]" style={{ color: C.textTertiary }}>{l}</span>
                        <span className="text-[12.5px] font-medium text-right" style={{ color: C.navy }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          {/* Right tabbed area */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex rounded-xl bg-white p-1" style={{ border: `1px solid ${C.border}` }}>
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 rounded-lg py-2 text-[13.5px] font-medium transition-all"
                  style={
                    activeTab === tab.key
                      ? { background: C.blue, color: C.white, fontWeight: 600 }
                      : { color: C.textSecondary }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Device tab */}
            {activeTab === 'device' && (
              <Panel>
                <div className="flex items-start justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: C.greenLight }}>
                        <Smartphone className="size-5" style={{ color: C.green }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold" style={{ color: C.navy }}>Linked Device</p>
                        <p className="text-[12.5px]" style={{ color: C.textTertiary }}>1 device registered</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setReplacing(true)} className={secondaryButton}>
                    <Plus className="size-4" /> Add / Replace Device
                  </button>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <div className="p-5 grid gap-4 sm:grid-cols-2">
                    {(
                      [
                        ['Device Name',    "Rahul's iPhone",        Smartphone],
                        ['Device Type',    'iOS',                   Laptop],
                        ['Device ID',      'A1B2-C3D4-E5F6',       Monitor],
                        ['Registered On',  '12 Aug 2025, 10:24 AM', Shield],
                        ['Status',         'Active',                Check],
                      ] as [string, string, React.ElementType][]
                    ).map(([label, value, I]) => (
                        <div
                          key={label}
                          className="flex items-start gap-3 rounded-xl p-4"
                          style={{ background: C.blueFaint, border: `1px solid ${C.border}` }}
                        >
                          <I className="size-4 mt-0.5 shrink-0" style={{ color: C.blue }} />
                          <div>
                            <p className="text-[12px]" style={{ color: C.textTertiary }}>{label}</p>
                            <p className="mt-0.5 text-[13.5px] font-semibold" style={{ color: C.navy }}>{value}</p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="mx-5 mb-5 rounded-xl p-4" style={{ background: C.greenLight, border: `1px solid #BBF7D0` }}>
                  <p className="text-[13px] font-semibold" style={{ color: '#14532D' }}>
                    Login & Security
                  </p>
                  <div className="mt-2 flex justify-between text-[12.5px]">
                    <span style={{ color: '#14532D' }}>Last Login</span>
                    <span className="font-medium" style={{ color: '#14532D' }}>12 Sep 2025, 08:45 AM</span>
                  </div>
                  <div className="mt-1 flex justify-between text-[12.5px]">
                    <span style={{ color: '#14532D' }}>Account Status</span>
                    <StatusBadge tone="green">Active</StatusBadge>
                  </div>
                </div>
              </Panel>
            )}

            {/* Academic tab */}
            {activeTab === 'academic' && (
              <Panel title="Academic Details">
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {[
                    ['Department',    'CSE'], ['Year',        '3rd Year'],
                    ['Semester',      '5'],   ['Section',     'CSE 3A'],
                    ['Academic Year', '2025–26'], ['Enrolled', '15 Aug 2023'],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-xl p-4" style={{ background: C.blueFaint, border: `1px solid ${C.border}` }}>
                      <p className="text-[12px]" style={{ color: C.textTertiary }}>{l}</p>
                      <p className="mt-0.5 text-[14px] font-semibold" style={{ color: C.navy }}>{v}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {/* Attendance tab */}
            {activeTab === 'attendance' && (
              <Panel title="Attendance Summary">
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-semibold" style={{ color: C.navy }}>Overall Attendance</p>
                    <span className="text-[28px] font-bold" style={{ color: C.green }}>84%</span>
                  </div>
                  <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: C.border }}>
                    <div className="h-full rounded-full" style={{ width: '84%', background: C.green }} />
                  </div>
                  <p className="text-[12.5px]" style={{ color: C.textTertiary }}>
                    Attendance is above the minimum threshold of 75%.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 mt-4">
                    {[
                      ['Classes Attended', '101 / 120'],
                      ['This Month',       '22 / 25'],
                      ['Highest Subject',  'Math — 96%'],
                      ['Lowest Subject',   'OS Lab — 70%'],
                    ].map(([l, v]) => (
                      <div key={l} className="rounded-xl p-4" style={{ background: C.blueFaint, border: `1px solid ${C.border}` }}>
                        <p className="text-[12px]" style={{ color: C.textTertiary }}>{l}</p>
                        <p className="mt-0.5 text-[14px] font-semibold" style={{ color: C.navy }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            )}
          </div>
        </div>
      </AdminContent>

      {replacing && (
        <Modal title="Replace Registered Device?" onClose={() => setReplacing(false)}>
          <p className="text-[13.5px]" style={{ color: C.textSecondary }}>
            This will remove the currently registered device and require the student to register a new authorized device on next login.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setReplacing(false)} className={secondaryButton}>Cancel</button>
            <button
              onClick={() => { setReplacing(false); setReplaced(true) }}
              style={{ background: C.red }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-[13.5px] font-semibold text-white hover:opacity-90"
            >
              Replace Device
            </button>
          </div>
        </Modal>
      )}
      {replaced && <Toast message="Device replacement initiated." />}
    </AdminShell>
  )
}
