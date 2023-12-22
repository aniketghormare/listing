const db = require("../models");
const pagination = require("../helper/pagination");
const Buy = db.buys;
const Rent = db.rents;
const Job = db.jobs;
const JobApplication = db.JobApplication;

// Create a new job application
exports.createJobApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      jobPosition,
      highestQualification,
      experience,
      relocate,
      currentCtc,
      expectedCtc,
      currentLocation,
      resume,
      uid,
      jobid,
    } = req.body;

    const existingCartItem = await JobApplication.findOne({
      where: { jobid: jobid, uid: req.body.uid },
    });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job!!" });
    }

    const formData = req.body;
    const jobApplication = await JobApplication.create(formData);
    return res.status(201).json({ status: "success", data: jobApplication });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating job application" });
  }
};

// Get all job applications
exports.getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.findAll();
    return res.status(200).json(jobApplications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching job applications" });
  }
};

// Get a single job application by ID
exports.getJobApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobApplication = await JobApplication.findByPk(id);
    if (!jobApplication) {
      return res.status(404).json({ error: "Job application not found" });
    }
    return res.status(200).json(jobApplication);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching job application" });
  }
};

// Update a job application by ID
exports.updateJobApplication = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  try {
    const [updated] = await JobApplication.update(formData, {
      where: { id },
    });
    if (updated) {
      const jobApplication = await JobApplication.findByPk(id);
      return res.status(200).json(jobApplication);
    }
    return res.status(404).json({ error: "Job application not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating job application" });
  }
};

// Delete a job application by ID
exports.deleteJobApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await JobApplication.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: "Job application not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting job application" });
  }
};
