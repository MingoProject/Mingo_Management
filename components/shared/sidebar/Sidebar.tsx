"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Image from "next/image";
import Theme from "./Theme";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { getMyProfile } from "@/lib/services/user.service";

const Sidebar = () => {
  const pathname = usePathname();
  const { profile, setProfile, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái dropdown
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const profileData = await getMyProfile(userId);
          if (isMounted) {
            setProfile(profileData.userProfile);
          }
        }
      } catch (err) {
        // setError("Failed to fetch profile");
        console.error(err);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/sign-in");
  };

  return (
    <nav className="background-light700_dark200 fixed z-50 h-screen w-64 border-r border-gray-100 p-6 shadow-md dark:border-none">
      <div className="background-light700_dark200 flex flex-col items-center">
        <Image
          src={profile?.avatar || "/assets/images/capy.jpg"}
          alt="Avatar"
          width={60}
          height={60}
          priority
          className="mb-3 size-20 rounded-full object-cover"
        />
        <div
          className="flex cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <p className="text-dark100_light500 hidden text-center md:block">
            {profile?.firstName} {profile?.lastName}
          </p>
          <Icon
            icon="iconamoon:arrow-down-2"
            width="24"
            height="24"
            className="text-dark100_light500"
          />
        </div>
        {isDropdownOpen && (
          <div className="background-light700_dark200 absolute z-50 ml-32 mt-32 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
            <button
              onClick={handleLogout}
              className="text-dark100_light500 background-light700_dark200 w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-5">
        <Icon
          icon="ion:search-outline"
          className="text-dark100_light500 mr-3 mt-2 text-2xl"
        />
        <Icon
          icon="pepicons-pencil:bell"
          className="text-dark100_light500 mt-2 text-2xl"
        />

        <Theme />
      </div>

      <div className="mt-10">
        <span className="text-sm font-medium text-primary-100">Main menu</span>
      </div>

      <div className="mt-2 hidden sm:block">
        {sidebarLinks.map(({ route, icon, label }) => {
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;

          return (
            <Link
              key={route}
              href={route}
              className={`flex h-12 items-center gap-4 rounded-lg p-4 ${
                isActive ? "primary-gradient text-white" : "text-light-500"
              }`}
            >
              <Icon
                icon={icon}
                className={`ml-2 text-2xl ${
                  isActive ? "primary-gradient text-white" : "text-light-500"
                }`}
              />
              <p
                className={`${
                  isActive ? "primary-gradient text-white" : "text-light-500"
                }`}
              >
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
