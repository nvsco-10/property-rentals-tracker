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

const ActionSchema = new mongoose.Schema(
  {
    actionItem: {
      type: String,
      required: [true, 'Please provide an action item'],
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    details: {
      type: String,
      maxlength: 400,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open','closed'],
      default: 'open'
    },
    priority: {
      type: String,
      enum: ['normal', 'high'],
      default: 'normal'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    notes: [noteSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true
  }
);

ActionSchema
    .virtual('noteCount')
    .get(function() {
        return this.notes.length;
    })

export default mongoose.model('Action', ActionSchema);