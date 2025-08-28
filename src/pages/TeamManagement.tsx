import type { FC } from "react";
import Card from "../components/UI/Card";
import { CircleUserRound, Crown, Eye, Users } from "lucide-react";
import TeamMembers from "../components/TeamMembers";
import TeamActivity from "../components/TeamActivity";
import TeamInvitations from "../components/TeamInvitations";

const TeamManagement: FC = () => {
  return (
    <div>
      <h1 className="text-white text-center lg:text-left text-2xl font-bold">Manage Teams</h1>

      <div className="grid grid-cols-2  lg:grid-cols-4 gap-8 my-8 justify-items-center">
        <Card
          title="Total Members"
          value={12}
          description="Across all roles"
          icon={Users}
          iconColor="gray"
        />
        <Card
          title="Admins"
          value={174}
          description="Users with full access"
          icon={Crown}
          iconColor="gray"
        />
        <Card
          title="Members"
          value={5}
          description="Standard users"
          icon={CircleUserRound}
          iconColor="gray"
        />
        <Card
          title="Viewers"
          value={3}
          description="Read-only access"
          icon={Eye}
          iconColor="gray"
        />
      </div>

      <TeamMembers />
      <div className="flex-col justify-items-center lg:flex-row gap-8 ">
         <TeamActivity />
         <TeamInvitations />
      </div>
      
    </div>
  );
};

export default TeamManagement;
