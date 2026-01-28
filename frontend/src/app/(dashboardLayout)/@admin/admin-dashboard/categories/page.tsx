import { getCategoriesAction, addCategoryAction, deleteCategoryAction, updateCategoryAction } from "@/actions/admin.action";
import { CategoryList } from "@/components/modules/dashboard/admin/CategoryList";
import { CategoryModal } from "@/components/modules/dashboard/admin/AddCategoryModal";

export default async function CategoriesPage() {
    const { data, error } = await getCategoriesAction();

    const handleAddCategory = async (categoryData: any) => {
        "use server";
        return await addCategoryAction(categoryData);
    };

    const handleDeleteCategory = async (id: string) => {
        "use server";
        return await deleteCategoryAction(id);
    };

    const handleUpdateCategory = async (id: string, categoryData: any) => {
        "use server";
        return await updateCategoryAction(id, categoryData);
    };

    if (error) {
        return (
            <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-3xl">
                <p className="text-destructive font-bold">{error.message}</p>
            </div>
        );
    }

    const categories = data?.data || [];

    return (
        <div className="space-y-8 mx-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase italic">
                        Flavor <span className="text-primary tracking-tighter not-italic">Taxonomy</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Architect and organize the dietary landscape of the platform.
                    </p>
                </div>
                <CategoryModal onAdd={handleAddCategory} />
            </div>

            <CategoryList
                categories={categories}
                onDelete={handleDeleteCategory}
                onUpdate={handleUpdateCategory}
            />
        </div>
    );
}
