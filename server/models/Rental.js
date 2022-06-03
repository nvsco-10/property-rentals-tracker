import mongoose from 'mongoose'

// Schema to create note - not a mongoose model
const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, 'Please provide a note'],
      minlength: 3,
      maxLength: 400,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true
  }
);

const RentalSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: [true, 'Please provide a street address'],
      minlength: 3,
      maxlength: 50,
      trim: true,
      unique: true,
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
      required: true,
    },
    actions: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Action'
      }
    ],
    notes: [noteSchema],
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
.virtual('noteCount')
.get(function() {
    return this.notes.length;
})

export default mongoose.model('Rental', RentalSchema);
