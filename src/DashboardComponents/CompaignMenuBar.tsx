import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { FC, useState } from "react";
import styles from "./style/CompaignMenuBar.module.css"; // Import the CSS module

interface ComponentProps {
  onStatusChange: (newStatus: string) => void;
}

const CompaignMenuBar: FC<ComponentProps> = ({ onStatusChange }) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleClick = (status: string) => {
    setActiveTab(status);
    onStatusChange(status);
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => handleClick("all")}
          className={`${styles.menubarTrigger} ${activeTab === "all" ? styles.active : ""}`}
          style={{ backgroundColor: activeTab === "all" ? "#f1f5f9" : "transparent" }}
        >
          All
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => handleClick("active")}
          className={`${styles.menubarTrigger} ${activeTab === "active" ? styles.active : ""}`}
          style={{ backgroundColor: activeTab === "active" ? "#f1f5f9" : "transparent" }}
        >
          Active
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => handleClick("planned")}
          className={`${styles.menubarTrigger} ${activeTab === "planned" ? styles.active : ""}`}
          style={{ backgroundColor: activeTab === "planned" ? "#f1f5f9" : "transparent" }}
        >
          Planned
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => handleClick("paused")}
          className={`${styles.menubarTrigger} ${activeTab === "paused" ? styles.active : ""}`}
          style={{ backgroundColor: activeTab === "paused" ? "#f1f5f9" : "transparent" }}
        >
          Paused
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default CompaignMenuBar;
