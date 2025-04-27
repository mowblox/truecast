import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center gap-3 md:gap-5">
      <div className="w-full h-10 flex items-center rounded-full border border-gray/30 dark:border-white/30 relative overflow-hidden px-5 py-3 text-dark dark:text-white/60">
        <Search className="size-4" />
        <input
          type="text"
          className="absolute inset-0 outline-hidden bg-transparent pl-10 md:pl-14 pr-8"
          placeholder="search for election eg. SRC 2024 election"
        />
      </div>

      {/* <Select>
        <SelectTrigger className=" w-[116px] rounded-full bg-secondary dark:bg-primary text-white py-2.5 border-none outline-hidden">
          <SelectValue placeholder="Private" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </header>
  );
};

export default Header;
