import type { FC } from "react";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";

const SettingsPage: FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const companyName = localStorage.getItem("companyName");
  const jobTitle = localStorage.getItem("jobTitle");
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("email");

  const {theme} = useTheme();

  return (
    <div>
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <h1 className="text-3xl font-semibold mt-14">Your Profile</h1>

      <div className="flex gap-6">
        <div className={`${theme === "dark" ? "bg-[#2a2834]" : "bg-[#ffffffc4]"} py-4 px-4 mt-4 rounded-[10px] border-transparent w-[375px] h-[420px] shadow-2xl`}>
          <h1 className="font-bold text-2xl">Profile Information</h1>
          <p className="mt-2 font-semibold">
            Update your account's profile information and email address.
          </p>
          <form className="mt-8">
            <div className="flex gap-6 items-center mb-2">
              <div className="flex flex-col gap-2">
                <label>Name</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  className={`${theme === "dark" ? "bg-[#121212] border-[#3E3A45] border-2 border-solid" : "bg-white border-2 border-solid border-[#ccc]"} h-[35px] w-[160px] rounded-[7px] px-4 py-4  `}
                  name=""
                  defaultValue={name ? name : ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="text"
                  required
                  placeholder=""
                 className={`${theme === "dark" ? "bg-[#121212] border-[#3E3A45] border-2 border-solid" : "bg-white border-2 border-solid border-[#ccc]"} h-[35px] w-[160px] rounded-[7px] px-4 py-4  `}
                  name=""
                  defaultValue={email ? email : ""}
                />
              </div>
            </div>

            <div className="flex gap-6 items-center mb-2">
              <div className="flex flex-col gap-2">
                <label>Company Name</label>
                <input
                  type="text"
                  required
                  placeholder=""
                 className={`${theme === "dark" ? "bg-[#121212] border-[#3E3A45] border-2 border-solid" : "bg-white border-2 border-solid border-[#ccc]"} h-[35px] w-[160px] rounded-[7px] px-4 py-4  `}
                  name=""
                  defaultValue={companyName ?? ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Job Title</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  className={`${theme === "dark" ? "bg-[#121212] border-[#3E3A45] border-2 border-solid" : "bg-white border-2 border-solid border-[#ccc]"} h-[35px] w-[160px] rounded-[7px] px-4 py-4  `}
                  name=""
                  defaultValue={jobTitle ? jobTitle : ""}
                />
              </div>
            </div>

            <button className="bg-[#af74d7] text-white px-6 py-2 rounded-[8px] cursor-pointer hover:bg-[#854d8e] mt-6">
              Save Changes
            </button>
          </form>
        </div>

      
        <div className={`${theme === "dark" ? "bg-[#2a2834]" : "bg-[#ffffffc4]"} py-4 px-4 mt-4 rounded-[10px] border-transparent w-[375px] h-[420px] shadow-2xl`}>
          <h1 className="font-bold text-2xl">Profile Picture</h1>
          <p className="mt-2 font-semibold">
            Update your profile picture.
          </p>

          <div className="flex flex-col justify-center items-center gap-4 mt-6">
            <label htmlFor="profileUpload" className="cursor-pointer">
              <div className={`h-[160px] w-[160px] rounded-full  flex justify-center items-center overflow-hidden ${theme === "dark" ? "bg-[#121212] border-2 border-[#3E3A45]" : "bg-white border-2 border-[#ccc]"}`}>
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-[18px]">
                    Click to Upload
                  </span>
                )}
              </div>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <button className={`${theme === "dark" ? "bg-black border-1 border-solid border-[#3E3A45] hover:bg-[#121212]" : "bg-white border-1 border-solid border-[#ccc] hover:bg-gray-200"} px-4 py-2 rounded-[7px]  cursor-pointer`}>
              Upload New Image
            </button>
          </div>
        </div>

          <div className={`${theme === "dark" ? "bg-[#2a2834]" : "bg-[#ffffffc4]"} py-4 px-4 mt-4 rounded-[10px] border-transparent w-[375px] h-[420px] shadow-2xl`}>
          <h1 className="font-bold text-2xl">Theme</h1>
          <p className="mt-2 font-semibold">
            Choose your preferred theme.
          </p>

          <div className="mt-4 flex gap-12 items-center">
            <div>
              <h1 className="font-bold text-2xl">Dark Mode</h1>
              <p className="mt-2 font-semibold">
                Enable dark theme for the application.
              </p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
