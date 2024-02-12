import MobileFooter from "@/components/shop/MobileFooter";
import ShopWindow from "@/components/shop/ShopWindow";
import { useItems } from "@/hooks/useItems";
import { getCategories } from "@/app/api/_functions/getCategories";
import { sortOptions } from "@/constants";

const ShopPage = async ({
  color = "default",
  searchParams,
}: {
  color?: "default" | "inverted";
  searchParams: { category: string; sortBy: string };
}) => {
  const categories = await getCategories();

  return (
    <section className="padding-container">
      <ShopWindow color={color} searchParams={searchParams} />
      <div className="sm:hidden">
        <MobileFooter categories={categories} searchParams={searchParams} />
      </div>
    </section>
  );
};

export default ShopPage;
