import type { FC } from "react";
import { Mail } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
const DUMMY_DATA = [
  {
    email: "chris.t@example.com",
    invitation: "Invited by Diana Prince on 2024-07-28",
  },
  {
    email: "sara.w@example.com",
    invitation: "Invited by Alice Smith on 2024-07-26",
  },
];

const TeamInvitations: FC = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#141217] border-[#3E3A45] border-2 border-solid"
          : "bg-white border-2 border-solid border-[#Ccc]"
      } shadow-2xl w-[580px] h-auto px-4 py-4 rounded-xl mt-12`}
    >
      <h1 className="font-bold text-2xl">Pending Invitations</h1>
      <p className="font-semibold text-[16px] mt-2">
        Invitations awaiting acceptance.
      </p>
      <div className="my-4 border-1 border-solid border-[#3E3A45]"></div>

      {DUMMY_DATA.map((item) => (
        <div className="my-6 flex justify-between">
          <div className="flex items-center gap-3">
            <Mail color="gray" />
            <div>
              <span className=" text-xl">{item.email}</span>
              <div className="text-[14px]">{item.invitation}</div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <button className="bg-black border-1 border-solid border-[#3E3A45] rounded-[8px] px-3 py-2 text-white cursor-pointer hover:bg-[#121212]">
              Resend
            </button>
            <button className="bg-[#af74d7] rounded-[8px] px-3 py-2 text-white cursor-pointer hover:bg-[#ba7ee2]">
              Revoke
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamInvitations;
