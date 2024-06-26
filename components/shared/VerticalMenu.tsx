"use client";

import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerticalMenu = ({
  menuList,
  pageParam = false,
  paramName,
  color = "default",
}: {
  menuList: { label: string; value?: number }[];
  pageParam?: boolean;
  paramName: string;
  color?: "default" | "inverted";
}) => {
  const searchParams = useSearchParams();
  const current = searchParams.get(paramName) ?? menuList[0].label;

  const [active, setActive] = useState(current);
  const { setLastParams } = useUpdateSearchParams([
    { name: paramName, value: current },
  ]);

  const handleClick = (key: string) => {
    setActive(key);
    setLastParams([
      { name: paramName, value: key },
      { name: "page", value: "1" },
    ]);
  };

  useEffect(() => {
    if (!menuList.find((val) => val.label === current)) {
      setActive(menuList[0].label);
      setLastParams([{ name: paramName, value: menuList[0].label }]);
    }
  }, [menuList, paramName, setLastParams, current]);

  return (
    <ul className="space-y-1">
      {menuList.map((item) => (
        <li key={item.label}>
          <button
            onClick={() => handleClick(item.label)}
            className={
              color === "default"
                ? `group flex items-center justify-between w-full rounded-lg sm:rounded-r-none px-4 py-2 hover:bg-gray-100 ${
                    active === item.label
                      ? "text-foreground bg-gray-100"
                      : "text-gray-500"
                  }`
                : `group flex items-center justify-between w-full rounded-lg sm:rounded-r-none px-4 py-2 hover:bg-background ${
                    active === item.label
                      ? "text-foreground bg-background"
                      : "text-gray-500"
                  }`
            }
          >
            <span className="text-sm font-medium text-start">
              {capitalizeFirstLetter(item.label)}
            </span>
            {item.value && item.value > 0 && (
              <span
                className={`shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700 ${
                  active === item.label && "text-foreground bg-gray-200"
                }`}
              >
                {item.value}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default VerticalMenu;
