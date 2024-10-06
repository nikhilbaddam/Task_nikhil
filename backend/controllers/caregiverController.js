

const CareGivers=require('../models/caregiversModel');



const registerCaregiver = async (req, res) => {
    const { name, status,dateOfRegistration } = req.body;
  
    try {
      const newCaregiver = new CareGivers({ name, status,dateOfRegistration });
      await newCaregiver.save();
      res.status(201).json({ message: 'Caregiver registered successfully', data: newCaregiver });
    } catch (error) {
      res.status(500).json({ message: 'Error registering caregiver', error });
    }
  };

  const getCaregiverOverview = async (req, res) => {

    try {
      const total = await CareGivers.countDocuments();
      const active = await CareGivers.countDocuments({ status: 'Active' });
      const inactive = await CareGivers.countDocuments({ status: 'Inactive' });
  
      res.json({ total, active, inactive });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };



  const getCaregiversEnrollments = async (req, res) => {
    try {
      const caregivers = await CareGivers.find({}, 'dateOfRegistration'); // Fetch only dateOfRegistration field
      res.status(200).json(caregivers);
    } catch (error) {
      res.status(500).json({ error: 'Server error fetching caregivers enrollments' });
    }
  };



module.exports = {  registerCaregiver,getCaregiverOverview,getCaregiversEnrollments};
