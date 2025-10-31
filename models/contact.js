const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('Contact', contactSchema);
=======
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  birthday: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);

>>>>>>> 024d511fa67e18737e386f72a070c19463ebd462
