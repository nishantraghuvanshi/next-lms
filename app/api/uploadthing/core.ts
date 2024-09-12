import { useAuth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log("Error")
}

export const ourFileRouter = {
  courseImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
    // .middleware(()=>handleAuth())
    .onUploadComplete(()=>{console.log("Upload complete")}),
  courseAttachment: f(["text", "pdf", "image", "video", "audio"])
    // .middleware(()=>handleAuth())
    .onUploadComplete(()=>{console.log("Upload complete")}),
  chapterVideo: f({video: {maxFileSize: "128GB", maxFileCount: 1}})
    // .middleware(()=>handleAuth())
    .onUploadComplete(()=>{console.log("Upload complete")})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
