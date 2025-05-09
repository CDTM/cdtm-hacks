import { Link } from "react-router-dom";

const Submission = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Submission is not open yet.</h1>
          <p className="text-lg">
            Check the following the{" "}
            <Link
              to="https://hacks.cdtm.com/guidebook"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              guidebook
            </Link>{" "}
            to know what you have to submit on Sunday
          </p>
        </div>
      </div>
    </div>
  );
};

export default Submission; 