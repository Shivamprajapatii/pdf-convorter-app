import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa6";
import axios from 'axios';

function Home() {
    const [selectedFile, setSelectedFile] = useState(null);

    const [convert, setConvert] = useState("");

    const [downloadError, setDownloadError] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setConvert("Please select the file");
            return;
        }

        const formData = new FormData()
        formData.append("file", selectedFile)
        try {
            const response = await axios.post("http://localhost:3000/word_to_pdf", formData, {
                responseType: "blob",
            });
            console.log(response);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log(url);
            const link = document.createElement("a");
            console.log(link);
            link.href = url;
            console.log(url);
            link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setDownloadError();

            setSelectedFile(null);
            setConvert("File Converted Successfully");

        } catch (error) {
            console.log(error);
            if (error.response && error.status == 400) {
                setDownloadError("Error occure", error.response.message);
            } else {
                setConvert("");
            }
        }
    }

    return (
        <>
            <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40'>
                <div className='flex h-screen items-center justify-center'>
                    <div className='border-2 border-dashed border-indigo-400 rounded-lg px-4 py-2 md:px-8 md:py-6 '>
                        <h1 className='text-3xl font-bold text-center mb-4'>Convert WORD to PDF</h1>
                        <p className='text-sm text-center mb-5'>Make DOC and DOCX files easy to read by converting them to PDF.</p>
                        <div className='flex flex-col items-center space-y-4'>
                            <input onChange={handleFileChange} type='file' id="FileInput" className='hidden' accept='.doc, .docx' />
                            <label htmlFor="FileInput" className='w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg
                              shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white '>
                                <FaFileWord className='text text-3xl mr-3 ' />
                                <span className='text-3xl mr-2'>{selectedFile ? selectedFile.name : "Choose File"}</span>
                            </label>
                            <button onClick={handleSubmit} disabled={!selectedFile} className='text-white bg-blue-500 hover:bg-blue-700 duration-300 font-bold px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:pointer-events-none'>Convert file</button>
                            {convert && (<div className='text-green-400 text-center'> {convert}</div>)}
                            {downloadError && (<div className='text-red-400 text-center'> {downloadError}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;