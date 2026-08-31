const Teacher = require('../models/Teacher');

// Soo saar dhammaan macallimiinta
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: teachers.length, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ku dar macallin cusub
exports.createTeacher = async (req, res) => {
  try {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const teacherId = `TCH-${new Date().getFullYear()}-${randomNum}`;
    
    const teacherData = { ...req.body, teacherId };

    const teacher = await Teacher.create(teacherData);
    res.status(201).json({ success: true, message: 'Macallinka si guul leh ayaa loo diiwaan geliyay', data: teacher });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Wax ka beddel macallin (Update)
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Macallinka lama helin' });
    }
    res.status(200).json({ success: true, message: 'Macallinka si guul leh ayaa loo cusboonaysiiyay', data: teacher });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Tirtir macallin
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Macallinka lama helin' });
    }
    res.status(200).json({ success: true, message: 'Macallinka si guul leh ayaa loo tirtiray' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
