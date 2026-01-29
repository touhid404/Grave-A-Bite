import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20 pb-16">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
            </div>

            <div className="container relative z-10 px-4 mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-6 items-center">

                    <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-3 group cursor-default">
                            <div className="w-8 h-[1px] bg-primary group-hover:w-16 transition-all duration-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary/60 italic">Established 2026</span>
                        </div>

                        <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.8] uppercase italic">
                            REDEFINING <br />
                            <span className="relative inline-block">
                                <span className="text-primary italic">LOCAL</span>

                            </span> <br />
                            GASTRONOMY
                        </h1>

                        <div className="grid md:grid-cols-5 gap-8 items-center">
                            <p className="md:col-span-3 text-base md:text-lg text-muted-foreground font-medium leading-relaxed italic border-l-2 border-primary/20 pl-6">
                                GrabABite connects visionary local chefs with a global community of flavor explorers. Join the movement.
                            </p>

                            <div className="md:col-span-2 flex flex-col gap-4">
                                <Button asChild size="lg" className="h-20 px-10 text-2xl font-black rounded-[2rem] bg-primary text-black hover:bg-white transition-all active:scale-95 shadow-[0_20px_50px_-15px_rgba(212,255,51,0.4)] uppercase italic tracking-tighter group">
                                    <Link href="/meals" className="flex items-center gap-3">
                                        Explore
                                        <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-center opacity-40">15,000+ members</p>
                            </div>
                        </div>

                        {/* Social Proof Row */}
                        <div className="flex flex-wrap items-center gap-8 pt-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            {[
                                { icon: Utensils, text: "500+ Chefs" },
                                { icon: Globe, text: "12 Zones" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4 text-primary" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex justify-center">
                        <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3.5rem] overflow-hidden border-[12px] border-background shadow-2xl skew-x-[-1deg] hover:skew-x-0 transition-all duration-1000 group">
                            <Image
                                src="/heroMain.png"
                                alt="Gourmet Experience"
                                fill
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-8 left-8 translate-y-6 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 text-white">
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-1">Featured</p>
                                <p className="text-xl font-black uppercase italic tracking-tighter">Wild Salmon Poke</p>
                            </div>
                        </div>

                        <div className="absolute -bottom-8 -left-12 w-[55%] aspect-square rounded-[2.5rem] overflow-hidden border-8 border-background shadow-2xl z-20 animate-float hidden md:block">
                            <Image
                                src="/hero1.jpg"
                                alt="Burger Plate"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] group cursor-pointer shadow-xl">
                            <div className="text-black font-black text-[8px] uppercase tracking-tighter text-center leading-[1] px-2">
                                Fresh • Local • Elite •
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;

