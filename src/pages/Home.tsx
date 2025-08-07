import type { FC } from "react";
import {
  ArrowRight,
  BarChart,
  FileText,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import homeImg from "../assets/home-image-removebg-preview.png";
import logo from "../assets/projectpulselogo.png";
import FeatureCard from "../components/FeatureCard";
import { useTheme } from "../hooks/useTheme";

const featureData = [
  {
    id: 1,
    title: "Intuitive Task Management",
    description:
      "Organize, prioritize, and track tasks with intuitive boards, ensuring nothing falls through the cracks.",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Seamless Team Collaboration",
    description:
      "Facilitate effortless communication, share files, and collaborate in real-time within shared workspaces.",
    icon: Users,
  },
  {
    id: 3,
    title: "Comprehensive Progress Tracking",
    description:
      "Monitor project milestones, visualize team performance, and keep every stakeholder updated on progress.",
    icon: BarChart,
  },
  {
    id: 4,
    title: "Actionable Insights & Reports",
    description:
      "Generate comprehensive reports and gain actionable insights to optimize project delivery and team efficiency.",
    icon: FileText,
  },
];

const Home: FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen">
      <header
        className="w-full flex items-start justify-start cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-40 h-auto" src={logo} alt="" />
      </header>

      <div className="px-4 py-20 pb-8">
        <div className=" flex flex-col justify-center items-center  mb-12">
          <h1 className="text-7xl font-bold text-[#af74d7] mb-8 text-shadow-sm text-shadow-[#af74d7]">
            Your Projects, Simplified.
          </h1>
          <p className="break-words max-w-[600px]  text-center">
            Project Pulse is the intuitive platform designed for developers and
            teams to streamline workflows, track progress, and collaborate
            seamlessly.
          </p>

          <div className="flex itmes-center gap-6 mt-12">
            <button
              className="w-28 h-10 bg-[#af74d7] text-white px-2 py-0.5 rounded-[8px]  cursor-pointer hover:bg-[#944fc5]"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="break-words  w-32 h-10 text-white bg-[#af74d7] px-2 py-0.5 rounded-[8px] cursor-pointer hover:bg-[#944fc5] flex items-center "
              onClick={() => navigate("/signup")}
            >
              Get Started{" "}
              <span>
                {" "}
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center rounded-xl shadow-2xl  p-12 mx-32 ">
          <img
            className="rounded-xl shadow-2xl my-12 w-[80%] max-w-[900px]"
            src={homeImg}
            alt=""
          />
        </div>

        <section className=" mt-26 ml-10">
          <h1 className="text-5xl font-bold  text-center mb-12">
            Key Features for Enhanced Productivity
          </h1>

          <div className="flex gap-8 justify-center">
            {featureData.map((feature) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        <div className="flex justify-center">
          <section
            className={`flex flex-col gap-8 items-center mt-24  p-8 w-[80%] rounded-2xl ${
              theme === "dark"
                ? " bg-[#121212] text-white"
                : "bg-[#dcd9d9] text-black"
            } `}
          >
            <h1 className=" text-3xl font-bold">
              Ready To Transform Your Workflow
            </h1>
            <p className="">
              Join thousands of teams who are boosting their productivity and
              achieving their goals with Kanban Project Manager.
            </p>
            <button className="rounded p-3 bg-[#af74d7] cursor-pointer text-white w-[300px] hover:bg-[#944fc5]">
              Start Your Free Trial Today
            </button>
          </section>
        </div>

        <footer className=" text-center mt-24">
          &copy; 2025 Project Pulse
        </footer>
      </div>
    </div>
  );
};

export default Home;
