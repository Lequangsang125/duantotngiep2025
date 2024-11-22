import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { UploadCloudIcon } from "lucide-react";

const Image_Uppload = ({
  imagefile,
  setimagefile,
  upploadimage,
  setupploadimage,
}) => {
  const inputRef = useRef(null);
  function handImageChane(e) {
    console.log(e.target.files);
    const selectFile = e.target.files[0];
    if (selectFile) {
      setimagefile(selectFile);
    }
  }
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <label className="text-lg font-semibold mb-2 block">Uppload Image</label>
      <div className="border-2 border-dashed rounded-lg p-4">
        <Input
          id="image-uppload"
          type="file"
          // className="hidden"
          ref={inputRef}
          onChange={handImageChane}
        ></Input>
        {!imagefile ? (
          <Label
            htmlFor="image-upload"
            className=" flex flex-col items-center justify-center h-32 cursor-pointer`"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />

            <span> Please upload an image</span>
          </Label>
        ) : (
          <div>
            <p>Image uploaded successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Image_Uppload;
