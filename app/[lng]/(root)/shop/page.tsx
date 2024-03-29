import ShopWindow from "@/components/shop/ShopWindow";
import { isAdminRole } from "@/utils/server/isAdminRole";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";
import { useTranslation } from "@/app/i18n";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";

const ShopPage = async ({
  searchParams,
  params: { lng },
}: {
  searchParams: { category: string; sortBy: string; tab: string; page: string };
  params: { lng: string };
}) => {
  const settings = await getGeneralSettings();
  const isAdmin = await isAdminRole();
  const { t } = await useTranslation(lng, "shop");

  if (!settings) return <CustomReturnMessage text="Configure shop settings" />;
  return (
    <section className="padding-container flex-col">
      <h1>{t("title")}</h1>
      <ShopWindow
        color="default"
        searchParams={searchParams}
        isAdmin={isAdmin}
        settings={settings}
        lng={lng}
      />
    </section>
  );
};

export default ShopPage;
