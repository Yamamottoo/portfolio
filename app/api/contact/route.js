import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { fullname, telegram, vk, email, message } = await req.json();

  try {
    await connectDB();
    await Contact.create({ fullname, telegram, vk, email, message });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: "Unable to send message." });
    };
  };
};
