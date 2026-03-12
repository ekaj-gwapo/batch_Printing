import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Lock, Eye, FileText, CheckCircle2, UserCircle2, MonitorCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f6f0]">
      {/* Navigation */}
      <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              T
            </div>
            <span className="text-3xl font-bold text-emerald-900">Report of Checks Issued</span>
          </div>
          <div className="flex items-center gap-6">
            {/* Logo placeholders - 3 logos */}
            <div className="flex items-center gap-4">
              {/* Logo 1 */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <Image src="/logos/logo4.png" alt="Logo 4" width={64} height={64} />
              </div>
              {/* Logo 2 */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <Image src="/logos/logo3.jpg" alt="Logo 4" width={64} height={64} />
              </div>
              {/* Logo 3 */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <Image src="/logos/logo1.jpg" alt="Logo 3" width={64} height={64} />
              </div>
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 items-center justify-center overflow-hidden">
                <Image src="/logos/logo2.png" alt="Logo 2" width={100} height={100} className="object-contain" />
              </div>
            </div>
            <Link href="/auth/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full px-100 py-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />

        {/* White fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/1 to-white backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 leading-tight">
            Checked & Issued Reports System
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Track, review, and manage all checked and issued items in one place. Generate accurate reports and monitor transaction history with real-time updates.
          </p>
          <Link href="/auth/login" className="inline-block">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              Login Now <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-emerald-950 tracking-tight">
              Designed for Efficiency
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored interfaces for different roles to streamline your workflow and ensure data accuracy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Entry User Card */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group bg-white">
              <div className="h-2 w-full bg-emerald-600" />
              <CardHeader className="pb-4 pt-8 px-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 shadow-sm border border-emerald-100">
                  <FileText className="w-7 h-7 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-emerald-950 font-bold">Data Entry User</CardTitle>
                <CardDescription className="text-base mt-2">Specialized interface to input and manage transaction data securely.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6 text-gray-700">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 border-b border-emerald-50 pb-2">Key Data Entry Capabilities</h4>
                  <ul className="space-y-3">
                    {[
                      'Bank name, payee, and complete address',
                      'DV number and detailed particulars',
                      'Precise amounts, dates, and account codes',
                      'Comprehensive debit/credit information',
                      'Control numbers and additional remarks'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-6 group-hover:bg-emerald-50 transition-colors">
                  <p className="text-sm font-medium text-emerald-900 text-center">
                    Secure and organized data management with comprehensive validation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Viewer User Card */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group bg-white">
              <div className="h-2 w-full bg-emerald-500" />
              <CardHeader className="pb-4 pt-8 px-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 shadow-sm border border-emerald-100">
                  <Eye className="w-7 h-7 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-emerald-950 font-bold">Viewer User</CardTitle>
                <CardDescription className="text-base mt-2">Powerful tools to access, analyze, and report transaction records.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6 text-gray-700">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 border-b border-emerald-50 pb-2">Analysis & Filtering Tools</h4>
                  <ul className="space-y-3">
                    {[
                      'Instant access to all transaction data',
                      'Dynamic sorting by bank name and fund',
                      'Chronological sorting by date',
                      'Categorized sorting by account code',
                      'Real-time data synchronization'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-6 group-hover:bg-emerald-50 transition-colors">
                  <p className="text-sm font-medium text-emerald-900 text-center">
                    Advanced reporting capabilities for better decision making.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section className="bg-emerald-950 py-24 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-800/40 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              Try It Now
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-2xl mx-auto">
              Experience the platform using our pre-configured demo accounts. No registration required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Entry User Demo */}
            <Card className="border border-emerald-800/50 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
              <CardHeader className="pb-4 pt-8 px-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/20">
                    <UserCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white font-bold">Data Entry User</CardTitle>
                    <CardDescription className="text-emerald-200/70 mt-1">Input transaction data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-6 space-y-6">
                <div className="bg-black/20 rounded-xl p-6 space-y-4 border border-white/5 font-mono">
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-400/70 uppercase tracking-widest font-sans font-semibold">Email</p>
                    <p className="text-lg text-white font-medium select-all">entry@demo.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-400/70 uppercase tracking-widest font-sans font-semibold">Password</p>
                    <p className="text-lg text-white font-medium select-all">Demo123456!</p>
                  </div>
                </div>
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold h-12 text-base transition-colors duration-300">
                    Login as Entry User
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Viewer User Demo */}
            <Card className="border border-emerald-800/50 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
              <CardHeader className="pb-4 pt-8 px-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/20">
                    <MonitorCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white font-bold">Viewer User</CardTitle>
                    <CardDescription className="text-emerald-200/70 mt-1">Access and report on data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-6 space-y-6">
                <div className="bg-black/20 rounded-xl p-6 space-y-4 border border-white/5 font-mono">
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-400/70 uppercase tracking-widest font-sans font-semibold">Email</p>
                    <p className="text-lg text-white font-medium select-all">viewer@demo</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-400/70 uppercase tracking-widest font-sans font-semibold">Password</p>
                    <p className="text-lg text-white font-medium select-all">Demo123456!</p>
                  </div>
                </div>
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold h-12 text-base transition-colors duration-300">
                    Login as Viewer User
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-emerald-50 py-20">
        <div className="w-full px-6">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your data is protected with industry-leading security. We use role-based access control to ensure that viewers only see data assigned to them, and entry users maintain full control over their submissions.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Secure authentication</li>
                <li>✓ Role-based access control</li>
                <li>✓ Encrypted data transmission</li>
                <li>✓ Audit logging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white py-8">
        <div className="w-full px-6 text-center text-gray-600">
          <p>© 2026 Transaction Hub. Built for modern financial workflows.</p>
        </div>
      </footer>
    </div>
  )
}
