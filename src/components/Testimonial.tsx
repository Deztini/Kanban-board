import type { FC } from "react";
import user1 from "/assets/user1.jpg";
import user2 from "/assets/user2.jpg";

const Testimonial: FC = () => {
  return (
    <>
      <div className="mt-24 text-center text-4xl">
        <h1 className="text-white">What Our Users Say</h1>

        <div className="mt-16 flex flex-wrap gap-5 ml-16">
          <div className="bg-[#2b2b2b] border-gray-500 rounded-2xl w-[30%] h-[250px] p-3">
            <h1 className="text-xl mb-8 text-white">
              "Kanban Project Manager transformed how our team collaborates. The
              visual workflow is incredibly intuitive and keeps everyone on the
              same page."
            </h1>
            <div className="bg-[#a7a7a7] w-full h-[2px] mt-2 mb-4"></div>
            <div className="flex items-center justify-center">
              <img className="w-8 rounded-full" src={user1} alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-white">Sarah Chen</h1>
                <p className="text-xs text-white">Project Lead at Innovate Solutions</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2b2b2b] border-gray-500 rounded-2xl w-[30%] h-[250px] p-3">
            <h1 className="text-xl mb-8 text-white">
              "The customizable boards allowed us to adapt the tool perfectly to
              our unique development process. Highly recommended for any agile
              team."
            </h1>
            <div className="bg-[#a7a7a7] w-full h-[2px] mt-2 mb-4"></div>
            <div className="flex items-center justify-center">
              <img className="w-8 rounded-full" src={user2} alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-white">Mark Davis</h1>
                <p className="text-xs text-white">Software Engineer at TechGenius</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2b2b2b] border-gray-500 rounded-2xl w-[30%] h-[250px] p-3">
            <h1 className="text-xl mb-8 text-white">
              "Switching between light and dark mode is a small detail, but it
              makes a huge difference for my eyes during long work sessions.
              Great product!"
            </h1>
            <div className="bg-[#a7a7a7] w-full h-[2px] mt-2 mb-4"></div>
            <div className="flex items-center justify-center">
              <img className="w-8 rounded-full" src={user1} alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-white">Emily White</h1>
                <p className="text-xs text-white">UX Designer at CreativeHub</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2b2b2b] border-gray-500 rounded-2xl w-[30%] h-[250px] p-3">
            <h1 className="text-xl mb-8 text-white">
              "The simplicity and power of this tool are unmatched. Our
              productivity has soared since we started using Kanban Project
              Manager."
            </h1>
            <div className="bg-[#a7a7a7] w-full h-[2px] mt-2 mb-4"></div>
            <div className="flex items-center justify-center">
              <img className="w-8 rounded-full" src={user2} alt="" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-white">David Lee</h1>
                <p className="text-xs text-white">Operation Manager at GlobalCorp.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Testimonial;
