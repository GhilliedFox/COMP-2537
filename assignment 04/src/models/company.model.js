const { model, Schema, Types } = require('mongoose');

const CompanySchema = new Schema({
  name: String,
  locations: [
    {
      name: String,
      salaries: [
        {
          userId: Types.ObjectId,
          position: String,
          salary: Number,
          reported: { type: Boolean, default: false }
        },
      ],
    },
  ],
});

const CompanyModel = model('company', CompanySchema);

module.exports = { CompanyModel }; 
