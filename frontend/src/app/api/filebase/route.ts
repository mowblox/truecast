import { NextRequest } from "next/server";
import { ObjectManager } from "@filebase/sdk";

const objectManager = new ObjectManager(process.env.FILEBASE_S3_KEY, process.env.FILEBASE_S3_SECRET, {
  bucket: process.env.FILEBASE_S3_BUCKET
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File = formData.get('image') as File;
    const { cid } = await objectManager.upload(
      file.name,
      file,
      null,
      null
    );
    return Response.json({ success: true, message: 'File uploaded!', cid });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message });
  }
}