import type { FC } from "react";
// import logo from "/assets/logo.jpg";
import { ArrowRight } from "lucide-react";
import Testimonial from "../components/Testimonial";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black px-4 pb-8">
      {/* <nav className="flex justify-between  mr-8">
        <div className="flex items-center">
          <img className="w-16 h-12 bg-black" src={logo} alt="" />
          <h1 className="text-2xl font-bold text-white">Kanban Project Manager</h1>
        </div> */}

      {/* <div className="flex itmes-center gap-3">
          <button className="w-28 h-10 bg-[#af74d7] px-2 py-0.5 rounded text-white cursor-pointer hover:bg-[#9666b7]">
            Login
          </button>
          <button className="break-words max-w-[200px] w-28 h-10 bg-[#af74d7] px-2 py-0.5 rounded text-white cursor-pointer hover:bg-[#9666b7]">
            Get Started
          </button>
        </div> */}
      {/* </nav> */}

      <div className='bg-[url("/assets/background.jpg")] bg-cover bg-center h-[600px] brightness-55 flex flex-col justify-center items-center mt-0.1 '>
        <h1 className="text-7xl font-bold text-white mb-8">
          Organize Your Work Visually
        </h1>
        <p className="break-words max-w-[800px]">
          Kanban Project Manager is designed to help teams streamline workflows,
          track progress, and collaborate seamlessly with intuitive visual
          boards.
        </p>

        <div className="flex itmes-center gap-6 mt-12">
          <button
            className="w-28 h-10 bg-[#af74d7] px-2 py-0.5 rounded text-white cursor-pointer hover:bg-[#944fc5]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="break-words  w-32 h-10 bg-[#af74d7] px-2 py-0.5 rounded text-white cursor-pointer hover:bg-[#944fc5] flex items-center "
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

      <section className="text-white mt-12 ml-10">
        <h1 className="text-3xl font-bold">
          Why Choose Kanban Project Manager?
        </h1>
        <p className="ml-8 text-gray-500 break-words max-w-200 mt-5">
          We combine powerful features with an intuitive design to offer a
          solution that truly enhances your team's efficiency and collaboration.
          From small teams to large enterprises, our platform scales with your
          needs.
        </p>

        <div className="mt-12">
          <div className="ml-8 mb-6">
            <h1>•Boost Productivity</h1>
            <p className=" text-gray-400">
              Streamline your tasks and visualize progress to achieve more in
              less time.
            </p>
          </div>

          <div className="mb-6">
            <h1 className="ml-8">•Clear Goal Tracking</h1>
            <p className=" text-gray-400 ml-8">
              Keep every team member aligned with transparent and shared
              objectives.
            </p>
          </div>

          <div className="mb-6">
            <h1 className="ml-8">•Enhanced Collaboration</h1>
            <p className=" text-gray-400 ml-8">
              Facilitate seamless communication and teamwork with shared boards.
            </p>
          </div>

          <div>
            <h1 className="ml-8">•Automate Workflows</h1>
            <p className=" text-gray-400 ml-8">
              Set up rules to automate repetitive tasks and save valuable time.
            </p>
          </div>
        </div>
      </section>

      <Testimonial />

      <div className="flex justify-center">
        <section className="flex flex-col gap-8 items-center mt-24 bg-[#121212] p-8 w-[80%] rounded-2xl">
          <h1 className="text-white text-3xl font-bold">
            Ready To Transform Your Workflow
          </h1>
          <p className="text-[#ccc]">
            Join thousands of teams who are boosting their productivity and
            achieving their goals with Kanban Project Manager.
          </p>
          <button className="rounded p-3 bg-[#af74d7] cursor-pointer text-white w-[300px] hover:bg-[#944fc5]">
            Start Your Free Trial Today
          </button>
        </section>
      </div>

      <footer className="text-white text-center mt-24">
        &copy; 2025 Kanban Project Manager
      </footer>
    </div>
  );
};

export default Home;
