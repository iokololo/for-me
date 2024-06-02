import models from "../models/index.js";

class AuthorService {
  async getAll(page = 1, limit = 10, search = '') {
    try {
      const query = {
        role: "Teacher"
      };
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } }
        ];
      }

      const authors = await models.User.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await models.User.countDocuments(query);

      return {
        status: 200,
        data: {
          authors,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          totalAuthors: total
        }
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e.message };
    }
  }

  async getById(id) {
    try {
      const [author, courses, books, schedule] = await
       Promise.all([
        models.User.findById({
            _id: id,
          }),
        models.Product.find({
            author: id,
            type: "Courses"
        }),
        models.Product.find({
            author: id,
            type: "Books"
        }),
        models.Schedule.find({
          teacher: id
        })
       ])
      return {
        status: 200,
        data: {
          ...author.toObject(),
          courses,
          books,
          schedule
        }
      };
    } catch (e) {
      console.log(e);
      return { status: 500, data: e.message };
    }
  }

  async hire({ studentId, teacherId, date, slot, lessonId }){
    try {
      const teacher = await models.User.findById(teacherId);
      if (!teacher) {
        return { status: 404, data: 'Teacher not found' }
      }

      if (teacher.role !== 'Teacher') {
        return { status: 400, data: 'User is not a teacher' }
      }

      const existingSchedule = await models.Schedule.findOne({ date, slots: slot, teacher: teacherId });
      if (existingSchedule) {
        return { status: 400, data: 'This time slot is already booked' }
      }

      const scheduleEntry = await models.Schedule({
        date,
        slots: [slot],
        teacher: teacherId,
        student: studentId,
        lesson: lessonId
      });
  
      await scheduleEntry.save();
  
      if(teacher.schedule && teacher.schedule.length) teacher.schedule.push(scheduleEntry._id);
      else teacher.schedule = [scheduleEntry._id]
      await teacher.save();

      return this.getById(teacherId)
    } catch (e) {
      console.log(e);
      return { status: 500, data: e.message };
    }
  }
}

export default new AuthorService();
