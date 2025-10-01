import { useRouter } from "next/router";
import React from "react";

const LearnVideoPage = () => {
  const router = useRouter();
  const { id } = router.query; // e.g. course id/title

  return (
    <div className="p-6 space-y-6">
      {/* Reuse Heading */}
      <div>
        <h1 className="text-2xl font-bold">Learning Hub</h1>
        <p className="text-gray-500">
          Expand your investment knowledge with expert-led courses and resources
        </p>
      </div>

      {/* Dynamic course video/lessons */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Now learning: {id}</h2>
        <p>Video player and lessons go here...</p>
      </div>
    </div>
  );
};

export default LearnVideoPage;
