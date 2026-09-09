import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { AdminContent, AdminShell, PageHeader, primaryButton } from '@/components/admin-shell'

export default async function AdminNotFound({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const title = slug.map(part => part.replaceAll('-', ' ')).join(' / ')

  return <AdminShell><AdminContent><PageHeader title={title} description="The requested SmartAttend workspace could not be found." actions={<Link href="/admin/dashboard" className={primaryButton}>Back to Dashboard</Link>} /><div className="rounded-xl border border-border bg-white p-10 text-center shadow-card"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600"><FileQuestion className="size-6" /></div><p className="mt-4 font-semibold text-navy">Page not found</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Check the URL or return to the dashboard to continue managing attendance.</p></div></AdminContent></AdminShell>
}
