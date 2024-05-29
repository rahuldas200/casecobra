import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Button from "./Button";
import { MoveRight } from "lucide-react";

const Navbar = () => {
  const user = 'hh';
  const isAdmin = false;
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full flex items-center border-b-gray-200 bg-white/75 backdrop-blur-md transition-all">
      <MaxWidthWrapper>
        <div className="flex  items-center justify-between ">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className=" text-green-600">cobra</span>
          </Link>
          <div className="h-full flex items-center  space-x-4">
            {user ? (
              <>
                {isAdmin ? (
                  <Link href="/api/auth/dashboard" className="">
                    <Button title={"Dashboard"} />
                  </Link>
                ) : (
                  <Link href="/configure/upload" className="">
                    <Button title={"Create case"} />
                  </Link>
                )}

                <Link href="/api/auth/logout" className="">
                  <Button title={"Logout"} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/api/auth/register" className="">
                  <Button title={"sign up"} />
                </Link>

                <Link href="/api/auth/login">
                  <Button title={"Login"} />
                </Link>
              </>
            )}
            <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

            <Link href="/configure/upload">
              <button className=" flex gap-1 px-3 py-1 bg-black text-white rounded-sm">Create case <MoveRight/></button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
