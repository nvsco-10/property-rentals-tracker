import mongoose from 'mongoose'
import validator from 'validator'

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: 50,
      trim: true,
      unique: true,
    }
  },
 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

  
export default mongoose.model('Owner', OwnerSchema);
