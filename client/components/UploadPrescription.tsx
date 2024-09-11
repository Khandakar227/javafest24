import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose, IoCloseCircleOutline} from "react-icons/io5";
import toast from 'react-hot-toast';
import { serverUrl } from "@/lib/const";

type PrescriptionData = {
    medicine: string;
    details: { medicineName: string, dosage: string, duration: string }[];
    giveMedicineFeedback: string;
    doctorFeedback: string;
};

type UploadPrescriptionProps = {
    setPrescriptionData: (data: PrescriptionData | null) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
};

const UploadPrescription = ({ setPrescriptionData, setError, setLoading }: UploadPrescriptionProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [doctorName, setDoctorName] = useState("");
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
        setPrescriptionData(null);
    }

    async function processPrescription() {
        if (!acceptedFiles.length) return toast.error("Please upload an image of the prescription");

        setLoading(true);
        setError("");
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        formData.append("doctorName", doctorName);

        fetch(serverUrl + "/process-prescription", {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                const data: PrescriptionData = await res.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setPrescriptionData(data);
                }
            })
            .catch(() => setError("Failed to process the prescription"))
            .finally(() => setLoading(false));
    }

    return (
        <div className="max-w-2xl mx-auto ">
            {previewImage ? (
                <div className="w-full mx-auto ">
                    <div className="text-end py-2 ">
                        <button onClick={clearImage} className="p-1 rounded bg-primary hover:bg-red-500">
                            <IoCloseCircleOutline size={30} />
                        </button>
                    </div>

                    <Image src={previewImage} alt={acceptedFiles[0]?.name || "Preview"} className="w-full mx-auto rounded-lg shadow border border-green-700 border-2"  width={400} height={400} />
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
                placeholder="Doctor's Name (Optional)"
                className="border px-4 py-2 my-3 rounded w-full border border-green-700 border-2"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
            />

            <button disabled={false} onClick={processPrescription} className="my-4 bg-gradient-to-r from-green-400 to-indigo-100 border border-green-700 border-2 rounded px-4 py-2 hover:from-green-500 hover:to-green-800 hover:text-white">
                Process Prescription
            </button>
        </div>
    );
};

export default UploadPrescription;
