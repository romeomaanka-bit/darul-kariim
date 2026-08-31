const Student = require('../models/Student');

// Soo saar dhammaan ardayda
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ku dar arday cusub
exports.createStudent = async (req, res) => {
  try {
    // Isticmaal lambar random ah si looga hortago duplicate key error
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const studentId = `DKS-${new Date().getFullYear()}-${randomNum}`;
    
    const studentData = { ...req.body, studentId };
    if (!studentData.admissionNumber) {
      studentData.admissionNumber = `ADM-${Date.now().toString().slice(-6)}`;
    }

    const student = await Student.create(studentData);
    res.status(201).json({ success: true, message: 'Ardayga si guul leh ayaa loo diiwaan geliyay', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Wax ka beddel arday (Update)
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Ardayga lama helin' });
    }
    res.status(200).json({ success: true, message: 'Ardayga si guul leh ayaa loo cusboonaysiiyay', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Tirtir arday
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Ardayga lama helin' });
    }
    res.status(200).json({ success: true, message: 'Ardayga si guul leh ayaa loo tirtiray' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};