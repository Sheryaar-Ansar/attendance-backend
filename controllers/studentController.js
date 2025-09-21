const Student = require("../models/Student")


exports.createStudent = async (req,res) => {
    const user = req.user.id
    const alreadyEnroll = await Student.findOne({ name: user})
    if(alreadyEnroll) return res.status(400).json({error: "Already Enrolled"})
    const student = await Student.create({...req.body, name: user})
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
    if (req.user.role !== 'admin' && studentByRoll.name.toString() !== userId) return res.status(401).json({ error: "You cannot mark other student attendance" })
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
    const studentsPresent = await Student.find({ status: 'present' }).populate('name', 'name')
    const studentsAbsent = await Student.find({ status: 'absent' }).populate('name', 'name')
    const totalStudents = await Student.countDocuments()
    res.json({
        totalStudents: totalStudents,
        studentsPresent: studentsPresent,
        studentsAbsent: studentsAbsent
    })
 }

 //testing purpose
//  exports.getAllStudentsAttendance = async (req, res) => {
//     try {
//         const { date } = req.query;
//         let matchStage = {};

//         // ✅ Filter by date if provided
//         if (date) {
//             const startOfDay = new Date(date);
//             startOfDay.setHours(0, 0, 0, 0);

//             const endOfDay = new Date(date);
//             endOfDay.setHours(23, 59, 59, 999);

//             matchStage.createdAt = { $gte: startOfDay, $lte: endOfDay };
//         }


//         const result = await Student.aggregate([
//             { $match: matchStage },
//             {
//                 $group: {
//                     _id: "$status",
//                     students: { $push: { _id: "$_id", name: "$name", day: "$day" } },
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);

//         let studentsPresent = [];
//         let studentsAbsent = [];
//         let totalStudents = 0;

//         result.forEach(item => {
//             totalStudents += item.count;
//             if (item._id === "present") {
//                 studentsPresent = item.students;
//             } else if (item._id === "absent") {
//                 studentsAbsent = item.students;
//             }
//         });

//         res.json({
//             totalStudents,
//             studentsPresent,
//             studentsAbsent
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
