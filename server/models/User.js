import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    // assignedRentals: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Rental'
    //   }
    // ],
  },
 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())

  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// UserSchema.virtual('assignedRentalCount').get(function () {
//   return this.assignedRentals.length;
// });
  
export default mongoose.model('User', UserSchema);
