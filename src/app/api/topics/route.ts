import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Topic from "@/models/topic";

export async function GET() {
  try {
    await dbConnect();
    
    const topics = await Topic.aggregate([
      {
        $group: {
          _id: "$category",
          topics: {
            $push: {
              name: "$name",
              description: "$description",
              postCount: "$postCount"
            }
          }
        }
      },
      {
        $project: {
          category: "$_id",
          topics: 1,
          _id: 0
        }
      }
    ]);

    return NextResponse.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}