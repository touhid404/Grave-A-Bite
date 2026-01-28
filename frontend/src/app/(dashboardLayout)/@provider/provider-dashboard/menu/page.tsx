import { getMealsAction, addMealAction, updateMealAction, deleteMealAction } from "@/actions/provider.action";
import { foodService } from "@/services/food.service";
import { MealList } from "@/components/modules/dashboard/provider/MealList";
import { MealModal } from "@/components/modules/dashboard/provider/MealModal";

export default async function MenuPage() {
    const { data: mealsData, error: mealsError } = await getMealsAction();
    const { data: categoriesData, error: categoriesError } = await foodService.getCategories();

    const handleAdd = async (mealData: any) => {
        "use server";
        return await addMealAction(mealData);
    };

    const handleUpdate = async (id: string, mealData: any) => {
        "use server";
        return await updateMealAction(id, mealData);
    };

    const handleDelete = async (id: string) => {
        "use server";
        return await deleteMealAction(id);
    };

    if (mealsError || categoriesError) {
        return (
            <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-3xl">
                <p className="text-destructive font-bold">{mealsError?.message || categoriesError?.message}</p>
            </div>
        );
    }

    const meals = mealsData?.data || [];
    const categories = categoriesData?.data || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase italic">
                        Menu <span className="text-primary tracking-tighter not-italic">Selection</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Curate and manage your culinary portfolio.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50">
                        <div className="px-4 py-2 text-center">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total</p>
                            <p className="text-xl font-black italic tracking-tighter leading-none">{meals.length}</p>
                        </div>
                        <div className="w-px h-8 bg-border/50" />
                        <div className="px-4 py-2 text-center">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active</p>
                            <p className="text-xl font-black italic tracking-tighter leading-none text-green-500">
                                {meals.filter((m: any) => m.isAvailable).length}
                            </p>
                        </div>
                    </div>
                    <MealModal categories={categories} onAdd={handleAdd} />
                </div>
            </div>

            <MealList
                meals={meals}
                categories={categories}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        </div>
    );
}
