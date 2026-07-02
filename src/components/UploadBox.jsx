import { useDropzone } from "react-dropzone";

function UploadBox({ resume, setResume }) {

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setResume(acceptedFiles[0]);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${
        isDragActive ? "active" : ""
      }`}
    >
      <input {...getInputProps()} />

      {resume ? (
        <>
          <h2>✅ Resume Uploaded</h2>
          <p>{resume.name}</p>
        </>
      ) : isDragActive ? (
        <h2>📥 Drop your Resume here...</h2>
      ) : (
        <>
          <h2>📄 Drag & Drop Resume</h2>
          <p>or Click to Browse</p>
        </>
      )}
    </div>
  );
}

export default UploadBox;