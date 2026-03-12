import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 30,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 30,
      lowercase: true,
      trim: true
    },
  },
  { 
    timestamps: true 
  }
);

// Modern async pre-save (no next!)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// compare the passwords (this part is fine)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);