import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useState } from "react";

type UploadPhotoProps = {
    image: File | null,
    setImage: (image: File|null) => void
}

const UploadPhoto = ({setImage}:UploadPhotoProps) => {
    const [previewImage, setPreviewImage] = useState("");
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            if(!acceptedFiles.length) return;
            setImage(acceptedFiles[0]);
            setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
        },
        accept: {
            "image/*": [],
        },
        maxFiles: 1,
        maxSize: 8192002,
    });

    function clearImage() {
        setPreviewImage("");
        setImage(null);
    }
    return (
        <>
        {
            previewImage ? (
                <div className="w-full mx-auto">
                    <div className="text-end py-2">
                        <button onClick={clearImage} className="p-1 rounded bg-primary hover:bg-green-500"><IoClose size={22}/></button>
                    </div>
                    <Image src={previewImage} alt={acceptedFiles[0].name} className="w-full mx-auto rounded shadow" width={200} height={200} />
                </div>
            )
            :
            <div {...getRootProps({ className: "dropzone" })}>
                <div className="flex justify-center items-center pb-4">
                    <FaCloudUploadAlt size={48} />
                </div>
                <input {...getInputProps()} name="file" />
                <p>Choose an image or Drag and Drop</p>
                <small>Image size 8MB (max)</small>
            </div>
        }
        </>
    )
}

export default UploadPhoto;