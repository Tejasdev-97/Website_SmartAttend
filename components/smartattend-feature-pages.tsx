'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertTriangle, ArrowLeft, BookOpen, Check, CheckCircle2,
  ChevronDown, Edit3, FileSpreadsheet, Info, Laptop, Plus,
  Save, Search, ShieldCheck, Upload, Users, X,
} from 'lucide-react'
import {
  AdminContent, AdminShell, PageHeader, Panel,
  primaryButton, secondaryButton, StatusBadge,
} from './admin-shell'

// ── Shared helpers ─────────────────────────────────────────────────────────────
type ModalProps = { title: string; children: React.ReactNode; onClose: () => void }
function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F3A]/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl border border-[#D9E0E8] bg-white shadow-modal">
        <div className="flex items-center justify-between border-b border-[#D9E0E8] px-5 py-4">
          <h2 className="font-700 text-[#0B1F3A]">{title}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] hover:bg-slate-50"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, options, required = true,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  options?: string[]
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-600 text-[#374151]">
        {label}
        {required && <span className="text-[#C24141]"> *</span>}
      </span>
      <div className="relative mt-1.5">
        {options ? (
          <>
            <select
              value={value}
              onChange={e => onChange?.(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-[#D9E0E8] bg-white px-3 pr-9 text-sm text-[#172033] outline-none focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
            >
              {options.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
          </>
        ) : (
          <input
            value={value}
            onChange={e => onChange?.(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white px-3 text-sm text-[#172033] outline-none focus:border-[#1565D8] focus:ring-3 focus:ring-[#1565D8]/10"
          />
        )}
      </div>
    </label>
  )
}

function Notice({
  children, tone = 'blue',
}: {
  children: React.ReactNode
  tone?: 'blue' | 'orange' | 'green'
}) {
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

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-[#0B1F3A] px-5 py-3.5 text-sm font-600 text-white shadow-modal">
      <CheckCircle2 className="size-4 text-emerald-400" />
      {message}
    </div>
  )
}

// ── Academic Master ───────────────────────────────────────────────────────────
const masterCards = [
  { key: 'Department', plural: 'Departments', total: '6 Departments', examples: 'CSE, ME, ECE, IT, AE', icon: BookOpen, tone: 'violet' },
  { key: 'Subject', plural: 'Subjects', total: '156 Subjects', examples: 'Data Structures (CS301), Digital Logic (CS302), …', icon: FileSpreadsheet, tone: 'green' },
  { key: 'Section', plural: 'Sections', total: '24 Sections', examples: 'CSE 3A, CSE 3B, ECE 3A, …', icon: Users, tone: 'orange' },
  { key: 'Room', plural: 'Rooms', total: '45 Rooms', examples: '201, 203, 204, 301, 302, …', icon: Laptop, tone: 'blue' },
]

export function AcademicMasterPage() {
  const [modal, setModal] = useState<{ type: string; mode: 'Add' | 'Edit' } | null>(null)
  const [saved, setSaved] = useState(false)
  const [value, setValue] = useState('CSE')
  const card = modal && masterCards.find(c => c.key === modal.type)

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader title="Academic Master" description="Manage departments, subjects, sections and rooms." />

        <div className="grid gap-5 lg:grid-cols-2">
          {masterCards.map(item => {
            const Icon = item.icon
            const tone =
              item.tone === 'violet' ? 'bg-violet-50 text-violet-700' :
              item.tone === 'green'  ? 'bg-emerald-50 text-emerald-700' :
              item.tone === 'orange' ? 'bg-orange-50 text-orange-700' :
              'bg-[#EAF3FF] text-[#1565D8]'
            return (
              <Panel key={item.key} className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`flex size-11 items-center justify-center rounded-xl ${tone}`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-700 text-[#0B1F3A]">{item.plural}</h2>
                    <p className="mt-0.5 text-sm text-[#64748B]">
                      Total: <span className="font-600 text-[#374151]">{item.total}</span>
                    </p>
                  </div>
                </div>
                <p className="mt-4 min-h-10 text-sm text-[#374151]">{item.examples}</p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => {
                      setValue(item.key === 'Subject' ? 'CS301' : item.key === 'Room' ? '201' : 'CSE')
                      setModal({ type: item.key, mode: 'Add' })
                    }}
                    className={secondaryButton}
                  >
                    <Plus className="size-4" /> Add
                  </button>
                  <button
                    onClick={() => {
                      setValue(item.key === 'Subject' ? 'CS301' : item.key === 'Room' ? '201' : 'CSE')
                      setModal({ type: item.key, mode: 'Edit' })
                    }}
                    className={secondaryButton}
                  >
                    <Edit3 className="size-4" /> Edit
                  </button>
                </div>
              </Panel>
            )
          })}
        </div>

        <div className="mt-6">
          <Notice>
            These master records are used across timetable creation, faculty assignments and student profiles.
          </Notice>
        </div>
      </AdminContent>

      {modal && card && (
        <Modal title={`${modal.mode} ${card.key}`} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {modal.type === 'Section' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Section Name" value={value} onChange={setValue} />
                <Field label="Department" value="CSE" options={['CSE', 'ECE', 'IT', 'ME']} />
                <Field label="Year" value="3rd Year" options={['1st Year', '2nd Year', '3rd Year', '4th Year']} />
                <Field label="Semester" value="5" options={['1', '2', '3', '4', '5', '6', '7', '8']} />
              </div>
            ) : (
              <Field
                label={`${card.key} ${card.key === 'Room' ? 'Number' : 'Code'}`}
                value={value}
                onChange={setValue}
              />
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModal(null)} className={secondaryButton}>Cancel</button>
              <button
                onClick={() => { setModal(null); setSaved(true) }}
                className={primaryButton}
              >
                <Save className="size-4" /> Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
      {saved && <Toast message="Changes saved successfully." />}
    </AdminShell>
  )
}

// ── Timetable Management ──────────────────────────────────────────────────────
const timetableRows = [
  { id: 1, time: '10:00 AM – 11:00 AM', subject: 'Data Structures', code: 'CS301 · Theory', faculty: 'Prof. Rohit Sharma', room: '201' },
  { id: 2, time: '11:15 AM – 12:15 PM', subject: 'Digital Logic', code: 'CS302 · Theory', faculty: 'Prof. Neha Joshi', room: '203' },
  { id: 3, time: '02:00 PM – 03:00 PM', subject: 'Mathematics', code: 'MA303 · Theory', faculty: 'Prof. Amit Verma', room: '205' },
  { id: 4, time: '03:15 PM – 04:15 PM', subject: 'Operating Systems', code: 'CS304 · Lab', faculty: 'Prof. Pooja Singh', room: 'Lab 2' },
]
const filters = {
  department: ['CSE', 'ECE', 'IT'],
  year: ['3rd Year', '2nd Year'],
  semester: ['5', '4'],
  section: ['CSE 3A', 'CSE 3B'],
  day: ['Monday', 'Tuesday', 'Wednesday'],
}

export function TimetablePage() {
  const [selected, setSelected] = useState<number[]>([])
  const [editing, setEditing] = useState<typeof timetableRows[0] | null>(null)
  const [notice, setNotice] = useState(false)
  const [loading] = useState(false)
  const [error, setError] = useState(false)
  const toggle = (id: number) =>
    setSelected(cur => cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id])

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Timetable Management"
          description="Review, edit and publish academic timetable records."
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

        {/* Filters */}
        <Panel className="mb-5">
          <div className="grid gap-3 p-5 md:grid-cols-5">
            {Object.entries(filters).map(([label, options]) => (
              <Field
                key={label}
                label={label[0].toUpperCase() + label.slice(1)}
                value={options[0]}
                options={options}
                required={false}
              />
            ))}
          </div>
        </Panel>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <StatusBadge tone="orange">Draft</StatusBadge>
            <span className="text-xs text-[#64748B]">Last Updated: 20 May 2024, 10:30 AM</span>
          </div>
          <button
            disabled={!selected.length}
            className={`${secondaryButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Edit Selected
          </button>
        </div>

        {loading ? (
          <Panel className="p-6 space-y-3">
            {[1,2,3].map(n => <div key={n} className="h-12 animate-pulse rounded-lg bg-slate-100" />)}
          </Panel>
        ) : error ? (
          <Panel className="p-10 text-center">
            <AlertTriangle className="mx-auto size-8 text-[#C24141]" />
            <p className="mt-3 font-600 text-[#0B1F3A]">Unable to load timetable data.</p>
            <button onClick={() => setError(false)} className={`${secondaryButton} mt-4`}>
              Try Again
            </button>
          </Panel>
        ) : (
          <Panel>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                  <tr>
                    <th className="w-12 px-5 py-3" />
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Subject</th>
                    <th className="px-5 py-3">Faculty</th>
                    <th className="px-5 py-3">Room</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {timetableRows.map(row => (
                    <tr key={row.id} className="hover:bg-[#F7F9FC] transition-colors">
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(row.id)}
                          onChange={() => toggle(row.id)}
                          className="size-4 accent-[#1565D8]"
                        />
                      </td>
                      <td className="px-5 py-4 text-[13px] font-600 text-[#374151] whitespace-nowrap">
                        {row.time}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-600 text-[#0B1F3A]">{row.subject}</p>
                        <p className="mt-0.5 text-xs text-[#64748B]">{row.code}</p>
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#374151]">{row.faculty}</td>
                      <td className="px-5 py-4 text-[13px] text-[#374151]">Room {row.room}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setEditing(row)}
                          className={`${secondaryButton} h-9 px-3 text-xs`}
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
        )}

        <div className="mt-5">
          <Notice>Changes to timetable records are logged for audit purposes.</Notice>
        </div>
      </AdminContent>

      {editing && (
        <Modal title="Edit Timetable Entry" onClose={() => setEditing(null)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department" value="CSE" options={['CSE', 'ECE', 'IT']} />
            <Field label="Year" value="3rd Year" options={['2nd Year', '3rd Year']} />
            <Field label="Semester" value="5" options={['4', '5']} />
            <Field label="Section" value="CSE 3A" options={['CSE 3A', 'CSE 3B']} />
            <Field label="Subject" value={editing.subject} />
            <Field label="Faculty" value={editing.faculty} />
            <Field label="Room" value={editing.room} />
            <Field label="Day" value="Monday" options={['Monday', 'Tuesday']} />
            <Field label="Start Time" value="10:00 AM" />
            <Field label="End Time" value="11:00 AM" />
            <Field label="Class Type" value="Theory" options={['Theory', 'Lab']} />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className={secondaryButton}>Cancel</button>
            <button
              onClick={() => { setEditing(null); setNotice(true) }}
              className={primaryButton}
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
      {notice && <Toast message="Timetable entry updated successfully." />}
    </AdminShell>
  )
}

// ── Timetable Import ──────────────────────────────────────────────────────────
export function TimetableImportPage() {
  const [file, setFile] = useState('timetable_2026_27.xlsx')
  const [preview, setPreview] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [imported, setImported] = useState(false)

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Timetable Import"
          description="Upload Excel / CSV timetable data for review before publishing."
          actions={
            <Link href="/admin/timetable" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back
            </Link>
          }
        />

        <Panel>
          <div className="border-b border-violet-100 bg-violet-50 px-5 py-4">
            <h2 className="font-700 text-violet-900">Import Timetable Excel / CSV (Bulk)</h2>
            <p className="mt-1 text-xs text-violet-700">
              Upload a prepared timetable file and review each record before it becomes active.
            </p>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-violet-200 bg-violet-50/40 p-5">
              <FileSpreadsheet className="size-7 text-violet-600 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-600 text-[#0B1F3A]">{file}</p>
                <p className="mt-0.5 text-xs text-[#64748B]">1,248 records selected</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-700 text-emerald-700">
                <CheckCircle2 className="size-4" /> Valid file
              </span>
              <label className={secondaryButton}>
                Choose another
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  className="sr-only"
                  onChange={e => setFile(e.target.files?.[0]?.name || file)}
                />
              </label>
              <button onClick={() => setPreview(true)} className={primaryButton}>
                Review Timetable Data
              </button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
              <div>
                <h3 className="font-700 text-[#0B1F3A]">Expected Columns</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {['Department', 'Year', 'Semester', 'Section', 'Subject', 'Faculty', 'Room', 'Date / Day', 'Start Time', 'End Time', 'Class Type'].map(item => (
                    <div key={item} className="flex items-center gap-2 rounded-lg bg-slate-50 border border-[#D9E0E8] px-3 py-2 text-sm text-[#374151]">
                      <FileSpreadsheet className="size-4 text-[#64748B] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-end gap-3">
                <button onClick={() => setDownloaded(true)} className={secondaryButton}>
                  <FileSpreadsheet className="size-4" /> Download Template
                </button>
                <Notice tone="orange">
                  <span className="font-600">Imported timetable data will be reviewed for accuracy before publishing.</span>
                </Notice>
              </div>
            </div>
          </div>
        </Panel>

        {preview && (
          <Panel title="Timetable Preview" description="Review sample rows before importing." className="mt-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                  <tr>
                    {['Department','Year','Semester','Section','Subject','Faculty','Room','Date / Day','Time','Class Type'].map(h => (
                      <th key={h} className="px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {[
                    ['CSE','3rd Year','5','CSE 3A','Data Structures','Prof. Rohit Sharma','201','Monday','10:00–11:00 AM','Theory'],
                    ['CSE','3rd Year','5','CSE 3A','Digital Logic','Prof. Neha Joshi','203','Monday','11:15–12:15 PM','Theory'],
                  ].map(row => (
                    <tr key={row[4]} className="hover:bg-[#F7F9FC]">
                      {row.map(cell => (
                        <td key={cell} className="whitespace-nowrap px-4 py-3 text-[13px] text-[#374151]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D9E0E8] p-5">
              <StatusBadge tone="orange">Pending Review</StatusBadge>
              <button onClick={() => setImported(true)} className={primaryButton}>
                Import as Draft
              </button>
            </div>
          </Panel>
        )}

        {imported && (
          <div className="mt-5">
            <Notice tone="green">
              <span className="font-600">Timetable data imported successfully.</span>{' '}
              Status: <StatusBadge tone="orange">Pending Review</StatusBadge>
            </Notice>
          </div>
        )}

        <div className="mt-4 text-right text-xs text-[#64748B]">
          {downloaded ? 'Timetable template downloaded.' : 'Accepted formats: .xlsx, .csv'}
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ── Bulk Academic Update ──────────────────────────────────────────────────────
const bulkStudents: [string, string][] = [
  ['01CS123', 'Rahul Sharma'], ['01CS124', 'Ananya Singh'], ['01CS125', 'Vikram Patel'],
  ['01CS190', 'Neha Verma'], ['01CS191', 'Arjun Kumar'], ['01CS192', 'Ishita Rao'],
  ['01CS193', 'Karan Shah'],
]

export function BulkAcademicUpdatePage() {
  const [checked, setChecked] = useState(bulkStudents.map(s => s[0]))
  const [confirm, setConfirm] = useState(false)
  const [preview, setPreview] = useState(false)
  const [done, setDone] = useState(false)
  const toggle = (id: string) =>
    setChecked(cur => cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id])

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Bulk Academic Update"
          description="Update academic information for multiple selected students at once."
        />

        <Panel title="Filter Current Students">
          <div className="grid gap-4 p-5 md:grid-cols-4">
            <Field label="Current Department" value="CSE" options={['CSE', 'ECE', 'IT']} />
            <Field label="Current Year" value="1st Year" options={['1st Year', '2nd Year', '3rd Year']} />
            <Field label="Current Semester" value="2" options={['1', '2', '3', '4']} />
            <Field label="Current Section" value="CSE 3A" options={['CSE 3A', 'CSE 3B']} />
          </div>
        </Panel>

        <Panel className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9E0E8] px-5 py-4">
            <div>
              <h2 className="font-700 text-[#0B1F3A]">Student Selection</h2>
              <p className="mt-0.5 text-sm text-emerald-700 font-600">
                {checked.length === bulkStudents.length ? 68 : checked.length} Students Selected
              </p>
            </div>
            <button
              onClick={() => setChecked(checked.length ? [] : bulkStudents.map(s => s[0]))}
              className={secondaryButton}
            >
              {checked.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-y border-[#D9E0E8] bg-[#F7F9FC] text-[11px] font-700 uppercase tracking-wider text-[#64748B]">
                <tr>
                  <th className="w-12 px-5 py-3" />
                  <th className="px-5 py-3">USN</th>
                  <th className="px-5 py-3">Student Name</th>
                  <th className="px-5 py-3">Current Academic Info</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {bulkStudents.map(([id, name]) => (
                  <tr key={id} className={`transition-colors ${checked.includes(id) ? 'bg-[#EAF3FF]/40' : 'hover:bg-[#F7F9FC]'}`}>
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        checked={checked.includes(id)}
                        onChange={() => toggle(id)}
                        className="size-4 accent-[#1565D8]"
                      />
                    </td>
                    <td className="px-5 py-3 text-[13px] font-600 text-[#0B1F3A]">{id}</td>
                    <td className="px-5 py-3 text-[13px] text-[#374151]">{name}</td>
                    <td className="px-5 py-3 text-[13px] text-[#64748B]">CSE 1A · Sem 2</td>
                    <td className="px-5 py-3">
                      <StatusBadge tone={checked.includes(id) ? 'blue' : 'navy'}>
                        {checked.includes(id) ? 'Selected' : 'Not Selected'}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="New Academic Details (To be Applied)" className="mt-5">
          <div className="grid gap-4 p-5 md:grid-cols-3">
            <Field label="New Year" value="2nd Year" options={['2nd Year', '3rd Year', '4th Year']} />
            <Field label="New Semester" value="3" options={['3', '4', '5', '6']} />
            <Field label="New Section" value="CSE 3A" options={['CSE 3A', 'CSE 3B']} />
          </div>
          <div className="mx-5 mb-5 rounded-xl border border-violet-100 bg-violet-50 p-4">
            <p className="text-xs font-700 uppercase tracking-wide text-violet-700">Change Preview</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-lg bg-white border border-[#D9E0E8] px-3 py-2 text-[#374151]">
                Current: 1st Year · Sem 2 · Sec A
              </span>
              <span className="text-violet-600 font-700">→</span>
              <span className="rounded-lg bg-[#1565D8] px-3 py-2 font-700 text-white">
                New: 2nd Year · Sem 3 · Sec A
              </span>
            </div>
          </div>
        </Panel>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button onClick={() => setPreview(true)} className={secondaryButton}>Preview Changes</button>
          <button
            disabled={!checked.length}
            onClick={() => setConfirm(true)}
            className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Apply to Selected
          </button>
        </div>

        <div className="mt-5">
          <Notice>
            Academic Year / Semester / Section changes are admin-controlled. Student academic fields cannot be self-edited.
          </Notice>
        </div>

        {preview && (
          <Panel className="mt-5 border-violet-100 bg-violet-50 p-5">
            <p className="font-700 text-violet-900">Preview ready</p>
            <p className="mt-1 text-sm text-violet-800">
              The change will be applied to{' '}
              <span className="font-700">{checked.length}</span> selected student records.
            </p>
          </Panel>
        )}

        {done && <Toast message="Academic information updated successfully." />}
      </AdminContent>

      {confirm && (
        <Modal title="Apply Academic Changes?" onClose={() => setConfirm(false)}>
          <p className="text-sm text-[#4B5563]">
            The selected students&apos; academic information will be updated. This action cannot be undone.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setConfirm(false)} className={secondaryButton}>Cancel</button>
            <button
              onClick={() => { setConfirm(false); setDone(true) }}
              className={primaryButton}
            >
              Apply Changes
            </button>
          </div>
        </Modal>
      )}
    </AdminShell>
  )
}

// ── Student Profile & Device ──────────────────────────────────────────────────
export function StudentProfilePage() {
  const [replace, setReplace] = useState(false)
  const [replaced, setReplaced] = useState(false)

  return (
    <AdminShell>
      <AdminContent>
        <PageHeader
          title="Student Profile & Device"
          description="Rahul Sharma · 01CS123 · CSE 3A"
          actions={
            <Link href="/admin/students" className={secondaryButton}>
              <ArrowLeft className="size-4" /> Back to Students
            </Link>
          }
        />

        {/* Search & filters bar */}
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              placeholder="Search by USN or Name"
              className="h-11 w-full rounded-lg border border-[#D9E0E8] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none placeholder:text-[#9CA3AF] focus:border-[#1565D8]"
            />
          </div>
          {['Department', 'Year', 'Semester', 'Section'].map((label, i) => (
            <Field
              key={label}
              label={label}
              value={['CSE', '3rd Year', '5', 'CSE 3A'][i]}
              options={
                i === 0 ? ['CSE', 'ECE'] :
                i === 1 ? ['2nd Year', '3rd Year'] :
                i === 2 ? ['4', '5'] :
                ['CSE 3A', 'CSE 3B']
              }
              required={false}
            />
          ))}
          <button className={`${secondaryButton} self-end`}>Reset</button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          {/* Profile panel */}
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#EAF3FF] text-lg font-800 text-[#1565D8]">
                  RS
                </div>
                <div>
                  <p className="text-xs font-700 uppercase tracking-[0.12em] text-[#1565D8]">
                    Student Profile
                  </p>
                  <h2 className="text-2xl font-800 text-[#0B1F3A]">Rahul Sharma</h2>
                  <p className="mt-0.5 text-sm text-[#64748B]">01CS123 · CSE 3A</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="green">Active</StatusBadge>
                <StatusBadge tone="blue">Linked</StatusBadge>
                <StatusBadge tone="green">Verified</StatusBadge>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['Full Name', 'Rahul Sharma'],
                ['USN', '01CS123'],
                ['Department', 'CSE'],
                ['Year', '3rd Year'],
                ['Semester', '5'],
                ['Section', 'CSE 3A'],
                ['Mobile', '+91 98765 43210'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-[#D9E0E8] bg-[#F7F9FC] px-4 py-3">
                  <p className="text-xs text-[#64748B]">{label}</p>
                  <p className="mt-0.5 text-sm font-600 text-[#374151]">{value}</p>
                </div>
              ))}
            </div>
          </Panel>

          {/* Device panel */}
          <div className="space-y-4">
            <Panel className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Laptop className="size-5" />
                </div>
                <div>
                  <h2 className="font-700 text-[#0B1F3A]">Device Details</h2>
                  <p className="text-xs text-[#64748B]">Registered device status</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ['Device Status', 'Linked'],
                  ['Verification', 'Verified'],
                  ['Registration', replaced ? 'Replacement Pending' : 'Active'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-[#D9E0E8] pb-3 text-sm">
                    <span className="text-[#64748B]">{label}</span>
                    <StatusBadge tone={replaced && label === 'Registration' ? 'orange' : 'green'}>
                      {value}
                    </StatusBadge>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setReplace(true)}
                className={`${secondaryButton} mt-5 w-full border-orange-200 text-orange-700 hover:bg-orange-50`}
              >
                <ShieldCheck className="size-4" /> Replace Device (Admin)
              </button>
            </Panel>

            <Panel className="p-5 bg-[#FFF9EF] border-orange-100">
              <p className="text-xs font-700 uppercase tracking-[0.12em] text-orange-700">Admin Notice</p>
              <p className="mt-2 text-sm text-[#374151]">
                Replacing a device requires the student to register a new authorized device. Students cannot self-change their device.
              </p>
            </Panel>
          </div>
        </div>

        <div className="mt-5">
          <Notice>
            Admin can inspect and manage the registered device. Students cannot self-change their device.
          </Notice>
        </div>
      </AdminContent>

      {replace && (
        <Modal title="Replace Registered Device?" onClose={() => setReplace(false)}>
          <p className="text-sm text-[#4B5563]">
            This action replaces the student&apos;s currently registered device and requires the student to register a new authorized device.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setReplace(false)} className={secondaryButton}>Cancel</button>
            <button
              onClick={() => { setReplace(false); setReplaced(true) }}
              className={`${primaryButton} bg-[#C24141] hover:bg-red-700`}
            >
              Replace Device
            </button>
          </div>
        </Modal>
      )}
      {replaced && <Toast message="Device replacement initiated successfully." />}
    </AdminShell>
  )
}
