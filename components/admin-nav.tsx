"use client";
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import {
  UserCircle,
  Package2,
  ArrowUpLeftFromCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useClerk } from "@clerk/nextjs";
import useAdminNav from "@/hooks/useAdminNav";

function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { isOpen, onClose, onOpen } = useAdminNav();
  const [onMobile, setOnMobile] = useState(false);

  function initialSetup() {
    const isMobileWidth = window.innerWidth <= 768;
    setOnMobile(isMobileWidth);
    //if on desktop always show nav
    if (!isMobileWidth) {
      onOpen();
      return;
    }
    //if on mobile and is opened, close the nav
    if (isMobileWidth && isOpen) {
      onClose();
    }
  }

  function isOnMobile() {
    const isMobileWidth = window.innerWidth <= 768;
    setOnMobile(isMobileWidth);

    if (!isMobileWidth) {
      onOpen();
    } else {
      onClose();
    }
  }

  useLayoutEffect(() => {
    initialSetup();
    window.addEventListener("resize", isOnMobile);
    return () => {
      window.removeEventListener("resize", isOnMobile);
    };
  }, []);

  return (
    <>
      {isOpen ? (
        <>
          <div
            onClick={onClose}
            className="fixed top-0 left-0 w-full h-screen z-10 bg-black/5 md:hidden"
          ></div>
          <div className="w-[236px] md:min-w-[220px] md:w-[220px] h-screen bg-stone-50 flex-col p-4 md:pl-0 fixed top-0 left-0 z-20 md:relative flex shadow-lg md:shadow-none">
            <Button
              onClick={() => onClose()}
              className="absolute top-1 right-2 md:hidden p-2"
              variant={"ghost"}
              size="sm"
            >
              <X size={16} />
            </Button>
            <h1 className="mb-4 h-10">Logo</h1>
            <div className="flex flex-col gap-2">
              <NavLink
                onClick={() => onMobile && onClose()}
                href="/profile"
                currentPath={pathname}
              >
                <UserCircle size={32} strokeWidth={1.5} />
                <span>Profile</span>
              </NavLink>
              <NavLink
                onClick={() => onMobile && onClose()}
                href="/products"
                currentPath={pathname}
              >
                <Package2 size={32} strokeWidth={1.5} />
                <span>Products</span>
              </NavLink>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => signOut(() => router.push("/"))}
                size={"sm"}
                className="gap-2"
              >
                <ArrowUpLeftFromCircle size={18} strokeWidth={1.5} />
                <span>Sign out</span>
              </Button>
              <UserButton />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default AdminNav;

function NavLink({
  href,
  currentPath,
  children,
  ...props
}: {
  href: string;
  currentPath: string;
  children: ReactNode;
  [x: string]: any;
}) {
  const isActive = currentPath.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "h-14 w-full rounded-md hover:bg-stone-200 flex items-center px-3 gap-2 cursor-pointer",
        isActive ? "bg-stone-200" : ""
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ToggleButton() {
  const { onClose, onOpen, isOpen } = useAdminNav();
  return (
    <Button
      className="absolute top-0 left-0 md:hidden m-2 w-10 h-10 p-0"
      variant={"ghost"}
      size={"sm"}
      onClick={() => (isOpen ? onClose() : onOpen())}
    >
      <Menu size={22} strokeWidth={1.5} />
    </Button>
  );
}
