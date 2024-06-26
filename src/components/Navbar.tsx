import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Button from "./Button";
import { MoveRight } from "lucide-react";
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'
const Navbar = async () => {

  const {getUser} = getKindeServerSession()

  const user = await getUser()

  console.log(user)

  const isAdmin = user?.email === process.env.ADMIN_EMAIL
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
                <Link href="/api/auth/logout" className="">
                  <Button title={"Logout"} />
                </Link>
                {isAdmin ? (
                  <Link href="/dashboard" className="">
                    <Button title={"Dashboard"} />
                  </Link>
                ) : null}
                <Link
                  href="/configure/upload"
                  className="hidden sm:flex items-center gap-1"
                >
                  <Button title={"Create case"} />
                  <MoveRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/api/auth/register" className="">
                  <Button title={"Sign up"} />
                </Link>

                <Link href="/api/auth/login" className="">
                  <Button title={"Login"} />
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href="/configure/upload"
                  className="hidden lg:block md:block "
                >
                  <button className=" flex gap-1 px-3 py-1 bg-black text-white rounded-sm">
                    Create case <MoveRight />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
