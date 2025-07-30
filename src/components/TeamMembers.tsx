import {
  ChevronLeft,
  ChevronRight,
  Plus,
  SquarePen,
  Trash,
} from "lucide-react";
import type { FC } from "react";
import { useState } from "react";
import Modal from "./UI/Modal";

const MEMBERS_PER_PAGE = 6;

const dummyAssignees = [
  {
    id: 1,
    name: "Adaobi Nwankwo",
    email: "adaobi.nwankwo@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Member",
  },
  {
    id: 3,
    name: "Emeka Okoye",
    email: "emeka.okoye@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Fatima Bello",
    email: "fatima.bello@example.com",
    role: "Viewer",
  },
  {
    id: 5,
    name: "Mark Johnson",
    email: "mark.johnson@example.com",
    role: "Admin",
  },
  {
    id: 6,
    name: "Chidera Umeh",
    email: "chidera.umeh@example.com",
    role: "Member",
  },
  {
    id: 7,
    name: "Lucy Daniels",
    email: "lucy.daniels@example.com",
    role: "Member",
  },
  {
    id: 8,
    name: "Ayo Balogun",
    email: "ayo.balogun@example.com",
    role: "Member",
  },
  {
    id: 9,
    name: "Sophia King",
    email: "sophia.king@example.com",
    role: "Viewer",
  },
  {
    id: 10,
    name: "Tunde Adebayo",
    email: "tunde.adebayo@example.com",
    role: "Viewer",
  },
  {
    id: 11,
    name: "Isabella Green",
    email: "isabella.green@example.com",
    role: "Admin",
  },
  {
    id: 12,
    name: "Kelechi Obi",
    email: "kelechi.obi@example.com",
    role: "Viewer",
  },
  {
    id: 13,
    name: "Daniel White",
    email: "daniel.white@example.com",
    role: "Viewer",
  },
  { id: 14, name: "Ngozi Eze", email: "ngozi.eze@example.com", role: "Member" },
  {
    id: 15,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Member",
  },
  {
    id: 16,
    name: "Yetunde Ajayi",
    email: "yetunde.ajayi@example.com",
    role: "Member",
  },
  {
    id: 17,
    name: "Paul Harrison",
    email: "paul.harrison@example.com",
    role: "Admin",
  },
  {
    id: 18,
    name: "Ifeoma Anya",
    email: "ifeoma.anya@example.com",
    role: "Admin",
  },
  // ];
];

