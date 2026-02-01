import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Link from "next/link";

const NewsletterFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-white py-12 relative overflow-hidden border-t border-white/5">
            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    {/* Brand & Essential Links */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <Link href="/" className="text-2xl font-black italic tracking-tighter hover:text-primary transition-colors">
                            GRABABITE
                        </Link>

                        <nav>
                            <ul className="flex flex-wrap justify-center gap-8">
                                {["Meals", "Providers"].map((link) => (
                                    <li key={link}>
                                        <Link href={`/${link.toLowerCase().replace(/ /g, "-")}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Social & Legal */}
                    <div className="flex items-center gap-12">
                        <div className="flex gap-6">
                            {[
                                { Icon: Facebook, href: "https://facebook.com/touhid404" },
                                { Icon: Linkedin, href: "https://linkedin.com/in/touhid404" },
                                { Icon: Github, href: "https://github.com/touhid404" },
                            ].map(({ Icon, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-primary transition-colors"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                        <Link href="/terms" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                            Legal
                        </Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-700 font-black uppercase tracking-[0.2em] text-[8px]">
                    <p>&copy; {currentYear} GRABABITE. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-2 opacity-40">
                        <div className="w-8 h-px bg-zinc-800" />
                        <span className="italic">FLAVOR ARCHITECTURE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default NewsletterFooter;
