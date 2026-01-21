import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

const KemaskiniResume = () => {
    const { resumeData, updateResumeData } = useResume();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(resumeData);

    // Templates for new items
    const defaultTemplates = {
        achievements: { category: "New Category", icon: "Star", items: [] },
        achievementItem: { title: "New Achievement", org: "Organization", year: "2024" },
        competencies: { category: "New Competency Category", icon: "Code", items: [] },
        competencyItem: "New Skill",
        experienceDetail: { title: "New Responsibility Area", items: [] },
        experienceItem: { text: "Full description here", boldTarget: "Keyword" },
        certification: { title: "New Certificate", subtitle: "Issuer", icon: "Award", details: [] },
        certificationDetail: "New Detail"
    };

    // Generic handler for fields
    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSimpleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    // --- Array ADD/REMOVE Handlers ---

    // Add main section item (e.g. new Achievement Category)
    const handleAddSectionItem = (section, template) => {
        const newSection = [...formData[section], template];
        setFormData({ ...formData, [section]: newSection });
    };

    // Remove main section item
    const handleRemoveSectionItem = (section, index) => {
        const newSection = formData[section].filter((_, i) => i !== index);
        setFormData({ ...formData, [section]: newSection });
    };

    // Add nested item (e.g. new Achievement Item inside a Category)
    const handleAddNestedItem = (section, parentIndex, childField, template) => {
        const newSection = [...formData[section]];
        const children = newSection[parentIndex][childField] || [];
        newSection[parentIndex] = {
            ...newSection[parentIndex],
            [childField]: [...children, template]
        };
        setFormData({ ...formData, [section]: newSection });
    };

    // Remove nested item
    const handleRemoveNestedItem = (section, parentIndex, childField, childIndex) => {
        const newSection = [...formData[section]];
        const newChildren = newSection[parentIndex][childField].filter((_, i) => i !== childIndex);
        newSection[parentIndex] = { ...newSection[parentIndex], [childField]: newChildren };
        setFormData({ ...formData, [section]: newSection });
    };


    // --- EDIT Handlers ---

    const handleArrayItemChange = (section, index, field, value) => {
        const newSection = [...formData[section]];
        newSection[index] = { ...newSection[index], [field]: value };
        setFormData({ ...formData, [section]: newSection });
    };

    const handleNestedArrayItemChange = (section, parentIndex, childField, childIndex, field, value) => {
        const newSection = [...formData[section]];
        const newChildren = [...newSection[parentIndex][childField]];

        if (typeof newChildren[childIndex] === 'string') {
            newChildren[childIndex] = value;
        } else {
            newChildren[childIndex] = { ...newChildren[childIndex], [field]: value };
        }

        newSection[parentIndex] = { ...newSection[parentIndex], [childField]: newChildren };
        setFormData({ ...formData, [section]: newSection });
    };

    // Experience Details Specific Handlers (Object in Object in Array)
    const handleExperienceDetailChange = (detailIndex, itemIndex, field, value) => {
        const newExperience = { ...formData.experience };
        const newDetails = [...newExperience.details];
        const newItems = [...newDetails[detailIndex].items];

        newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
        newDetails[detailIndex] = { ...newDetails[detailIndex], items: newItems };
        newExperience.details = newDetails;

        setFormData({ ...formData, experience: newExperience });
    };

    const handleAddExperienceDetail = () => {
        const newExperience = { ...formData.experience };
        newExperience.details = [...newExperience.details, defaultTemplates.experienceDetail];
        setFormData({ ...formData, experience: newExperience });
    };

    const handleRemoveExperienceDetail = (index) => {
        const newExperience = { ...formData.experience };
        newExperience.details = newExperience.details.filter((_, i) => i !== index);
        setFormData({ ...formData, experience: newExperience });
    };

    const handleAddExperienceItem = (detailIndex) => {
        const newExperience = { ...formData.experience };
        const newDetails = [...newExperience.details];
        newDetails[detailIndex] = {
            ...newDetails[detailIndex],
            items: [...newDetails[detailIndex].items, defaultTemplates.experienceItem]
        };
        newExperience.details = newDetails;
        setFormData({ ...formData, experience: newExperience });
    };

    const handleRemoveExperienceItem = (detailIndex, itemIndex) => {
        const newExperience = { ...formData.experience };
        const newDetails = [...newExperience.details];
        const newItems = newDetails[detailIndex].items.filter((_, i) => i !== itemIndex);
        newDetails[detailIndex] = { ...newDetails[detailIndex], items: newItems };
        newExperience.details = newDetails;
        setFormData({ ...formData, experience: newExperience });
    };


    const handleSave = () => {
        updateResumeData(formData);
        alert('Resume updated successfully!');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 pb-32">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <header className="bg-blue-900 text-white p-6 flex justify-between items-center sticky top-0 z-10 shadow-md">
                    <div className='flex items-center gap-4'>
                        <button onClick={() => navigate('/')} className="hover:bg-blue-800 p-2 rounded transition-colors">
                            <ArrowLeft />
                        </button>
                        <h1 className="text-2xl font-bold">Kemaskini Resume</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full font-bold shadow-sm transition-transform hover:scale-105"
                    >
                        <Save size={20} /> Simpan
                    </button>
                </header>

                <div className="p-8 space-y-10">

                    {/* 1. Header Section */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold text-blue-900 mb-6 border-b pb-2">Maklumat Utama</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Penuh</label>
                                <input type="text" value={formData.header.name} onChange={(e) => handleChange('header', 'name', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Jawatan Utama 1</label>
                                <input type="text" value={formData.header.role1} onChange={(e) => handleChange('header', 'role1', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Jawatan Utama 2</label>
                                <input type="text" value={formData.header.role2} onChange={(e) => handleChange('header', 'role2', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Lokasi</label>
                                <input type="text" value={formData.header.location} onChange={(e) => handleChange('header', 'location', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">No. Telefon</label>
                                <input type="text" value={formData.header.phone} onChange={(e) => handleChange('header', 'phone', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <input type="text" value={formData.header.email} onChange={(e) => handleChange('header', 'email', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    </section>

                    {/* 2. Summary Section */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold text-blue-900 mb-6 border-b pb-2">Ringkasan Profesional</h2>
                        <textarea
                            rows={5}
                            value={formData.summary}
                            onChange={(e) => handleSimpleChange('summary', e.target.value)}
                            className="w-full border rounded p-3 text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </section>

                    {/* 3. Achievements Section */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h2 className="text-xl font-bold text-blue-900">Pencapaian & Pengiktirafan</h2>
                            <button onClick={() => handleAddSectionItem('achievements', defaultTemplates.achievements)} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm font-semibold">
                                <Plus size={16} /> Add Category
                            </button>
                        </div>

                        {formData.achievements.map((cat, idx) => (
                            <div key={idx} className="mb-6 p-4 bg-white rounded shadow-sm border border-gray-100 relative group">
                                <div className="flex justify-between items-center mb-3">
                                    <input
                                        type="text"
                                        value={cat.category}
                                        onChange={(e) => handleArrayItemChange('achievements', idx, 'category', e.target.value)}
                                        className="font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none text-lg"
                                        placeholder="Category Name"
                                    />
                                    <button onClick={() => handleRemoveSectionItem('achievements', idx)} className="text-red-400 hover:text-red-600 p-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                                    {cat.items.map((item, i) => (
                                        <div key={i} className="flex gap-2 items-start">
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={item.title}
                                                onChange={(e) => handleNestedArrayItemChange('achievements', idx, 'items', i, 'title', e.target.value)}
                                                className="flex-1 border rounded p-2 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Org / Desc"
                                                value={item.org || item.desc || ''}
                                                onChange={(e) => handleNestedArrayItemChange('achievements', idx, 'items', i, item.org !== undefined ? 'org' : 'desc', e.target.value)}
                                                className="flex-1 border rounded p-2 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year"
                                                value={item.year || ''}
                                                onChange={(e) => handleNestedArrayItemChange('achievements', idx, 'items', i, 'year', e.target.value)}
                                                className="w-24 border rounded p-2 text-sm text-center"
                                            />
                                            <button onClick={() => handleRemoveNestedItem('achievements', idx, 'items', i)} className="text-red-400 hover:text-red-600 p-2">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddNestedItem('achievements', idx, 'items', defaultTemplates.achievementItem)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                                        <Plus size={14} /> Add Item
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* 4. Competencies Section */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h2 className="text-xl font-bold text-blue-900">Kompetensi Teras</h2>
                            <button onClick={() => handleAddSectionItem('competencies', defaultTemplates.competencies)} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm font-semibold">
                                <Plus size={16} /> Add Category
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.competencies.map((cat, idx) => (
                                <div key={idx} className="bg-white p-4 rounded shadow-sm border border-gray-100 group relative">
                                    <div className="flex justify-between items-center mb-3">
                                        <input
                                            type="text"
                                            value={cat.category}
                                            onChange={(e) => handleArrayItemChange('competencies', idx, 'category', e.target.value)}
                                            className="font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
                                            placeholder="Category Name"
                                        />
                                        <button onClick={() => handleRemoveSectionItem('competencies', idx)} className="text-red-400 hover:text-red-600 p-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {cat.items.map((item, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => handleNestedArrayItemChange('competencies', idx, 'items', i, null, e.target.value)}
                                                    className="w-full border rounded p-2 text-sm"
                                                    placeholder="Skill"
                                                />
                                                <button onClick={() => handleRemoveNestedItem('competencies', idx, 'items', i)} className="text-red-400 hover:text-red-600 p-2">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => handleAddNestedItem('competencies', idx, 'items', defaultTemplates.competencyItem)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded mt-2">
                                            <Plus size={14} /> Add Skill
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. Experience Section */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold text-blue-900 mb-6 border-b pb-2">Pengalaman Kerja</h2>

                        {/* Main Role Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Jawatan</label>
                                <input type="text" value={formData.experience.role} onChange={(e) => handleChange('experience', 'role', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Organisasi/Syarikat</label>
                                <input type="text" value={formData.experience.company} onChange={(e) => handleChange('experience', 'company', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Tempoh</label>
                                <input type="text" value={formData.experience.duration} onChange={(e) => handleChange('experience', 'duration', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Ringkas</label>
                                <textarea rows={2} value={formData.experience.desc} onChange={(e) => handleChange('experience', 'desc', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                        </div>

                        {/* Experience Details */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-700">Experience Details</h3>
                            <button onClick={handleAddExperienceDetail} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm font-semibold">
                                <Plus size={16} /> Add Area
                            </button>
                        </div>

                        {formData.experience.details?.map((detail, idx) => (
                            <div key={idx} className="mb-6 p-4 bg-white rounded shadow-sm border border-gray-100 group relative">
                                <div className="flex justify-between items-center mb-2 border-b pb-1">
                                    <input
                                        type="text"
                                        value={detail.title}
                                        onChange={(e) => {
                                            const newDetails = [...formData.experience.details];
                                            newDetails[idx] = { ...newDetails[idx], title: e.target.value };
                                            setFormData(prev => ({ ...prev, experience: { ...prev.experience, details: newDetails } }));
                                        }}
                                        className="font-bold text-blue-800 border-none outline-none w-full"
                                        placeholder="Section Title"
                                    />
                                    <button onClick={() => handleRemoveExperienceDetail(idx)} className="text-red-400 hover:text-red-600 p-1">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {detail.items.map((item, i) => (
                                        <div key={i} className="p-3 bg-gray-50 rounded border border-gray-100 flex gap-2 items-start">
                                            <div className="grid grid-cols-1 gap-2 flex-1">
                                                <div className='flex flex-col'>
                                                    <label className="text-xs text-gray-500">Tajuk Bolt (Bold Target)</label>
                                                    <input
                                                        type="text"
                                                        value={item.boldTarget}
                                                        onChange={(e) => handleExperienceDetailChange(idx, i, 'boldTarget', e.target.value)}
                                                        className="border rounded p-1 text-sm font-semibold"
                                                    />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label className="text-xs text-gray-500">Kandungan Penuh (Full Text)</label>
                                                    <textarea
                                                        rows={2}
                                                        value={item.text}
                                                        onChange={(e) => handleExperienceDetailChange(idx, i, 'text', e.target.value)}
                                                        className="w-full border rounded p-2 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveExperienceItem(idx, i)} className="text-red-400 hover:text-red-600 p-1 mt-2">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddExperienceItem(idx)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                                        <Plus size={14} /> Add Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* 6. Education */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold text-blue-900 mb-6 border-b pb-2">Pendidikan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Ijazah / Kelayakan</label>
                                <input type="text" value={formData.education.degree} onChange={(e) => handleChange('education', 'degree', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Institusi</label>
                                <input type="text" value={formData.education.school} onChange={(e) => handleChange('education', 'school', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Tahun Graduasi</label>
                                <input type="text" value={formData.education.year} onChange={(e) => handleChange('education', 'year', e.target.value)} className="w-full border rounded p-2" />
                            </div>
                        </div>
                    </section>

                    {/* 7. Certifications */}
                    <section className="bg-gray-50 p-6 rounded-lg border">
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <h2 className="text-xl font-bold text-blue-900">Sijil Profesional (Certifications)</h2>
                            <button onClick={() => handleAddSectionItem('certifications', defaultTemplates.certification)} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm font-semibold">
                                <Plus size={16} /> Add Cert
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.certifications?.map((cert, idx) => (
                                <div key={idx} className="p-4 bg-white rounded shadow-sm flex flex-col gap-2 relative group border border-gray-100">
                                    <button onClick={() => handleRemoveSectionItem('certifications', idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="flex gap-2 pr-8">
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-500">Nama Sijil</label>
                                            <input
                                                type="text"
                                                value={cert.title}
                                                onChange={(e) => handleArrayItemChange('certifications', idx, 'title', e.target.value)}
                                                className="w-full border rounded p-2 text-sm font-semibold"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-500">Badan Pengeluar / Subtitle</label>
                                            <input
                                                type="text"
                                                value={cert.subtitle || ''}
                                                onChange={(e) => handleArrayItemChange('certifications', idx, 'subtitle', e.target.value)}
                                                className="w-full border rounded p-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <label className="text-xs text-gray-500">Details</label>
                                        </div>

                                        <div className="space-y-2 mt-1">
                                            {(cert.details || []).map((detail, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={detail}
                                                        onChange={(e) => handleNestedArrayItemChange('certifications', idx, 'details', i, null, e.target.value)}
                                                        className="w-full border rounded p-2 text-sm text-gray-600"
                                                    />
                                                    <button onClick={() => handleRemoveNestedItem('certifications', idx, 'details', i)} className="text-red-400 hover:text-red-600 p-1">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button onClick={() => handleAddNestedItem('certifications', idx, 'details', defaultTemplates.certificationDetail)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                                                <Plus size={14} /> Add Detail Line
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default KemaskiniResume;
