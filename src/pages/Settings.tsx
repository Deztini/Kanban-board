import type { FC } from "react";
import { useState } from "react";

const SettingsPage: FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <h1 className="text-3xl font-semibold mt-14">Your Profile</h1>

      <div className="flex gap-6">
        <div className="bg-[#2a2834] py-4 px-4 mt-4 rounded-[10px] border-transparent w-[375px] h-[420px] shadow-2xl">
          <h1 className="text-white font-bold text-2xl">Profile Information</h1>
          <p className="text-[#a5a3a3] mt-2 font-semibold">
            Update your account's profile information and email address.
          </p>
          <form className="mt-8">
            <div className="flex gap-6 items-center mb-2">
              <div className="flex flex-col gap-2">
                <label className="text-[#a5a3a3]">Name</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  className="bg-[#121212] h-[35px] w-[160px] rounded-[7px] px-4 py-4 text-white border-[#3E3A45] border-2 border-solid"
                  name=""
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#a5a3a3]">Email</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  className="bg-[#121212] h-[35px] w-[160px] rounded-[7px] px-4 py-4 text-white border-[#3E3A45] border-2 border-solid"
                  name=""
                />
              </div>
            </div>

            <div className="flex gap-6 items-center mb-2">
              <div className="flex flex-col gap-2">
                <label className="text-[#a5a3a3]">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  className="bg-[#121212] h-[35px] w-[160px] rounded-[7px] px-4 py-4 text-white border-[#3E3A45] border-2 border-solid"
                  name=""
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#a5a3a3]">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder=""
                  className="bg-[#121212] h-[35px] w-[160px] rounded-[7px] px-4 py-4 text-white border-[#3E3A45] border-2 border-solid"
                  name=""
                />
              </div>
            </div>

            <button className="bg-[#af74d7] text-white px-6 py-2 rounded-[8px] cursor-pointer hover:bg-[#854d8e] mt-6">
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-[#2a2834] py-4 px-4 mt-4 rounded-[10px] border-transparent w-[375px] h-[420px] shadow-2xl">
          <h1 className="text-white font-bold text-2xl">Profile Picture</h1>
          <p className="text-[#a5a3a3] mt-2 font-semibold">
            Update your profile picture.
          </p>

          <div className="flex flex-col justify-center items-center gap-4 mt-6">
            <label htmlFor="profileUpload" className="cursor-pointer">
              <div className="h-[160px] w-[160px] rounded-full bg-[#121212] border-2 border-[#3E3A45] flex justify-center items-center overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-[18px] text-gray-400">
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

            <button className="bg-black border-1 border-solid border-[#3E3A45] px-4 py-2 rounded-[7px] hover:bg-[#121212] cursor-pointer">
              Upload New Image
            </button>
          </div>
        </div>

        <div className="bg-[#2a2834] py-4 px-4 mt-4 rounded-[10px] border-transparent w-[375px] h-[420px] shadow-2xl">
          <h1 className="text-white font-bold text-2xl">Theme</h1>
          <p className="text-[#a5a3a3] mt-2 font-semibold">
            Choose your preferred theme.
          </p>

          <div className="mt-4">
            <h1 className="text-white font-bold text-2xl">Dark Mode</h1>
            <p className="text-[#a5a3a3] mt-2 font-semibold">
              Enable dark theme for the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
