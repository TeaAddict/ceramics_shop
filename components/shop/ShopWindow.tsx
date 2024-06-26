"use client";

import { SelectCn } from "@/components/shared/SelectCn";
import VerticalMenu from "@/components/shared/VerticalMenu";
import ShopItems from "@/components/shop/ShopItems";
import { countProperties } from "@/utils/countProperties";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewItemModal } from "../admin/NewItemModal";
import { useItems } from "@/hooks/useItems";
import { useEffect, useState } from "react";
import LoadPage from "../shared/loadSpinner/LoadPage";
import { sortItems } from "@/utils/item/sortItems";
import { GeneralSettings } from "@prisma/client";
import { getUniquePropertyNames } from "@/utils/functions/getUniquePropertyNames";
import CheckBox from "./CheckBox";
import CustomReturnMessage from "../shared/CustomReturnMessage";
import { translateSortOptions } from "@/utils/functions/translate/translateSortOptions";
import { useTranslation } from "@/app/i18n/client";
import MobileFooter from "./MobileFooter";
import { capitalizeFirstLetter } from "@/utils/helper";

const ShopWindow = ({
  searchParams,
  color = "default",
  isAdmin = false,
  settings,
  lng,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
  color?: "default" | "inverted";
  isAdmin?: boolean;
  settings: GeneralSettings;
  lng: string;
}) => {
  const { t } = useTranslation(lng, "shop");
  const translatedOptions = translateSortOptions(t);
  const forUrlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");
  const adminPageAuth = isAdmin && isAdminPage;
  const { data, isLoading } = useItems();
  const items = data ?? [];

  const [hideSoldOut, setHideSoldOut] = useState(
    forUrlSearchParams.get("hideSold") === "true" ?? false
  );

  const uniqueCategories: string[] = getUniquePropertyNames(items, "category");
  const category = forUrlSearchParams.get("category") ?? uniqueCategories[0];

  const inStockItems = items.filter((item) => {
    if (hideSoldOut && item.stock > 0) {
      return item;
    } else if (!hideSoldOut) {
      return item;
    }
  });

  const categoryItems = inStockItems.filter(
    (item) => item.category === category
  );
  const categoriesCounts = countProperties(inStockItems, "category");

  const sortBy = searchParams["sortBy"] ?? "date-desc";
  const sorted = sortItems(categoryItems, sortBy);

  function handleChange(value: string) {
    const res = new URLSearchParams(forUrlSearchParams);
    res.set("sortBy", value);
    router.push(`${pathname}?${res.toString()}`);
  }

  useEffect(() => {
    if (category === "undefined") {
      const params = new URLSearchParams(searchParams);
      params.set("category", uniqueCategories?.[0]);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [uniqueCategories, category, pathname, router, searchParams]);

  if (isLoading || (!category && data?.length))
    return <LoadPage minHeight={true} />;
  if (!items || (items?.length === 0 && !adminPageAuth))
    return <CustomReturnMessage text={t("shopClosed")} />;
  if (!items || (items?.length === 0 && adminPageAuth))
    return (
      <CustomReturnMessage text={t("shopClosed")} backButton={false}>
        <NewItemModal />
      </CustomReturnMessage>
    );

  return (
    <div className="sm:p-1">
      <div className="sm:flex justify-end items-center gap-5 mb-5 hidden">
        <CheckBox
          initialState={hideSoldOut}
          setState={setHideSoldOut}
          paramName="hideSold"
          label={t("hideSoldOut")}
        />
        <SelectCn
          onChange={handleChange}
          selectLabel={t("select.sortBy")}
          selectOptions={translatedOptions}
          initialSelection={sortBy}
          color={color}
        />
      </div>
      {adminPageAuth && (
        <div className="flex justify-center pb-5 sm:hidden">
          <NewItemModal />
        </div>
      )}

      <div className="flex flex-col sm:flex-row">
        <div className="space-y-10 w-52 hidden sm:block">
          <h3 className="font-semibold">{t("categories")}</h3>
          <VerticalMenu
            pageParam={true}
            menuList={categoriesCounts}
            color={color}
            paramName="category"
          />
          {adminPageAuth && (
            <div className="justify-center flex">
              <NewItemModal />
            </div>
          )}
        </div>
        <h3 className="sm:hidden mb-2">{capitalizeFirstLetter(category)}</h3>
        <ShopItems
          data={sorted}
          color={color}
          isAdmin={adminPageAuth}
          settings={settings}
        />
      </div>
      <div className="sm:hidden">
        <MobileFooter
          categories={categoriesCounts}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default ShopWindow;
