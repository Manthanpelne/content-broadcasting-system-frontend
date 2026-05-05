import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  CheckSquare, 
  List
} from "lucide-react";

export const MENU_ITEMS = {
  TEACHER: [
    { label: "Dashboard", href: "/teacher", icon: LayoutDashboard },
    { label: "Upload Content", href: "/teacher/upload", icon: Upload },
    { label: "My Content", href: "/teacher/content", icon: FileText },
  ],
  PRINCIPAL: [
    { label: "Dashboard", href: "/principal", icon: LayoutDashboard },
    { label: "Pending Approval", href: "/principal/pending", icon: CheckSquare },
    { label: "All Content", href: "/principal/all", icon: List },
  ],
};