import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import NewsletterFooter from "@/components/modules/homepage/NewsletterFooter";
import FoodCard from "@/components/modules/homepage/foodCard";
import { foodService } from "@/services/food.service";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Meal } from "@/types";

export default async function Home() {
  const mealsPromise = foodService.getMeals({ limit: "6" });
  const providersPromise = foodService.getProviders({ limit: "3" } as any);

  const [meals, providers] = await Promise.all([
    mealsPromise,
    providersPromise,
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      <section className=" bg-transparent relative overflow-hidden">

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Live Selection</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic">
                TRENDING <br />
                <span className="text-primary italic">RIGHT NOW</span>
              </h2>
              <p className="text-muted-foreground text-xl font-medium max-w-lg italic border-l-2 border-primary/20 pl-8 hidden md:block">
                Architecting the future of local flavor. Discover the most visionary dishes from our elite provider network.
              </p>
            </div>
            <div className="relative group">
              <Button asChild variant="link" className="h-auto p-0 font-black text-3xl transition-all active:scale-95 text-foreground hover:text-primary no-underline hover:no-underline uppercase italic tracking-tighter relative z-10 group/link">
                <Link href="/meals" className="flex items-center gap-6">
                  Explore more
                  <ArrowRight className="h-8 w-8 transition-transform group-hover/link:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>

          {meals?.error?.message ? (
            <div className="p-12 text-center bg-destructive/10 border-2 border-dashed border-destructive/20 rounded-3xl">
              <p className="text-destructive font-bold text-lg">{meals?.error?.message}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
              {meals?.data?.data?.map((meal: Meal, index: number) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FoodCard meal={meal} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <HowItWorks />
      {/* <JoinCommunity/> */}


      <NewsletterFooter />
    </main>
  );
}