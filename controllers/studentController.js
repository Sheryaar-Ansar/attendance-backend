const Student = require("../models/Student")


exports.createStudent = async (req,res) => {
    const user = req.user.id
    const alreadyEnroll = await Student.findOne({ name: user})
    if(alreadyEnroll) return res.status(400).json({error: "Already Enrolled"})
    const student = await Student.create(req.body)
    res.status(201).json({
        name: user,
        rollNo: student.rollNo,
        day: student.day,
        status: student.status
    })
}

exports.checkin = async (req, res) => {
    const { rollNo } = req.params
    const userId = req.user.id

    const studentByRoll = await Student.findOne({ rollNo })
    if (!studentByRoll) return res.status(404).json({ error: "Student not found" })
    if (req.user.role !== 'admin' && studentByRoll._id.toString() !== userId) return res.status(401).json({ error: "You cannot mark other student attendance" })
    const updated = { status: 'present' }
    if(studentByRoll.status === 'present'){
        return res.status(400).json({error: "You cannot mark the attendance twice"})
    }
    await Student.findOneAndUpdate(
        { rollNo },
        updated,
        { new: true, runValidators: true }
    )
    res.json({message: `Attendance Marked for ${studentByRoll.name}`})
}

exports.getAllStudentsAttendance = async (req, res) => {
    const studentsPresent = await Student.find({ status: 'present' }).select('name')
    const studentsAbsent = await Student.find({ status: 'absent' }).select('name')
    const totalStudents = await Student.countDocuments()
    res.json({
        totalStudents: totalStudents,
        studentsPresent: studentsPresent,
        studentsAbsent: studentsAbsent
    })
 }