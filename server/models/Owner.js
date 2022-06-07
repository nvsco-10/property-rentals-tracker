import mongoose from 'mongoose'
import validator from 'validator'

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: 3,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },
  },
 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

  
export default mongoose.model('Owner', OwnerSchema);
