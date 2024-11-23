import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({
  imagefile,
  setimagefile,
  upploadimage,
  setupploadimage,
  setimageLoadingState,
  imageLoadingState
}) => {
  const inputRef = useRef(null);

  function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setimagefile(selectedFile);
    }
  }

  function handleDragOver(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0]; // Lấy file đầu tiên
    if (droppedFile) {
      setimagefile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setimagefile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadImageToCloudinary() {
    setimageLoadingState(true)
    const data = new FormData();
    data.append("my_file", imagefile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/uppload-image",
      data
    );
    console.log(response, "response");
    if(response?.data?.success) {
      setupploadimage(response.data.url)
      setimageLoadingState(false)
    }
  }

  useEffect(() => {
    if (imagefile !== null) uploadImageToCloudinary();
  }, [imagefile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        className="border-2 border-dashed rounded-lg p-4 cursor-pointer"
        onDragOver={handleDragOver} // Xử lý kéo qua vùng
        onDrop={handleDrop} // Xử lý thả file
        onClick={() => inputRef.current && inputRef.current.click()} // Click để mở input file
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        {!imagefile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Please upload an image</span>
          </Label>
        ) : (
          imageLoadingState?<Skeleton className='h-10 bg-gray-400'/>:
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary h-8 mr-2" />
              <p className="text-sm font-medium">{imagefile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
