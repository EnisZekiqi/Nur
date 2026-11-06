import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type React from "react";
import { useTranslation } from "react-i18next";
const Tasbih = () => {
const dhikrs = ["Subhanallah", "Alhamdulillah", "Allahu Akbar"];

    const [counter,setCounter]=useState(0)
    const [dhikrIndex, setDhikrIndex] = useState(0);
    const { t } = useTranslation("common");
    const dhikr = dhikrs[dhikrIndex];

    useEffect(() => {
        if (counter !== 33) return;

        const timeout = setTimeout(() => {
            setCounter(0);
            setDhikrIndex((index) => (index + 1) % dhikrs.length);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [counter]);

    return ( 
        <section id="digital-tasbih" className="py-20 relative grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center w-full h-full gap-8 px-6">
    {/* Background Ambient Glows */}
    <div className="absolute right-0 h-36 w-36 top-4 rounded-full bg-gold-accent/20 blur-[80px]" />
    <div className="absolute left-0 h-36 w-36 bottom-4 rounded-full bg-gold-accent/20 blur-[80px]" />

    {/* Left Info Column */}
    <div className="flex flex-col items-start justify-center gap-4 max-w-lg">
        <h1 className="text-4xl text-primary-text font-semibold tracking-tight">{t("tasbih.title")}</h1>
        <p className="text-sm text-secondary-text font-normal tracking-tight text-balance text-start">
           {t("tasbih.description")}
        </p>
        <span className="flex flex-wrap items-center gap-2 pt-2">
            <p className={`px-3 py-1.5 rounded-xl transition-colors ${dhikr !== 'Subhanallah' ? 'bg-gold-accent text-background shadow-sm shadow-gold-accent/20' : 'bg-cards text-primary-text'} border border-gold-accent/40 text-xs sm:text-sm font-medium`}>
                Subhanallah 33x
            </p>
            <p className={`px-3 py-1.5 rounded-xl transition-colors ${dhikr !== 'Alhamdulillah' ? 'bg-gold-accent text-background shadow-sm shadow-gold-accent/20' : 'bg-cards text-primary-text'} border border-gold-accent/40 text-xs sm:text-sm font-medium`}>
                Alhamdulillah 33x
            </p>
            <p className={`px-3 py-1.5 rounded-xl transition-colors ${dhikr !== 'Allahu Akbar' ? 'bg-gold-accent text-background shadow-sm shadow-gold-accent/20' : 'bg-cards text-primary-text'} border border-gold-accent/40 text-xs sm:text-sm font-medium`}>
                Allahu Akbar 33x
            </p>
        </span>
    </div>

    {/* Right Stunning Sphere Column */}
    <div className="flex justify-center w-full">
        <motion.div
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setCounter(current => Math.min(current + 1, 33))}
            className="cursor-pointer overflow-hidden relative h-64 w-64 rounded-full bg-cards/40 backdrop-blur-md shadow-[0_0_50px_-12px_rgba(212,175,55,0.15)] border-2 border-gold-accent/60 hover:border-gold-accent transition-all duration-300 sm:h-80 sm:w-80 flex flex-col items-center justify-center group"
        >
            {/* Inner Depth Shadow for 3D Sphere Effect */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,0.15),inset_0_-10px_20px_rgba(212,175,55,0.2)] pointer-events-none z-20" />

            {/* Counter Number Display (Optional enhancement to make it stunning) */}
            <span className="absolute top-8 text-3xl font-bold tracking-wider text-gold-accent opacity-90 pointer-events-none z-30">
                {Math.min(counter, 33)}<span className="text-xs font-normal opacity-60">/33</span>
            </span>

            {/* Instruction Text */}
            <h1 className="relative pointer-events-none z-30 text-center px-6 text-sm sm:text-base text-primary-text font-medium mt-4">
                {t("tasbih.Instruction")} <br />
                <em className="text-gold-accent font-semibold underline underline-offset-4 decoration-gold-accent/50 not-italic text-base sm:text-lg">
                    {dhikr}
                </em>
            </h1>

            {/* Rising Liquid Fill Animation */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-gold-accent via-gold-accent/90 to-gold-accent/80 transition-all duration-300 ease-out z-10 flex items-start justify-center"
                style={{ 
                    height: `${(Math.min(counter, 33) / 33) * 100}%` 
                }}
            >
                {/* Optional wave/glow overlay on top of the liquid fill */}
                <div className="w-full h-2 bg-white/30 blur-[2px]" />
            </div>
        </motion.div>
    </div>
</section>
     );
}
 
export default Tasbih;