const TeamMembers: FC = () => {
  const [teamMembers, setTeamMembers] = useState(dummyAssignees);
  const [roles, setRoles] = useState("Filter by roles");
  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<
    (typeof dummyAssignees)[0] | null
  >(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<
    (typeof dummyAssignees)[0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);

  const openModalHandler = () => {
    setModalOpen(true);
    setEdit(false);
    setCurrentMember(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEdit(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    if (edit && currentMember) {
      const updatedMembers = teamMembers.map((member) =>
        member.id === currentMember.id
          ? { ...member, name, email, role }
          : member
      );
      setTeamMembers(updatedMembers);
    } else {
      const newMember = {
        id: Math.random(),
        name,
        email,
        role,
      };

      setTeamMembers((prevMembers) => [...prevMembers, newMember]);
    }

    setModalOpen(false);
    setEdit(false);
    setCurrentMember(null);
  };

  const filterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoles(e.target.value);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const editHandler = (member: (typeof dummyAssignees)[0]) => {
    setModalOpen(true);
    setEdit(true);
    setCurrentMember(member);
  };

  const deleteHandler = () => {
    if (memberToDelete) {
      setTeamMembers((prev) =>
        prev.filter((member) => member.id !== memberToDelete.id)
      );
      setDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setMemberToDelete(null);
  };

  const filteredAssignees = teamMembers.filter((assignee) => {
    const matchedRoles = roles === "Filter by roles" || assignee.role === roles;

    const matchedSearchTerm =
      assignee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignee.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchedRoles && matchedSearchTerm;
  });

  const totalPages = Math.ceil(filteredAssignees.length / MEMBERS_PER_PAGE);
  const startIndex = (currentPage - 1) * MEMBERS_PER_PAGE;
  const currentMembers = filteredAssignees.slice(
    startIndex,
    startIndex + MEMBERS_PER_PAGE
  );

  const nextPageHandler = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const previousPageHandler = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-[#141217] border-[#3E3A45] border-2 border-solid shadow-2xl w-[100%] h-auto px-4 py-4 rounded-xl mt-8">
      <div className="flex justify-between">
        <h1 className="text-white text-3xl font-bold">Team Members</h1>
        <div className="flex gap-8 items-center">
          <input
            className={`bg-[#374151] px-3 py-2 rounded-[8px] text-[#ccc] focus:outline-none border-2 ${
              searchTerm.trim() ? "border-[#8b5cf6]" : "border-transparent"
            } `}
            type="search"
            placeholder="Search members..."
            onChange={searchHandler}
            value={searchTerm}
          />
          <select
            className="text-white bg-black border-2 border-solid border-[#3E3A45] px-2 py-2 rounded-[8px] active:outline-none focus:outline-none focus:border-[#8b5cf6]"
            onChange={filterHandler}
            value={roles}
          >
            <option>Filter by roles</option>
            <option>Admin</option>
            <option>Viewer</option>
            <option>Member</option>
          </select>
          <button
            className="flex gap-2 bg-[#af74d7] text-white rounded-[8px] w-[165px] h-[40px] py-2 px-4 cursor-pointer hover:bg-[#c885f5]"
            onClick={openModalHandler}
          >
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
        {currentMembers.map((assignee, index) => (
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
            <div className="flex gap-16 items-center">
              <button
                onClick={() => editHandler(assignee)}
                className="cursor-pointer"
              >
                <SquarePen color="gray" />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setMemberToDelete(assignee);
                  setDeleteModal(true);
                }}
              >
                <Trash color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 items-center justify-center">
        <button
          onClick={previousPageHandler}
          disabled={currentPage === 1}
          className={`text-white flex items-center hover:text-[#d3a7f1] ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <ChevronLeft />
          <span>Previous</span>
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPageHandler}
          disabled={currentPage === totalPages}
          className={`text-white flex items-center hover:text-[#d3a7f1] ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span>Next</span>
          <ChevronRight />
        </button>
      </div>

      <Modal
        title={edit ? "Edit Team Member" : "Add New Team Members"}
        subtitle={
          edit
            ? "Update the details below to modify a team member."
            : "Fill in the details below to create a new member."
        }
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        width="w-[380px]"
        height="h-[480px]"
      >
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div className="flex flex-col gap-2">
            <label className="text-white">Name</label>
            <input
              type="text"
              required
              placeholder="Mike Sam"
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="name"
              defaultValue={edit && currentMember ? currentMember.name : ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Email</label>
            <input
              type="email"
              required
              placeholder="mikesam@gmail.com"
              className="bg-black h-[35px] rounded px-4 py-4 text-white"
              name="email"
              defaultValue={edit && currentMember ? currentMember.email : ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white">Role</label>
            <select
              className="bg-black h-[40px] text-white px-4 py-2"
              defaultValue={edit && currentMember ? currentMember.role : ""}
              name="role"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <div className="flex justify-end gap-12 mt-2">
            <button
              onClick={handleCloseModal}
              className="text-white cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-[#af74d7] text-white rounded-xl w-auto h-auto py-2 px-4 cursor-pointer hover:bg-[#c885f5]">
              {edit ? "Update Member" : "Create Member"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Delete Team Member"
        subtitle="This action cannot be undone. Are you sure you want to remove this member from the team?"
        width="w-[380px]"
        height="h-auto"
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={cancelDelete}
            className="text-white px-4 py-2 rounded hover:bg-[#333] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TeamMembers;
