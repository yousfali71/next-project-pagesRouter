import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/**
 * User Profile API Endpoint
 * GET /api/users/profile - Get current user profile
 * PATCH /api/users/profile - Update current user profile
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email: session.user.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          provider: user.provider,
          createdAt: user.createdAt,
        },
      });
    } catch (error: any) {
      console.error("Profile fetch error:", error);
      return res.status(500).json({ message: "Failed to fetch profile" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { name, currentPassword, newPassword } = req.body;

      const user = await User.findOne({ email: session.user.email }).select(
        "+password",
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update name if provided
      if (name && name !== user.name) {
        user.name = name;
      }

      // Update password if provided
      if (currentPassword && newPassword) {
        if (!user.password) {
          return res.status(400).json({
            message: "Cannot set password for OAuth accounts",
          });
        }

        const isPasswordValid = await bcrypt.compare(
          currentPassword,
          user.password,
        );

        if (!isPasswordValid) {
          return res.status(400).json({
            message: "Current password is incorrect",
          });
        }

        if (newPassword.length < 6) {
          return res.status(400).json({
            message: "New password must be at least 6 characters long",
          });
        }

        user.password = await bcrypt.hash(newPassword, 12);
      }

      await user.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      return res.status(500).json({ message: "Failed to update profile" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
