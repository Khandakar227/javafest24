import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { serverUrl } from "@/lib/const";

type ReportData = {
    data: {
        Investigation: string;
        Result: string | number;
        ReferenceValue: string;
        Unit: string;
    }[];
    remark: string;
    summary: string;
    recommendations:string;
};

type UploadReportProps = {
    setReportData: (data: ReportData | null) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
};

const UploadReport = ({ setReportData, setError, setLoading }: UploadReportProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            if (!acceptedFiles.length) return;
            const imagePreview = URL.createObjectURL(acceptedFiles[0]);
            setPreviewImage(imagePreview);
        },
        accept: { "image/*": [] },
        maxFiles: 1,
        maxSize: 8192002,
    });

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    function clearImage() {
        setPreviewImage(null);
        setReportData(null);
    }

    async function processReport() {
        if (!acceptedFiles.length) return toast.error("Please upload an image of the report");

        setLoading(true);
        setError("");
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        formData.append("prompt", prompt);

        fetch(serverUrl + "/process-report", {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setReportData(data);
                }
            })
            .catch(() => setError("Failed to process the report"))
            .finally(() => setLoading(false));
    }

    return (
        <div className="max-w-2xl mx-auto ">
            {previewImage ? (
                <div className="w-full mx-auto ">
                    <div className="text-end py-2 ">
                        <button onClick={clearImage} className="p-1 rounded hover:text-red-500">
                            <IoCloseCircleOutline size={30} />
                        </button>
                    </div>
                    <Image
                        src={previewImage}
                        alt={acceptedFiles[0]?.name || "Preview"}
                        className="w-full mx-auto rounded-lg shadow border-green-700 border-2"
                        width={400}
                        height={400}
                    />
                </div>
            ) : (
                <div {...getRootProps({ className: "dropzone" })}>
                    <div className="flex justify-center items-center pb-4">
                        <FaCloudUploadAlt size={48} />
                    </div>
                    <input {...getInputProps()} name="file" />
                    <p>Choose an image or Drag and Drop</p>
                    <small>Image size 8MB (max)</small>
                </div>
            )}

            <input
                type="text"
                placeholder="Report Prompt (Optional)"
                className="px-4 py-2 my-3 rounded w-full border-green-700 border-2"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button
                disabled={false}
                onClick={processReport}
                className="my-4 bg-gradient-to-r from-primary w-full to-indigo-100 border-green-700 border-2 rounded px-4 py-2 hover:from-green-500 hover:to-green-800 hover:text-white"
            >
                Process Report
            </button>
        </div>
    );
};

export default UploadReport;
