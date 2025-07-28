import { Plus, SquarePen, Trash } from "lucide-react";
import type { FC } from "react";

const dummyAssignees = [
  {
    name: "Adaobi Nwankwo",
    email: "adaobi.nwankwo@example.com",
    role: "Admin",
  },
  { name: "John Smith", email: "john.smith@example.com", role: "Member" },
  { name: "Emeka Okoye", email: "emeka.okoye@example.com", role: "Member" },
  { name: "Fatima Bello", email: "fatima.bello@example.com", role: "Viewer" },
  { name: "Mark Johnson", email: "mark.johnson@example.com", role: "Admin" },
  { name: "Chidera Umeh", email: "chidera.umeh@example.com", role: "Member" },
  //   { name: "Lucy Daniels", email: "lucy.daniels@example.com", role: "Member" },
  //   { name: "Ayo Balogun", email: "ayo.balogun@example.com", role: "Member" },
  //   { name: "Sophia King", email: "sophia.king@example.com", role: "Viewer" },
  //   { name: "Tunde Adebayo", email: "tunde.adebayo@example.com", role: "Viewer" },
  //   {
  //     name: "Isabella Green",
  //     email: "isabella.green@example.com",
  //     role: "Admin",
  //   },
  //   { name: "Kelechi Obi", email: "kelechi.obi@example.com", role: "Viewer" },
  //   { name: "Daniel White", email: "daniel.white@example.com", role: "Viewer" },
  //   { name: "Ngozi Eze", email: "ngozi.eze@example.com", role: "Member" },
  //   { name: "David Brown", email: "david.brown@example.com", role: "Member" },
  //   { name: "Yetunde Ajayi", email: "yetunde.ajayi@example.com", role: "Member" },
  //   { name: "Paul Harrison", email: "paul.harrison@example.com", role: "Admin" },
  //   { name: "Ifeoma Anya", email: "ifeoma.anya@example.com", role: "Admin" },
  // ];
];

const TeamMembers: FC = () => {
  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[100%] h-auto px-4 py-4 rounded-xl mt-8">
      <div className="flex justify-between">
        <h1 className="text-white text-3xl font-bold">Team Members</h1>
        <div className="flex gap-8 items-center">
          <input
            className="bg-[#374151] px-3 py-2 rounded-[8px] text-[#ccc]"
            type="search"
            placeholder="Search members..."
          />
          <select className="text-white bg-black border-2 border-solid border-[#3E3A45] px-2 py-2 rounded-[8px] active:outline-none focus:outline-none">
            <option>Filter by roles</option>
            <option>Admin</option>
            <option>Viewer</option>
            <option>Members</option>
          </select>
          <button className="flex gap-2 bg-[#af74d7] text-white rounded-[8px] w-[165px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5]">
            <Plus /> Add Members
          </button>
        </div>
      </div>

      <div className="my-6 mx-4 w-[97%] border-2 border-solid border-[#ccc] px-4 py-4 h-[80%] rounded-[8px]">
        <div className="grid grid-cols-4 text-[#ccc] font-semibold">
          <p>Name</p>
          <p>Email</p>
          <p>Role</p>
          <p>Actions</p>
        </div>
        {dummyAssignees.map((assignee, index) => (
          <div
            key={index}
            className="grid grid-cols-4 border-t-1 border-b-1 border-solid border-t-[#3E3A45] border-b-[#3E3A45] py-4  text-white font-semibold"
          >
            <p>{assignee.name}</p>
            <p>{assignee.email}</p>

            <p
              className={
                assignee.role === "Admin"
                  ? "bg-blue-800/25 text-blue-800 rounded-[25px] py-2 px-4 w-25 text-center"
                  : assignee.role === "Member"
                  ? "bg-green-800/25 text-green-800 rounded-[25px] py-3 px-4 w-25 text-center"
                  : "bg-black/35 text-white rounded-[25px] py-3 px-4 w-25 text-center"
              }
            >
              {assignee.role}
            </p>
            <div className="flex gap-16">
              <SquarePen color="gray" />
              <Trash color="red" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
