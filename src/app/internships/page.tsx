import { Metadata } from 'next';
import { Calendar, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { internshipDomains } from '@/config/internships';
import { InternshipCard } from '@/components/internships/internship-card';
import { InternshipBenefits } from '@/components/internships/internship-benefits';
import { InternshipApplicationForm } from '@/components/internships/internship-application-form';
import { InternshipFaq } from '@/components/internships/internship-faq';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/lib/site-config';
import { APPLICATIONS_OPEN } from '@/lib/internships';

export const metadata: Metadata = {
  title: 'Cybersecurity Internship Application | IqraSec Academy',
  description:
    'Explore the IqraSec Academy Cybersecurity Internship, including Web Application Penetration Testing (WAPT) and Scripting & Automation domains.',
  keywords: [
    'Cybersecurity Internship',
    'WAPT Internship',
    'Web Application Penetration Testing Internship',
    'Scripting and Automation Internship',
    'IqraSec Academy Internship',
    'Virtual Cybersecurity Internship',
    'Cybersecurity Training',
  ],
  alternates: {
    canonical: `${siteConfig.url}/internships`,
  },
  openGraph: {
    title: 'Cybersecurity Internship Application | IqraSec Academy',
    description:
      'Explore the IqraSec Academy Cybersecurity Internship, including Web Application Penetration Testing (WAPT) and Scripting & Automation domains.',
    url: `${siteConfig.url}/internships`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Internship Application | IqraSec Academy',
    description:
      'Explore the IqraSec Academy Cybersecurity Internship, including Web Application Penetration Testing (WAPT) and Scripting & Automation domains.',
  },
};

export default function InternshipsOverviewPage() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-slate-50/80 border-b border-slate-200/60 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-linear-to-tr from-blue-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 tech-grid-pattern opacity-25" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Top Pill & Start Date Display */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-blue-200 bg-blue-50">
              OFFICIAL INTERNSHIP PROGRAM
            </Badge>
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold shadow-2xs ${
              APPLICATIONS_OPEN
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}>
              <Calendar className={`h-3.5 w-3.5 ${APPLICATIONS_OPEN ? 'text-emerald-600' : 'text-amber-700'}`} />
              <span>{APPLICATIONS_OPEN ? 'Applications Open' : 'Applications Closed'}</span>
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Start Your <span className="tech-gradient-text">Cybersecurity Journey</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore the IqraSec Academy Internship Program and its guided virtual learning tracks in Web Application Penetration Testing (WAPT) and Scripting & Automation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href="#domains"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto gap-2 px-8"
            >
              <span>Explore Internship Domains</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              href="#application-form"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 border-slate-300 hover:border-blue-500"
            >
              <span>Application Status</span>
            </Button>
          </div>

          {/* Key Quick Facts */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 font-medium max-w-3xl mx-auto border-t border-slate-200/60">
            <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px] uppercase">Format</span>
              <span className="font-bold text-slate-900">Virtual / Remote</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px] uppercase">Level</span>
              <span className="font-bold text-slate-900">Beginner & Intermediate</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
              <span className="font-bold text-slate-900">1 Month Program</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-slate-400 block text-[10px] uppercase">Awards</span>
              <span className="font-bold text-blue-600">Certificate: eligible top performers; stipend: selected top performers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERNSHIP DOMAINS CARDS SECTION */}
      <section id="domains" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex justify-center mb-3">
              <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                AVAILABLE DOMAINS
              </Badge>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Select Your <span className="tech-gradient-text">Specialization Track</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore our two specialized cybersecurity internship tracks and apply for the domain that aligns with your career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {internshipDomains.map((domain, index) => (
              <InternshipCard key={domain.id} domain={domain} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERNSHIP BENEFITS */}
      <InternshipBenefits />

      {/* 4. INTERNSHIP APPLICATION FORM (GOOGLE FORM EMBED) */}
      <InternshipApplicationForm
        id="application-form"
        embedUrl={siteConfig.googleFormEmbedUrl}
        directUrl={siteConfig.googleFormApplicationUrl}
      />

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <InternshipFaq />

      {/* 6. FINAL CTA BANNER */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 tech-grid-pattern opacity-10" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex justify-center">
            <Badge variant="navy" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold border-slate-700 bg-slate-800 text-cyan-400 gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              {APPLICATIONS_OPEN ? 'APPLICATIONS OPEN' : 'APPLICATIONS CLOSED'}
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to Take Your First Step in Cybersecurity?
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {APPLICATIONS_OPEN
              ? 'Applications are open for upcoming cybersecurity internship cohorts. Spots are limited, so complete the application form today.'
              : 'Applications for the current internship cohort are closed. Explore the available domains and check back for updates about future cohorts.'}
          </p>

          <div className="pt-4 flex justify-center">
            <Button
              href={APPLICATIONS_OPEN ? '#application-form' : '#domains'}
              variant="primary"
              size="lg"
              className="gap-2 bg-blue-600 px-8 shadow-xl shadow-blue-600/30 hover:bg-blue-500"
            >
              <span>{APPLICATIONS_OPEN ? 'Apply Now' : 'Explore Internship Domains'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
