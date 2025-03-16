import Resume from '../models/Resume.js';

export const saveResume = async (req, res) => {
    try {
        const resume = new Resume(req.body);
        await resume.save();
        res.status(201).json({ success: true, message: "Resume saved successfully", resume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
