function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <div className="job-box">
      <textarea
        className="job-input"
        placeholder="Paste Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      ></textarea>
    </div>
  );
}

export default JobDescription;