import React from "react";
import Dashboardlayouts from "../../layouts/Dashboardlayouts";
import Head from "next/head";
import { FaRegClock } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { CiFlag1 } from "react-icons/ci";
import Image, { StaticImageData } from "next/image";
import firstimage from "../../../../assets/02a5180085c6b324772ac97633b265512091f84f.jpg";
import secondimage from "../../../../assets/522925a40f76fec65d5ff32b89732d1fbec66be3.jpg";
import { LuTimer } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa6";
import { FolderPlus, NotebookPen } from "lucide-react";
import { useRouter } from "next/router";

const stats = [
  {
    label: "Courses Created",
    value: 12,
    icon: <FolderPlus className="text-[#2E8B57]" size={25} />,
  },
  {
    label: "Courses Enrolled",
    value: 3,
    icon: <NotebookPen className="text-[#2E8B57]" size={25} />,
  },
  {
    label: "Completed",
    value: 1,
    icon: <CiFlag1 className="text-[#2E8B57]" size={25} />,
  },
  {
    label: "Time Invested",
    value: "84H",
    icon: <LuTimer className="text-[#2E8B57]" size={25} />,
  },
  {
    label: "Average Score",
    value: "84%",
    icon: <FaChartBar className="text-[#2E8B57]" size={25} />,
  },
];

const courses = [
  {
    id: 1,
    title: "Investment Fundamentals",
    author: "Sarah Oluwatosin",
    desc: "Learn the basics of investing, risk management, and portfolio diversification",
    duration: "2 hours",
    lessons: 12,
    rating: 4.6,
    investors: 234,
    img: firstimage,
    action: "Enroll Free",
  },
  {
    id: 2,
    title: "Investment Fundamentals",
    author: "Sarah Oluwatosin",
    desc: "Learn the basics of investing, risk management, and portfolio diversification",
    duration: "2 hours",
    lessons: 12,
    rating: 4.6,
    investors: 234,
    img: secondimage,
    action: "Continue",
  },
];

const LearningHub = () => {
  const router = useRouter();

  const handleNavigate = (title: string) => {
    router.push(`/learninghub/learnvideopage/${title}`); // you can also use course.id here if preferred
  };

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Learning Hub</title>
      </Head>

      <div className="p-6 space-y-8">
        {/* Top Heading */}
        <div>
          <h1 className="text-2xl font-bold">Learning Hub</h1>
          <p className="text-gray-500">
            Expand your investment knowledge with expert-led courses and
            resources
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-between gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[150px] max-w-[200px] bg-[#84C2A229] p-5 rounded-xl text-center shadow-sm flex flex-col items-start"
            >
              <div className="mb-2">{stat.icon}</div>
              <p className="text-xl font-semibold text-[#2E8B57]">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search Learning resource..."
            className="w-full outline-none md:flex-1 px-4 py-2 border border-[#E0E0E0] rounded-lg"
          />
          <select className="px-4 py-2 border border-[#E0E0E0] outline-none rounded-lg font-normal">
            <option>All Resources</option>
            <option>Beginner Guides</option>
            <option>Industry Explainers</option>
            <option>Premium Courses</option>
            <option>Webinars</option>
          </select>
          <select className="px-4 py-2 border border-[#E0E0E0] outline-none rounded-lg font-normal">
            <option>Filter by</option>
            <option>All Time</option>
            <option>This Past Week</option>
            <option>This Past Month</option>
            <option>This Past Year</option>
          </select>
        </div>

        {/* Courses */}
        <div>
          {/* Desktop: grid | Mobile: horizontal scroll */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                handleNavigate={() => handleNavigate(course.title)}
              />
            ))}
          </div>

          <div className="md:hidden flex gap-4 overflow-x-auto snap-x pb-4">
            {courses.map((course) => (
              <div key={course.id} className="snap-start flex-shrink-0 w-80">
                <CourseCard
                  {...course}
                  handleNavigate={() => handleNavigate(course.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

interface CourseCardProps {
  title: string;
  author: string;
  desc: string;
  duration: string;
  lessons: number;
  rating: number;
  investors: number;
  img: StaticImageData;
  action: string;
  handleNavigate: () => void; // ✅ add this
}

const CourseCard = ({
  title,
  author,
  desc,
  duration,
  lessons,
  rating,
  investors,
  img,
  action,
  handleNavigate,
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <Image src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500">by {author}</p>
        <p className="text-sm text-gray-600 mt-2 flex-1">{desc}</p>

        {/* Course Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
          <span className="flex items-center gap-1">
            <FaRegClock /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <MdPlayLesson /> {lessons} lessons
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm mt-2">
          <AiFillStar className="text-yellow-400" />
          <span>{rating}</span>
          <span className="text-gray-500">({investors} investors)</span>
        </div>

        {/* Action */}
        <button
          onClick={handleNavigate}
          className="mt-4 bg-[#0A2540] text-white py-2 rounded-lg font-medium"
        >
          {action}
        </button>
      </div>
    </div>
  );
};

export default LearningHub;
