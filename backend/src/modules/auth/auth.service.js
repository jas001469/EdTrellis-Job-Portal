import User from "../../models/User.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken({ id: user._id, role: user.role });

  return { user, token };
};

export const loginUser = async ({ email, password, role }) => {
  const user = await User.findOne({ email });

  // ❌ email not found
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ❌ role mismatch
  if (user.role !== role) {
    throw new Error("Invalid credentials");
  }

  // ❌ password mismatch
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};
