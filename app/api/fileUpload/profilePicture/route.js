import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function postProfilePicture(file, fileName, userId) {
  const fileBuffer = file;
  console.log(fileName);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `profile-pictures/${userId}/profile-pic`,
    // Add fileName to the Key to save image with original file name
    // + fileName,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };
  const result = await s3Client.send(new PutObjectCommand(uploadParams));
  console.log(result);
  return fileName;
}

export async function POST(request) {
  try {
    // const { file } = await request.body.json();
    // const command = new PutObjectCommand({
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: file.name,
    //   Body: file.data,
    // });
    // const response = await s3Client.send(command);
    // return NextResponse.json({ response });

    const formData = await request.formData();

    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await postProfilePicture(buffer, file.name, userId);
    return NextResponse.json({ message: "File uploaded", fileName });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // need the userId to identify the image, the url structure is profile-pictures/{userId}/profile-pic
  try {
    const { userId } = request.query;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `profile-pictures/${userId}/profile-pic`,
    });

    const response = await s3Client.send(command);
    return NextResponse.file(response.Body, { type: "image/jpeg" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
