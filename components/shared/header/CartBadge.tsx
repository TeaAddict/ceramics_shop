import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const CartBadge = ({ value = 0 }: { value?: number }) => {
  return (
    <Link className="flex relative p-3" href="/cart">
      <IoCartOutline size={40} className="cursor-pointer" />
      {value > 0 && (
        <span className="absolute flex justify-center items-center w-[30px] h-[30px] bg-primary rounded-full bottom-7 left-7 cursor-pointer">
          <p>{value}</p>
        </span>
      )}
    </Link>
  );
};

export default CartBadge;
