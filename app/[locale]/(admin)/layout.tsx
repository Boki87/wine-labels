import React, { ReactNode } from "react";
import AdminNav, { ToggleButton } from "@/components/admin-nav";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import useAdminNav from "@/hooks/useAdminNav";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-stone-50 flex h-screen items-center md:p-4">
      <AdminNav />
      <main className="flex-grow bg-white rounded-lg h-full p-4 pt-12 md:pt-4 shadow-lg relative overflow-auto">
        <ToggleButton />
        {children}
      </main>
    </div>
  );
}

export default Layout;
