import { LogOutIcon, MountainIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header2() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <img src="spider.png" width={48} alt="logo"/>
        <h4 className="sr-only">InfoWeaver</h4>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Link
          href="/create"
          className="text-sm font-medium hover:underline underline-offset-4 text-orange-500"
          prefetch={false}
        >
          Upload
        </Link>
        <Link
          href="/projects"
          className="text-sm font-medium hover:underline underline-offset-4 text-orange-500"
          prefetch={false}
        >
          My Lessons
        </Link>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <LogOutIcon className="w-4 h-4" />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
