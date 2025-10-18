import { Router } from "express";
import Subject from "../models/Subject.js";
import Lesson from "../models/Lesson.js";

const router = Router();

router.post("/subjects", async (req, res) => {
    const { name } = req.body;
    await Subject.create({ name });
    res.status(201).json({
        success: true,
        message: "New subject created successfully"
    });
});

router.get("/subjects", async (req, res) => {
    const totalCount = await Subject.countDocuments();
    const subjects = await Subject.find().sort({ createdAt: 1 });
    if (subjects.length == 0) {
        return res.status(404).json({
            success: false,
            message: "No lessons found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Subjects list fetched successfully",
        totalCount,
        data: subjects
    });
});

router.post("/lessons", async (req, res) => {
    const { subjectId, title, content } = req.body;
    
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    
    await Lesson.create({ subjectId, title, content });
    res.status(201).json({
        success: true,
        message: `New lesson created in ${subject.name}`
    });
});

router.get("/lessons", async (req, res) => {
    const { subjectId } = req.query;

    if (!subjectId) return res.status(400).json({ success: false, message: "subjectId is required" });

    const filter = {
        subjectId
    };
    const totalCount = await Lesson.countDocuments(filter);
    let lessons = await Lesson.find(filter).sort({ createdAt: 1 }).populate("subjectId").lean();
    if (lessons.length == 0) {
        return res.status(404).json({
            success: false,
            message: "No lessons found"
        });
    }

    lessons = lessons.map(lesson => {
        const { subjectId: subject, ...rest } = lesson;         
        return {
            ...rest,
            subject
        };
    });

    res.status(200).json({
        success: true,
        message: "Lessons list fetched successfully",
        totalCount,
        data: lessons
    });
});

export default router;