import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'button', 'spacer', 'divider'], // Restrict to known block types
  },
  content: {
    type: String,
    required: function () {
      return this.type !== 'spacer' && this.type !== 'divider';
    }, // Content is required for all types except spacer and divider
  },
  styles: {
    type: Map,
    of: String, // Store styles as key-value pairs
  },
  selected: {
    type: Boolean,
    default: false, // Default value for the selected field
  },
});

const TemplateSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensure template ID is unique
  },
  name: {
    type: String,
    required: true,
  },
  blocks: [BlockSchema], // Embed an array of blocks
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

// Create a model from the schema
const Template = mongoose.model('Template', TemplateSchema);

export default Template;
