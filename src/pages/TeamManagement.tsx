import type { FC } from "react";
import Card from "../components/UI/Card";
import { CircleUserRound, Crown, Eye, Users } from "lucide-react";
import TeamMembers from "../components/TeamMembers";

const TeamManagement: FC = () => {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold">Manage Teams</h1>

      <div className="flex gap-4 mt-8">
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
    </div>
  );
};

export default TeamManagement;
