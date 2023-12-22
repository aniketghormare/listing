const JobApplicationController=require("../controllers/JobApplicationController.js")
const { auth} = require("../middleware/auth.middleware.js");

const jobapplicationrouter=require("express").Router()
jobapplicationrouter.use(auth)

jobapplicationrouter.post('/job-applications', JobApplicationController.createJobApplication);
jobapplicationrouter.get('/job-applications', JobApplicationController.getAllJobApplications);
jobapplicationrouter.get('/job-applications/:id', JobApplicationController.getJobApplicationById);
jobapplicationrouter.put('/job-applications/:id', JobApplicationController.updateJobApplication);
jobapplicationrouter.delete('/job-applications/:id', JobApplicationController.deleteJobApplication);


module.exports=jobapplicationrouter



