"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CheckBox } from "../shared/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HideSoldOutCheckBox = ({
  setHideSoldOut,
  label,
}: {
  setHideSoldOut: Dispatch<SetStateAction<boolean>>;
  label: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(checked: boolean | "indeterminate") {
    setHideSoldOut((hideSoldOut) =>
      checked === "indeterminate" ? hideSoldOut : checked
    );

    const params = new URLSearchParams(searchParams);
    params.set("hideSold", String(checked));
    router.replace(`${pathname}?${params}`);
  }

  return (
    <div>
      <CheckBox handler={handleChange}>{label}</CheckBox>
    </div>
  );
};

export default HideSoldOutCheckBox;
