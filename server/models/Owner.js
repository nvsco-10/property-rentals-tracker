import mongoose from 'mongoose'
import validator from 'validator'

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: 3,
      maxlength: 20,
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
    rentals: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Rental'
      }
    ],
  },
 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


OwnerSchema.virtual('rentalCount')
  .get(function () {
    return this.rentals.length;
  });
  
export default mongoose.model('Owner', OwnerSchema);
