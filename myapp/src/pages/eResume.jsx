import React from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Globe, Server, ShieldCheck, Printer, Trophy, Star, Medal, BookOpen, UserCheck, Calendar, Users, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

const ResumeWeb = () => {
  const { resumeData } = useResume();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 print:bg-white print:text-black">
      {/* Navigation / Action Bar - Hidden when printing */}
      <div className="bg-white shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <span className="font-semibold text-gray-700">Resume Lengkap (IT, Vokasional & Mentor)</span>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/kemaskini')}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-sm"
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-sm"
            >
              <Printer size={16} />
              Simpan PDF / Cetak
            </button>
          </div>
        </div>
      </div>

      {/* Main Resume Container */}
      <main className="max-w-4xl mx-auto my-8 bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none print:m-0 print:max-w-full">

        {/* Header Section */}
        <header className="bg-blue-900 text-white p-8 print:bg-white print:text-black print:border-b-2 print:border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">{resumeData.header.name}</h1>
              <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 font-medium text-blue-100 print:text-gray-700">
                <span className="text-xl">{resumeData.header.role1}</span>
                <span className="hidden md:inline print:inline">|</span>
                <span className="text-xl">{resumeData.header.role2}</span>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {resumeData.header.badges.map((badge, index) => (
                  <span key={index} className="text-xs font-bold bg-blue-700 text-white px-2 py-1 rounded border border-blue-600 print:border-gray-400 print:text-black print:bg-transparent">{badge}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm md:text-right print:text-left">
              <div className="flex items-center gap-2 md:justify-end print:justify-start">
                <MapPin size={16} className="print:text-gray-800 text-blue-300" />
                <span>{resumeData.header.location}</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end print:justify-start">
                <Phone size={16} className="print:text-gray-800 text-blue-300" />
                <a href={`tel:${resumeData.header.phone}`} className="hover:underline">{resumeData.header.phone}</a>
              </div>
              <div className="flex items-center gap-2 md:justify-end print:justify-start">
                <Mail size={16} className="print:text-gray-800 text-blue-300" />
                <a href={`mailto:${resumeData.header.email}`} className="hover:underline">{resumeData.header.email}</a>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 space-y-8 print:p-0 print:pt-6">

          {/* Professional Summary */}
          <section>
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4 uppercase flex items-center gap-2">
              <Briefcase size={20} /> Ringkasan Profesional
            </h3>
            <p className="leading-relaxed text-justify text-gray-700">
              {resumeData.summary}
            </p>
          </section>

          {/* Achievements & Awards */}
          <section className="break-inside-avoid">
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6 uppercase flex items-center gap-2">
              <Trophy size={20} /> Pencapaian & Pengiktirafan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Iterating over achievements from data */}
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className={`rounded-lg p-5 print:bg-white print:border-gray-200 ${ach.icon === 'Star' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-100'}`}>
                  <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                    {ach.icon === 'Star' ? <Star size={18} className="text-yellow-600 fill-current" /> : <Medal size={18} className="text-blue-600" />} {ach.category}
                  </h4>
                  <ul className="space-y-3">
                    {ach.items.map((item, i) => (
                      <li key={i} className={`flex flex-col ${i > 0 ? (ach.icon === 'Star' ? 'border-t border-yellow-100 pt-2' : 'border-t border-blue-100 pt-2') : ''}`}>
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-gray-800">{item.title}</span>
                          {(item.year || item.badge) && <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded print:hidden">{item.year || item.badge}</span>}
                        </div>
                        <span className="text-sm text-gray-600">{item.org || item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Core Competencies Grid - Updated */}
          <section className="break-inside-avoid">
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4 uppercase flex items-center gap-2">
              <Code size={20} /> Kompetensi Teras
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.competencies?.map((comp, idx) => (
                <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100 print:bg-white print:border-gray-200">
                  <div className="flex items-center gap-2 font-bold text-gray-800 mb-2">
                    {comp.icon === 'UserCheck' && <UserCheck size={18} className="text-blue-600" />}
                    {comp.icon === 'Globe' && <Globe size={18} className="text-blue-600" />}
                    {comp.icon === 'Server' && <Server size={18} className="text-blue-600" />}
                    {comp.icon === 'Users' && <Users size={18} className="text-blue-600" />}
                    {comp.category}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {comp.items.map((item, i) => (
                      <li key={i}>{item.startsWith('Pegawai Penilai') || item.startsWith('Penasihat Akademik') ? <span className="font-semibold">{item}</span> : item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section>
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6 uppercase flex items-center gap-2">
              <Briefcase size={20} /> Pengalaman Kerja
            </h3>

            <div className="relative border-l-2 border-blue-200 ml-3 pl-8 pb-4">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>

              <div className="mb-2">
                <h4 className="text-lg font-bold text-gray-800">{resumeData.experience.role}</h4>
                <div className="flex flex-col md:flex-row md:justify-between text-sm text-blue-600 font-semibold mb-2 print:text-gray-600">
                  <span>{resumeData.experience.company}</span>
                  <span>{resumeData.experience.duration}</span>
                </div>
                <p className="italic text-gray-600 mb-4 text-sm border-l-4 border-gray-200 pl-3">
                  {resumeData.experience.desc}
                </p>
              </div>

              <div className="space-y-4">
                {resumeData.experience.details?.map((detail, idx) => (
                  <div key={idx}>
                    <h5 className="font-bold text-gray-800 underline decoration-blue-300 decoration-2 underline-offset-2 mb-2">{detail.title}</h5>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 text-sm">
                      {detail.items.map((item, i) => (
                        <li key={i} className={item.highlight ? "bg-blue-50 p-2 rounded -ml-2 border-l-4 border-blue-400 print:bg-white print:border-gray-300" : ""}>
                          {item.highlight ? (
                            <div className="flex items-start gap-2">
                              <Calendar size={16} className="mt-1 text-blue-700" />
                              <span>
                                <span className="font-semibold text-blue-900">{item.boldTarget}</span> {item.text.replace(item.boldTarget, '').replace(item.highlightText, '')} <span className="font-bold underline">{item.highlightText}</span>.
                              </span>
                            </div>
                          ) : (
                            <span>
                              <span className="font-semibold">{item.boldTarget}</span> {item.text.replace(item.boldTarget, '')}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education & Certification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 break-inside-avoid">

            {/* Education */}
            <section>
              <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4 uppercase flex items-center gap-2">
                <GraduationCap size={20} /> Pendidikan
              </h3>
              <div>
                <h4 className="font-bold text-gray-800">{resumeData.education.degree}</h4>
                <p className="text-blue-700 font-medium print:text-gray-600">{resumeData.education.school}</p>
                <p className="text-gray-500 text-sm">{resumeData.education.year}</p>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4 uppercase flex items-center gap-2">
                <Award size={20} /> Sijil Profesional
              </h3>
              <ul className="space-y-4">
                {resumeData.certifications?.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1 rounded mt-1 print:hidden">
                      {cert.icon === 'UserCheck' && <UserCheck size={14} className="text-blue-700" />}
                      {cert.icon === 'ShieldCheck' && <ShieldCheck size={14} className="text-blue-700" />}
                      {cert.icon === 'BookOpen' && <BookOpen size={14} className="text-blue-700" />}
                      {cert.icon === 'Globe' && <Globe size={14} className="text-blue-700" />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{cert.title}</p>
                      {cert.subtitle && <p className="text-sm text-gray-600">{cert.subtitle}</p>}
                      {cert.details && (
                        <div className="text-sm text-gray-600">
                          {cert.details.map((d, i) => <p key={i}>{d}</p>)}
                        </div>
                      )}
                      {cert.smallText && (
                        <div className="text-xs text-gray-500 mt-1 italic leading-relaxed">
                          {cert.smallText}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 text-center text-sm print:hidden">
          <p>© {new Date().getFullYear()} {resumeData.header.name} - Resume Profesional</p>
        </footer>
      </main>
    </div>
  );
};

export default ResumeWeb;
