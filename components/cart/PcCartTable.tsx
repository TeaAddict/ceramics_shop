import React from "react";
import { CartItem } from "./MyCartTable";
import { formatToEuroCurrency } from "@/utils/helper";
import Image from "next/image";
import QuantityPicker from "../shared/QuantityPicker";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { removeItem } from "@/redux/features/cartSlice";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

const PcCartTable = ({
  data,
  handleIncrease,
  handleDecrease,
}: {
  data: CartItem[];
  handleIncrease: Function;
  handleDecrease: Function;
}) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "cart");
  const dispatch = useDispatch();

  return (
    <table className="w-full flex flex-col gap-10">
      <thead>
        <tr className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.2fr] justify-start">
          <th className="justify-start flex">{t("product")}</th>
          <th className="justify-start flex">{t("picture")}</th>
          <th className="justify-start flex">{t("unitPrice")}</th>
          <th className="justify-start flex">{t("quantity")}</th>
          <th className="justify-start flex">{t("total")}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_0.2fr] items-center h-full border-t-2"
            key={index}
          >
            <td className="h-full flex items-center capitalize">{row.title}</td>
            <td className="aspect-square max-w-32 my-2 relative">
              <Image
                alt=""
                src={row.picture}
                className="object-cover"
                fill
                sizes="(max-width: 500px) 100px"
              />
            </td>
            <td>{formatToEuroCurrency(row.unitPrice)}</td>
            <td>
              <QuantityPicker
                decreaseFunc={() => handleDecrease(row.id)}
                increaseFunc={() => handleIncrease(row.id)}
                currentQuantity={row.quantity}
              />
            </td>
            <td>{formatToEuroCurrency(row.totalPrice)}</td>
            <td>
              <Button
                variant={"outline"}
                onClick={() => {
                  dispatch(removeItem(row.id));
                }}
              >
                X
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PcCartTable;
