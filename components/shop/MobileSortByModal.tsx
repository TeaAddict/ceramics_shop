import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import LabelButton from "../shared/LabelButton";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { sortOptions } from "@/constants";

export function MobileSortByModal() {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeSort = searchParams.get("sortBy");

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <FaSortAlphaUpAlt className="text-foreground" size={25} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sort by</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 divide-y-2">
          {sortOptions.map((option) => {
            return (
              <LabelButton
                key={option.value}
                onClick={() => handleClick(option.value)}
                isActive={activeSort === option.value}
              >
                {option.name}
              </LabelButton>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
