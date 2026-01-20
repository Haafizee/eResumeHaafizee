import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultResumeData = {
    header: {
        name: "Mohamad Haafizee Bin Ali",
        role1: "Penolong Pegawai Teknologi Maklumat",
        role2: "Pegawai Penilai",
        badges: ["Pegawai Penilai (PP-PPD-PPB)", "VTO Certified"],
        location: "Nibong Tebal, Pulau Pinang",
        phone: "016-523 8543",
        email: "haafizee@perda.gov.my"
    },
    summary: "Profesional Teknologi Maklumat dan Pengajar Vokasional (VTO) bertauliah dengan 6 tahun pengalaman dalam pendidikan TVET. Memegang peranan kritikal sebagai Pegawai Penilai (PP-PPD-PPB) dan pembangun sistem IT. Mempunyai kepakaran dwi-fungsi dalam pembangunan aplikasi teknikal (Sistem i-Akademik) dan pengurusan pembangunan pelajar melalui program Mentor Mentee. Terbukti cemerlang membimbing bakat ke peringkat WorldSkills dan diiktiraf melalui Anugerah Perkhidmatan Cemerlang (APC) 2024. Komited memacu kecemerlangan organisasi melalui gabungan kepakaran teknikal dan pembangunan modal insan.",
    achievements: [
        {
            category: "Kecemerlangan Perkhidmatan",
            icon: "Star",
            items: [
                { title: "Anugerah Perkhidmatan Cemerlang (APC)", org: "PERDA | 2024" },
                { title: "Anugerah Pengiktirafan PERDA", org: "PERDA | 2024" },
                { title: "Anugerah Khas Pengurus Besar", org: "PERDA | 2023" }
            ]
        },
        {
            category: "Bimbingan Inovasi & Kemahiran",
            icon: "Medal",
            items: [
                { title: "Finalis WorldSkills Malaysia (WSMP)", desc: "Bidang: Mobile App Development | 2024" },
                { title: "Pingat Perak (Silver Medal)", badge: "2025", desc: "Pertandingan Inovasi iCompex (Inovasi TVET)" },
                { title: "Pingat Perak (Silver Medal)", badge: "2023", desc: "Pertandingan Inovasi iCompex (Inovasi TVET)" }
            ]
        }
    ],
    competencies: [
        {
            category: "Penilaian & Latihan TVET",
            icon: "UserCheck",
            items: [
                "Pegawai Penilai (PP-PPD-PPB)",
                "Pegawai Latihan Vokasional (VTO)",
                "Pembangunan Modul JPK (IT-020-3/4)",
                "Pengurusan Pendaftaran Pelatih (JPK)"
            ]
        },
        {
            category: "Pembangunan Sistem & Aplikasi",
            icon: "Globe",
            items: [
                "Full Stack Web (PHP/MySQL)",
                "Mobile App Dev (Android)",
                "Pembangunan Sistem i-Akademik",
                "Integrasi IoT"
            ]
        },
        {
            category: "Infrastruktur & Rangkaian",
            icon: "Server",
            items: [
                "CCNA & Network Configuration",
                "Server Administration",
                "Pengurusan Makmal Komputer",
                "Penyelenggaraan Aset ICT"
            ]
        },
        {
            category: "Kepimpinan & Pembangunan Pelajar",
            icon: "Users",
            items: [
                "Penasihat Akademik (Mentor Mentee)",
                "Warden Asrama & Disiplin",
                "Auditor Dalaman ISO",
                "Kaunseling & Motivasi Pelajar"
            ]
        }
    ],
    experience: {
        role: "Pensyarah IT / Pegawai Penilai (PP) & Pembangun Sistem",
        company: "Institut Kemahiran Tinggi PERDA (PERDA-TECH)",
        duration: "Julai 2019 – Kini (6 Tahun)",
        desc: "Tenaga pengajar utama program Diploma/Sijil (TVET), Pegawai Penilai bertauliah, dan peneraju teknikal sistem pendigitalan kampus.",
        details: [
            {
                title: "Penilaian Kompetensi & Pengurusan Latihan",
                items: [
                    { text: "Pegawai Penilai (PP-PPD-PPB): Bertanggungjawab menilai dan mengesahkan kompetensi pelatih mengikut NOSS JPK, memastikan kualiti graduan menepati piawaian industri.", boldTarget: "Pegawai Penilai (PP-PPD-PPB):" },
                    { text: "Pengurusan Kohort Pelajar (Semasa): Menguruskan pendaftaran, penilaian berterusan, dan rekod persijilan JPK bagi ambilan pelatih terkini yang didaftarkan sehingga Ogos 2026.", boldTarget: "Pengurusan Kohort Pelajar (Semasa):", highlight: true, highlightText: "Ogos 2026" },
                    { text: "Penyeliaan Projek & Inovasi: Membimbing pelajar membangunkan projek berimpak tinggi sehingga ke peringkat WorldSkills dan iCompex.", boldTarget: "Penyeliaan Projek & Inovasi:" }
                ]
            },
            {
                title: "Kepakaran Teknikal & Pembangunan Sistem",
                items: [
                    { text: "Programmer Sistem i-Akademik: Membangunkan portal pengurusan data akademik menggunakan PHP/MySQL untuk mendigitalkan rekod pelajar dan staf.", boldTarget: "Programmer Sistem i-Akademik:" },
                    { text: "Pentadbiran Infrastruktur: Menguruskan penyelenggaraan makmal komputer dan server latihan bagi memastikan kelancaran sesi P&P.", boldTarget: "Pentadbiran Infrastruktur:" }
                ]
            },
            {
                title: "Kepimpinan & Pembangunan Pelajar",
                items: [
                    { text: "Penasihat Akademik (Mentor Mentee): Membimbing pelajar di bawah seliaan (mentee) dari aspek akademik, emosi, dan kerjaya serta memantau prestasi secara berkala bagi mengurangkan kadar keciciran.", boldTarget: "Penasihat Akademik (Mentor Mentee):" },
                    { text: "Warden Asrama & Disiplin: Menguruskan kebajikan dan keselamatan pelajar asrama serta menguatkuasakan peraturan disiplin bagi membentuk sahsiah pelajar yang cemerlang.", boldTarget: "Warden Asrama & Disiplin:" },
                    { text: "Auditor ISO: Memastikan pematuhan prosedur kualiti dalam pengurusan akademik dan hal ehwal pelajar.", boldTarget: "Auditor ISO:" }
                ]
            }
        ]
    },
    education: {
        degree: "Ijazah Sarjana Muda Teknologi Maklumat (Kepujian) - Mobile Computing",
        school: "Open University Malaysia, Taiping",
        year: "Graduasi: 2024"
    },
    certifications: [
        {
            title: "Pegawai Penilai (PP-PPD-PPB)",
            subtitle: "Jabatan Pembangunan Kemahiran",
            icon: "UserCheck"
        },
        {
            title: "Qualified Technician (QT23040157)",
            subtitle: "Lembaga Teknologis Malaysia (MBOT)",
            icon: "ShieldCheck"
        },
        {
            title: "Sijil Kemahiran Malaysia (SKM) / VTO",
            details: ["Juruteknik Sistem Komputer - Tahap 3", "Operasi Latihan Vokasional - Tahap 3"],
            icon: "BookOpen"
        },
        {
            title: "Google IT Support Professional Certificate",
            subtitle: "MBOT Google Learning Program",
            smallText: "Modul: Technical Support Fundamentals, Computer Networking, OS Power User, SysAdmin & IT Infrastructure, IT Security (Defense against the digital dark arts).",
            icon: "Globe"
        }
    ]
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeData');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge saved data with default structure to ensure new fields (competencies, etc.) exist
                return {
                    ...defaultResumeData, ...parsed,
                    competencies: parsed.competencies || defaultResumeData.competencies,
                    certifications: parsed.certifications || defaultResumeData.certifications,
                    experience: { ...defaultResumeData.experience, ...parsed.experience, details: parsed.experience?.details || defaultResumeData.experience.details },
                    achievements: parsed.achievements || defaultResumeData.achievements
                };
            } catch (e) {
                console.error("Failed to parse resume data", e);
                return defaultResumeData;
            }
        }
        return defaultResumeData;
    });

    useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    const updateResumeData = (newData) => {
        setResumeData(newData);
    };

    return (
        <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
