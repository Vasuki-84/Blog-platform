import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/POSTmodel";

export async function GET(request, { params }) {
  try {
    await connectMongo();

    const { id } = await params;

    const postData = await PostModel.findById(id);

    return Response.json(postData);
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}