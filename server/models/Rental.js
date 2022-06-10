import mongoose from 'mongoose'

const RentalSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: [true, 'Please provide a street address'],
      maxlength: 50,
      trim: true,
    },
    city: {
      type: String,
      maxlength: 100,
      required: [true, 'Please provide a city'],
      trim: true,
    },
    zipCode: {
      type: String,
      minlength: 5,
      maxlength: 10,
      required: [true, 'Please provide a zip code'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'pending-lease', 'maintenance', 'closed'],
      default: 'open'
    },
    priority: {
      type: String,
      enum: ['normal', 'high'],
      default: 'normal'
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Owner'
    },
    assigned: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    actions: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Action'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

RentalSchema
    .virtual('actionCount')
    .get(function() {
        return this.actions.length;
    })

RentalSchema
  .virtual('fullAddress')
  .get(function() {
      return `${this.streetAddress}, ${this.city}, ${this.zipCode}`;
})

export default mongoose.model('Rental', RentalSchema);
