import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const resumeRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
      pdf.save("resume.pdf");
    });
  };

  const generateResumeAI = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/generate-resume", formData);
      setFormData({ ...formData, experience: response.data.experience, skills: response.data.skills });
    } catch (error) {
      console.error("Error generating resume:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/2 p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">AI Resume Builder</h2>

        <label className="block text-gray-700 font-semibold">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block text-gray-700 font-semibold">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block text-gray-700 font-semibold">Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block text-gray-700 font-semibold">Education:</label>
        <textarea name="education" value={formData.education} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block text-gray-700 font-semibold">Experience:</label>
        <textarea name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block text-gray-700 font-semibold">Skills:</label>
        <textarea name="skills" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <button onClick={generateResumeAI} className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700">
          {loading ? "Generating..." : "Generate with AI"}
        </button>

        <button onClick={downloadPDF} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
          Download Resume
        </button>
      </div>

      <div className="w-full md:w-1/2 p-6 border rounded-lg shadow-md bg-gray-100" ref={resumeRef}>
        <h2 className="text-2xl font-bold">{formData.name || "Your Name"}</h2>
        <p className="text-gray-600">{formData.email || "your.email@example.com"} | {formData.phone || "123-456-7890"}</p>
        <hr className="my-2" />

        <h3 className="text-lg font-semibold">Education</h3>
        <p>{formData.education || "Your education details go here..."}</p>

        <h3 className="text-lg font-semibold mt-2">Experience</h3>
        <p>{formData.experience || "Your experience details go here..."}</p>

        <h3 className="text-lg font-semibold mt-2">Skills</h3>
        <p>{formData.skills || "Your skills go here..."}</p>
      </div>
    </div>
  );
};

export default ResumeBuilder;
