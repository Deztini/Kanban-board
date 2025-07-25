import type { FC } from "react";
import { useState } from "react";
import Card from "../components/UI/Card";
import { ClipboardList } from "lucide-react";
import { Activity } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Archive } from "lucide-react";
import Tabs from "../components/Tabs";

const ProjectsPage: FC = () => {
  const [selectedType, setSelectedType] = useState("All");
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mt-4">Your Projects</h1>

      <div className="flex gap-4 mt-8">
        <Card
          title="All Projects"
          value={10}
          description="Total projects managed"
          icon={ClipboardList}
          iconColor="yellow"
        />
        <Card
          title="Active Projects"
          value={7}
          description="Currently in  progress"
          icon={Activity}
          iconColor="yellow"
        />
        <Card
          title="Projects Completed"
          value={2}
          description="Successfully delivered"
          icon={ListChecks}
          iconColor="yellow"
        />
        <Card
          title="Archived Projects"
          value={2}
          description="Historical records"
          icon={Archive}
          iconColor="yellow"
        />
      </div>

      <div className="flex gap-2 mt-12">
        <Tabs
          tabName="All"
          selectedType={selectedType}
          onSelect={() => setSelectedType("All")}
        />
        <Tabs
          tabName="Active"
          selectedType={selectedType}
          onSelect={() => setSelectedType("Active")}
        />
        <Tabs
          tabName="Completed"
          selectedType={selectedType}
          onSelect={() => setSelectedType("Completed")}
        />
        <Tabs
          tabName="On Hold"
          selectedType={selectedType}
          onSelect={() => setSelectedType("On Hold")}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
