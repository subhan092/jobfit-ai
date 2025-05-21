import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    role: { type: String, enum: ["user", "recruiter","Admin"]  },
    profile: {
        type: {
          bio: { type: String },
          skills: [{ type: String }],
          resume: { type: String },
          OriginalName: { type: String },
          company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        },
        default: {}, 
      },
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
export default userModel;
