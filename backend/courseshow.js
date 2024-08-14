import { trainer, course } from'./connect.js'

const courseshow = async (req,res) => {
    const option = req.body
    console.log(option)
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const dataa = await course.find({ sdate: { $gte: today, $lt: tomorrow }, status: 'Upcoming' });
    for (let i = 0; i < dataa.length; i++) await course.findOneAndUpdate({ courseId: dataa[i].courseId }, { status: 'Ongoing' }, { new: true });
  
    const dat = await course.find({ sdate: { $lt: tomorrow }, status: 'Oncoming' });
    for (let i = 0; i < dat.length; i++) if (dat[i].attendance.length) await course.findOneAndUpdate({ courseId: data[i].courseId }, { status: 'Completed' }, { new: true });
  
    let data
    if (Object.keys(option).length == 2) {
      try {
        if (option.user == 'trainer') data = await course.find({ trainerId: option.id });
        else if (option.user == 'admin') data = await course.find();
        else if (option.user == 'trainee') data = await course.find({ empid: option.id });
        else if (option.user == 'course') data = await course.find({ courseId: option.id });
      } catch (error) { console.error('Error querying admin collection:', error); }
    }
    else {
      try {
        let limit; let start; let end;
        if (option.month != '') {
          limit = option.month.split('-');
          start = new Date(limit[0], limit[1] - 1, 1)
          end = new Date(limit[0], limit[1], 1);
        }
        if (option.user == 'admin' && option.train != 'Select Trainers' && option.month != '') { data = await course.aggregate([{ $match: { sdate: { $gte: start, $lt: end }, trainerId: option.train } }]); }
        else if (option.user == 'admin' && option.train != 'Select Trainers') data = await course.aggregate([{ $match: { trainerId: option.train } }]);
        else if (option.user == 'admin' && option.month != '') data = await course.aggregate([{ $match: { sdate: { $gte: start, $lt: end } } }]);
        else if (option.user == 'admin') { data = await course.find(); }
        else if (option.user == 'trainer' && option.month != '') data = await course.aggregate([{ $match: { sdate: { $gte: start, $lt: end }, trainerId: option.id } }])
        else if (option.user == 'trainer') data = await course.aggregate([{ $match: { trainerId: option.id } }])
        else if (option.user == 'trainee' && option.month != '') { data = await course.aggregate([{ $match: { sdate: { $gte: start, $lt: end }, empid: option.id } }]) }
        else if (option.user == 'trainee') data = await course.find({ empid: option.id });
      } catch (error) { console.error('Error querying admin collection:', error); }
    }
    for (let course of data) {
      const tra = await trainer.find({ trainerId: course.trainerId });
      
      course.overall = await (course.feedback[0].duration + course.feedback[0].content + course.feedback[0].questions + course.feedback[0].instructions + course.feedback[0].trainer) / (course.feedbackid.length * 5);
      console.log(course)
      course.name = `${course.name}-${tra[0].name}`;
      console.log(data)
    }
  
      if (option.user == 'course') res.json(data[0]);
      else res.json(data)
  
}

export default courseshow
