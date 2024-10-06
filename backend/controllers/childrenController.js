const Child = require('../models/childModel');

// Register a new child
const registerChild = async (req, res) => {
    const { name, status, dateOfRegistration } = req.body;
  
    try {
      const newChild = new Child({ 
        name, 
        status, 
        dateOfRegistration: new Date(dateOfRegistration) // Ensure date is properly formatted
      });
      await newChild.save();
      res.status(201).json({ message: 'Child registered successfully', data: newChild });
    } catch (error) {
      res.status(500).json({ message: 'Error registering child', error });
    }
  };

  





const getChildrenOverview = async (req, res) => {

  try {
    const total = await Child.countDocuments();
    const active = await Child.countDocuments({ status: 'Active' });
    const inactive = await Child.countDocuments({ status: 'Inactive' });

    res.json({ total, active, inactive });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};



const getChildrenEnrollments = async (req, res) => {
  try {
    const children = await Child.find({}, 'dateOfRegistration'); // Fetch only dateOfRegistration field
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching children enrollments' });
  }
};

module.exports = { getChildrenOverview,registerChild ,getChildrenEnrollments};
