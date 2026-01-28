import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, MessageSquare, Award } from "lucide-react";

const members = [
    { name: "Alex", image: "https://i.pravatar.cc/150?u=1", position: "top-[10%] left-[10%]" },
    { name: "Sarah", image: "https://i.pravatar.cc/150?u=2", position: "top-[15%] right-[15%]" },
    { name: "John", image: "https://i.pravatar.cc/150?u=3", position: "bottom-[15%] left-[15%]" },
    { name: "Emily", image: "https://i.pravatar.cc/150?u=4", position: "bottom-[10%] right-[10%]" },
    { name: "Mike", image: "https://i.pravatar.cc/150?u=5", position: "top-[40%] left-[5%]" },
    { name: "Anna", image: "https://i.pravatar.cc/150?u=6", position: "top-[40%] right-[5%]" },
];

const stats = [
    { icon: Users, label: "Community", value: "15k+" },
    { icon: MessageSquare, label: "Daily Stories", value: "2.4k" },
    { icon: Award, label: "Elite Chefs", value: "500+" },
];

const JoinCommunity = () => {
    return (
        <section className="py-24 md:py-48 bg-zinc-950 text-white relative overflow-hidden">
            {/* Immersive Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10 max-w-7xl">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Member Exclusive</span>
                    </div>

                    <h2 className="text-6xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase leading-[0.8] italic">
                        THE LOCAL <br />
                        <span className="text-primary italic">ALLIANCE</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-3xl mb-20 leading-relaxed italic">
                        Step inside a global movement of flavor explorers. FoodHub is where visionary craftsmanship meets your doorstep.
                    </p>

                    {/* Stats Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 w-full max-w-4xl">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 group">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                    <stat.icon className="h-6 w-6 group-hover:text-black" />
                                </div>
                                <div>
                                    <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Floating Avatar Matrix (Desktop) */}
                    <div className="hidden lg:block">
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className={`absolute ${member.position} animate-float transform transition-all duration-1000 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-125 z-0`}
                                style={{ animationDelay: `${index * 0.5}s` }}
                            >
                                <Avatar className="h-24 w-24 border-2 border-white/10 p-1 bg-zinc-900 shadow-2xl">
                                    <AvatarImage src={member.image} className="rounded-full object-cover" />
                                    <AvatarFallback className="bg-zinc-800 text-white font-black">{member.name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                        ))}
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <Button className="h-24 px-16 rounded-[2.5rem] bg-primary text-black font-black text-3xl uppercase italic tracking-tighter hover:bg-white transition-all active:scale-95 relative z-10 shadow-2xl">
                            Join the Movement
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinCommunity;
