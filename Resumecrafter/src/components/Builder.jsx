import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe,
  FaTools, FaBriefcase, FaGraduationCap, FaCertificate,
  FaProjectDiagram, FaAward, FaLanguage, FaUpload, FaMapMarkerAlt
} from "react-icons/fa";

const Builder = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    projects: "",
    achievements: "",
    languages: "",
    photo: null,
  });

  const resumeRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const handleDownloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save("Resume.pdf");
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen pt-24 bg-gradient-to-br from-sky-100 via-cyan-100 to-sky-200 flex justify-center items-start p-10 font-[Inter]"
    >

      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden">

        {/* Form Section */}
        <div className="w-full lg:w-1/3 p-6 bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Fill Your Details</h2>

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <FaUpload /> Upload Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {formData.photo && (
              <img src={formData.photo} alt="Profile" className="mt-2 w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            )}
          </div>

          {[
            { name: "fullName", placeholder: "Full Name" },
            { name: "title", placeholder: "Professional Title" },
            { name: "email", placeholder: "Email" },
            { name: "phone", placeholder: "Phone" },
            { name: "location", placeholder: "Location" },
            { name: "linkedin", placeholder: "LinkedIn" },
            { name: "github", placeholder: "GitHub" },
            { name: "portfolio", placeholder: "Portfolio" },
          ].map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full my-2 px-3 py-2 rounded bg-white text-black focus:outline-none"
            />
          ))}

          {[
            { name: "skills", placeholder: "Skills (comma-separated)" },
            { name: "experience", placeholder: "Experience" },
            { name: "education", placeholder: "Education" },
            { name: "certifications", placeholder: "Certifications" },
            { name: "projects", placeholder: "Projects" },
            { name: "achievements", placeholder: "Achievements" },
            { name: "languages", placeholder: "Languages" },
          ].map((field) => (
            <textarea
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full my-2 px-3 py-2 rounded bg-white text-black focus:outline-none"
              rows={2}
            />
          ))}
        </div>

        {/* Resume Preview */}
        <div className="w-full lg:w-2/3 p-8" ref={resumeRef}>
          <div className="bg-white rounded-lg shadow-xl border-t-8 border-sky-400 p-6">

            {/* Top Section */}
            <div className="flex items-center gap-6 border-b pb-4 mb-4">
              {formData.photo && (
                <img src={formData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-sky-400 shadow" />
              )}
              <div>
                <h1 className="text-3xl font-bold text-sky-800">{formData.fullName || "Your Name"}</h1>
                <p className="text-cyan-600 font-semibold">{formData.title || "Professional Title"}</p>
                <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt /> {formData.location || "Your Location"}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {[
                { icon: <FaEnvelope />, text: formData.email },
                { icon: <FaPhone />, text: formData.phone },
                { icon: <FaLinkedin />, text: formData.linkedin },
                { icon: <FaGithub />, text: formData.github },
                { icon: <FaGlobe />, text: formData.portfolio },
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-2 text-gray-700">{item.icon} {item.text || "-"}</p>
              ))}
            </div>

            {/* Sections */}
            {[
              { title: "Skills", icon: <FaTools />, content: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [] },
              { title: "Experience", icon: <FaBriefcase />, content: [formData.experience] },
              { title: "Education", icon: <FaGraduationCap />, content: [formData.education] },
              { title: "Certifications", icon: <FaCertificate />, content: [formData.certifications] },
              { title: "Projects", icon: <FaProjectDiagram />, content: [formData.projects] },
              { title: "Achievements", icon: <FaAward />, content: [formData.achievements] },
              { title: "Languages", icon: <FaLanguage />, content: formData.languages ? formData.languages.split(",").map(l => l.trim()) : [] },
            ].map((section, i) => (
              <div key={i} className="mb-6 pl-4 border-l-4 border-sky-400">
                <h3 className="text-xl font-semibold text-sky-700 flex items-center gap-2 mb-2">{section.icon} {section.title}</h3>
                {section.content[0]
                  ? <ul className="list-disc list-inside text-gray-800">{section.content.map((c, j) => <li key={j}>{c}</li>)}</ul>
                  : <p className="text-gray-500">-</p>
                }
              </div>
            ))}

            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="mt-6 px-5 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
            >
              📄 Download as PDF
            </button>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Builder;
