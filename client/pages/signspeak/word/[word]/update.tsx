import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { userUserLoaded, useUser } from "@/hooks/user";
import { getWord, updateSigns } from "@/lib/api-client";
import { serverUrl } from "@/lib/const";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const signSpeakFormFields = [
    { label: "Word", name: "word", type: "text" },
    { label: "Video", name: "videos", type: "file" },
  ];

enum UPLOAD_STATUS {
NOT_STARTED,
STARTED,
DONE,
}

export default function Update() {
    const router = useRouter();
    const [word, setWord] = useState([] as { id: string, word: string, videos: string[], images: string[] }[]);
    const [videoUploadStatus, setVideoUploadStatus] = useState<UPLOAD_STATUS>(UPLOAD_STATUS.NOT_STARTED);
    const [videoUploadProgress, setVideoUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user, _] = useUser();
    const [loaded, __] = userUserLoaded();

    useEffect(() => {
        getWord(router.query.word as string)
            .then(res => {
                console.log(res);
                setWord(res);
            })
            .catch(err => console.log(err))
    }, [router.query.word])

    
  useEffect(() => {
    if (!loaded) return;
    if (!user || user.role != "ADMIN") {
        toast.error("You are not authorized to view this page.");
        router.push("/");
    }
  }, [loaded, user]);

  const uploadFile = async (files:File[]) => {
    setVideoUploadStatus(UPLOAD_STATUS.STARTED);
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append('files', file); // 'files' is the field name expected by the server
    });

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);
            setVideoUploadProgress(percentCompleted);
            console.log("Uploaded: ", percentCompleted);
        }
    });
    return new Promise((resolve, reject) => {
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response.videoUrls);
            } else {
                console.error('Error uploading file');
                toast.error("Unexpected error occured while uploading the video. Try reducing video size" + xhr.statusText);
                reject([]);
            }
            setVideoUploadStatus(UPLOAD_STATUS.DONE);
        }
    };
    xhr.open('POST', `${serverUrl}/file/videos/upload`, true);
    xhr.send(formData);
});
}

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const videos = formData.getAll('videos') as File[];
        let videoUrls = word[0].videos;
        if(videos.length) {
            videoUrls = await uploadFile(formData.getAll('videos') as File[]) as string[];

        }
        const _word = formData.get('word') as string;

        updateSigns({...word[0], word:_word, videos: videoUrls as string[]}).then(response => {
            if (response.error) return toast.error(response.error);
            (e.target as HTMLFormElement).reset();
            toast.success("Word update successfully!");
            setLoading(false);
        })
    } catch (error) {
        console.log(error)
        toast.error("Unexpected error occured while adding the word.");            
    } finally {
        setLoading(false);
    }
}

  return (
    <>
    <Layout>
        <Head>
            <title>SignSpeak - Cerena</title>
        </Head>
        {
            word.length == 0 ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            )
                :
                <div className="p-4">
                <form onSubmit={handleSubmit} className="bg-white px-4 py-12 shadow rounded">  
                {signSpeakFormFields.map((field) => (
                <div key={field.name} className="form-group">
                    {field.type === "file" ? (
                    <input
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        type="file" name={field.name} id={field.name} multiple={true} accept="video/*" required
                    />
                    ) : (
                    <input
                        defaultValue={word[0][field.name as keyof typeof word[0]]}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        type={field.type ? field.type : "text"} placeholder={field.label} name={field.name} id={field.name} required
                    />
                    )}
                </div>
                ))}
                <div className="mt-4">
                <button type="submit" disabled={loading} className="bg-primary px-4 py-2 rounded">
                    {loading ? 'Updating...' : 'Update'}
                </button>
                </div>
                {videoUploadStatus === UPLOAD_STATUS.STARTED && (
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-primary bg-opacity-50 flex justify-center items-center">
                        <p className="text-center font-semibold">Uploading Videos: {videoUploadProgress}%</p>
                    </div>
                )}
                </form>
                </div>
        }
    </Layout>
    </>
  )
}
