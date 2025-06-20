import { connectdb } from "@/dbConfig/dbconfig";
import User from "@/models/usermodel";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    await connectdb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }

    const newUser = new User({ email, password });  
    await newUser.save();

    return new Response(JSON.stringify({ message: "User registered", email }), { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
