const StudyCase = require("../../model/teacher_certification/studycase/studycase_model");
const StudyCaseAnswer = require("../../model/teacher_certification/studycase/studycase_answer_model");
const StudyCaseForum = require("../../model/teacher_certification/studycase/studycase_forum_model");
const StudyCaseAccess = require("../../model/teacher_certification/studycase/studycase_access_model");
const mongoose = require("mongoose");

// =======================
// 📘 STUDY CASE CRUD
// =======================

// CREATE Study Case
const studyCase = {
  createStudyCase: async (req, res) => {
    try {
      const studyCase = new StudyCase(req.body);
      await studyCase.save();
      res.status(201).json(studyCase);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  // ✅ GET ALL STUDY CASES (dengan filter + pagination)
  , getAllStudyCases: async (req, res) => {
    try {
      const { search, topikIPA, jenjang, kompetensiGuru, page = 1, limit = 12 } = req.query;

      const filter = {};
      if (topikIPA) filter.topikIPA = topikIPA;
      if (jenjang) filter.jenjang = jenjang;
      if (search) filter.judulKasus = { $regex: search, $options: "i" };
      if (kompetensiGuru) filter.kompetensiGuru = kompetensiGuru;
      const skip = (Number(page) - 1) * Number(limit);

      const [data, total] = await Promise.all([
        StudyCase.find(filter)
          .populate("forums")
          .skip(skip)
          .limit(Number(limit))
          .sort({ createdAt: -1 }),
        StudyCase.countDocuments(filter)
      ]);

      res.json({
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalData: total,
        data
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET Single Study Case by ID
  , getStudyCaseById: async (req, res) => {
    try {
      const { userId } = req.query
      const studyCase = await StudyCase.findById(req.params.id)
        .populate("forums");
      const answer = await StudyCaseAnswer.find({
        studyCaseId: req.params.id,
        userId: userId
      })
      let obj = {}
      if (!studyCase) {
        return res.status(404).json({ message: "Study case not found" });
      }
      obj = { ...studyCase._doc, answer: answer[0], forums: studyCase.forums }
      res.json(obj);
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ error: err.message });
    }
  }

  // UPDATE Study Case
  , updateStudyCase: async (req, res) => {
    try {
      const studyCase = await StudyCase.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!studyCase) return res.status(404).json({ message: "Study case not found" });
      res.json(studyCase);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // DELETE Study Case (hapus juga relasi answer & forum)
  , deleteStudyCase: async (req, res) => {
    try {
      const studyCase = await StudyCase.findByIdAndDelete(req.params.id);
      if (!studyCase) return res.status(404).json({ message: "Study case not found" });

      await StudyCaseAnswer.deleteOne({ studyCaseId: req.params.id });
      await StudyCaseForum.deleteMany({ studyCaseId: req.params.id });

      res.json({ message: "Study case and related data deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // =======================
  // 🧠 STUDY CASE ANSWER CRUD
  // =======================
  , createAnswer: async (req, res) => {
    try {
      const { studyCaseId, userId, answer } = req.body;
      console.log(req.body)
      const existing = await StudyCaseAnswer.findOne({ studyCaseId: studyCaseId, userId: userId });
      if (existing) return res.status(400).json({ message: "Answer already exists for this study case" });
      const newAnswer = new StudyCaseAnswer({ studyCaseId, userId, answer });
      await newAnswer.save();
      res.status(201).json(newAnswer);
    } catch (err) {
      console.log(err.message)
      res.status(400).json({ error: err.message });
    }
  }

  , updateAnswer: async (req, res) => {
    try {
      const updated = await StudyCaseAnswer.findOneAndUpdate(
        { studyCaseId: req.params.studyCaseId },
        req.body,
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: "Answer not found" });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  , deleteAnswer: async (req, res) => {
    try {
      const deleted = await StudyCaseAnswer.findOneAndDelete({
        studyCaseId: req.params.studyCaseId
      });
      if (!deleted) return res.status(404).json({ message: "Answer not found" });
      res.json({ message: "Answer deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // =======================
  // 💬 STUDY CASE FORUM CRUD
  // =======================
  , createForumMessage: async (req, res) => {
    try {
      const { studyCaseId, userId, name, message } = req.body;
      const forumMsg = new StudyCaseForum({ studyCaseId, userId, name, message });
      await forumMsg.save();
      res.status(201).json(forumMsg);
    } catch (err) {
      console.log(err.message)
      res.status(400).json({ error: err.message });
    }
  }

  , getForumByStudyCase: async (req, res) => {
    try {
      const messages = await StudyCaseForum.find({ studyCaseId: req.params.studyCaseId })
        .populate("userId", "name email")
        .sort({ createdAt: 1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  , deleteForumMessage: async (req, res) => {
    try {
      const deleted = await StudyCaseForum.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Message not found" });
      res.json({ message: "Forum message deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  /* ==========================
       MODUL AJAR ACCESS CONTROLLERS
    ============================= */

  // ✅ Create Access
  createAccess: async (req, res) => {
    try {
      const access = await StudyCaseAccess.create(req.body);
      res.status(201).json(access);
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ Get All Access (populate modul ajar)
  getAllAccess: async (req, res) => {
    try {
      if (req.query.userId) {
        console.log(req.query.userId)
        const accessList = await StudyCaseAccess.find({ userId: `${req.query.userId}` })
          .populate("studyCaseId").sort({ createdAt: -1 });

                console.log(accessList)
        res.status(200).json(accessList);
      } else {
        const accessList = await StudyCaseAccess.find()
          .populate("studyCaseId")
          .sort({ createdAt: -1 });
        res.status(200).json(accessList);
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Get Access by Modul Ajar
  getAccessByStudyCase: async (req, res) => {
    try {
      const { studyCaseId } = req.params
      const { userId } = req.query
      let obj = { studyCaseId: studyCaseId }
      if (userId) obj.userId = userId
      const accessList = await StudyCaseAccess.find(obj).sort({ createdAt: -1 });
      res.status(200).json(accessList);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ Update Access
  updateAccess: async (req, res) => {
    try {
      const access = await StudyCaseAccess.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(access);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ Delete Access
  deleteAccess: async (req, res) => {
    try {
      await StudyCaseAccess.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Access data berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
}



module.exports = studyCase