import { exec } from 'child_process';
import userModel from '../model/userModel';

export const extractResumeTextFromURL = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    const resumeUrl = user?.profile?.resume;

    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume URL not found." });
    }

    // Call the Python script
    exec(`python3 python/extract_from_url.py "${resumeUrl}"`, async (err, stdout, stderr) => {
      if (err) {
        console.error("Python error:", err);
        return res.status(500).json({ message: "Failed to extract resume text." });
      }

      const extractedText = stdout;

      // Efficiently update user profile.resumeText
      await userModel.updateOne(
        { _id: userId },
        { $set: { "profile.resumeText": extractedText } }
      );

      res.status(200).json({ message: "Resume text extracted and saved", resumeText: extractedText });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
