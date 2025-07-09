const express = require("express");
const router = express.Router();
const { Project, User } = require("../models");

// ✅ Tambahkan user ke proyek
router.post("/:projectId/add-member", async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);

    if (!project || !user) {
      return res.status(404).json({ message: "Project or user not found" });
    }

    await project.addUser(user);
    res.json({ message: "User assigned to project successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error assigning user", error: err });
  }
});

// ❌ Hapus user dari proyek
router.delete("/:projectId/remove-member/:userId", async (req, res) => {
  const { projectId, userId } = req.params;

  try {
    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);

    if (!project || !user) {
      return res.status(404).json({ message: "Project or user not found" });
    }

    await project.removeUser(user);
    res.json({ message: "User removed from project successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error removing user", error: err });
  }
});

module.exports = router;
