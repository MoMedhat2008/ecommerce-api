const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-0]/g, "-");
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);