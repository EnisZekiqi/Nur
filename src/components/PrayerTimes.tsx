import { useQuery } from "@tanstack/react-query";
import { Sunrise, Moon, Sun, Cloud, Sunset, MoonStar } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from 'react-i18next';

const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;


const prayerIcons: Record<string, ReactNode> = {
    Fajr: <Moon/>,
    Sunrise:<Sunrise />,
    Dhuhr: <Sun />,
    Asr: <Cloud />,
    Maghrib: <Sunset />,
    Isha: <MoonStar />,
};



const getMinutesFromTime = (value: string) => {
    const [hours, minutes] = value.slice(0, 5).split(":").map(Number);
    return hours * 60 + minutes;
};

const formatCountdown = (milliseconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
};

const PrayerTimes = () => {
     const { t } = useTranslation("common");
     const prayerTranslate :Record<string, string> = {
    Fajr: t("prayer.times.fajr"),
    Sunrise:t("prayer.times.sunrise"),
    Dhuhr: t("prayer.times.dhuhr"),
    Asr: t("prayer.times.asr"),
    Maghrib: t("prayer.times.maghrib"),
    Isha: t("prayer.times.isha"),
};
const prayerLabels: Record<(typeof prayerOrder)[number], string> = {
    Fajr: t("prayer.times.fajr"),
    Dhuhr: t("prayer.times.dhuhr"),
    Asr: t("prayer.times.asr"),
    Maghrib: t("prayer.times.maghrib"),
    Isha: t("prayer.times.isha"),
};


    const {data,isLoading,error}=useQuery({
        queryKey:['prayers'],
        queryFn:async()=>{
            const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Vushtrri&country=Kosovo&method=13`)
            return res.json()
        },
        
    })

    const [time,setTime]=useState(new Date())

    useEffect(() => {
    const updateTime = () => {
        setTime(new Date());
    };

    updateTime();

    const timer = window.setInterval(updateTime, 1000);

    return () => {
        window.clearInterval(timer);
    };
    }, []);
    
    const date = data?.data?.date;
    const prayers = data?.data?.timings as Record<string, string> | undefined;
    const gatherData = Object.entries(prayers ?? {}).map(([key, value]) => ({ key, value }))
   
    const gatherPrayers = prayerOrder.flatMap((key) => {
        const value = prayers?.[key];
        return value ? [{ key, value }] : [];
    });
    

    const currentMinutes = time.getHours() * 60 + time.getMinutes();
    const upcomingPrayer = gatherPrayers.find(
        (prayer) => getMinutesFromTime(prayer.value) > currentMinutes
    ) ?? gatherPrayers[0];

    const nextPrayerDate = upcomingPrayer
        ? new Date(time)
        : null;

    if (nextPrayerDate && upcomingPrayer) {
        const [hours, minutes] = upcomingPrayer.value.slice(0, 5).split(":").map(Number);
        const isTomorrow = !gatherPrayers.some(
            (prayer) => getMinutesFromTime(prayer.value) > currentMinutes
        );

        if (isTomorrow) {
            nextPrayerDate.setDate(nextPrayerDate.getDate() + 1);
        }

        nextPrayerDate.setHours(hours, minutes, 0, 0);
    }

    const countdown = nextPrayerDate
        ? formatCountdown(nextPrayerDate.getTime() - time.getTime())
        : "--";
    if (isLoading) {
        return 'Loading...'
    }
    if (error) {
       return 'Try again ....' 
    }

    return ( 
        <motion.section
        id="prayer-times"
        initial={{opacity:0,y:16}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.65,ease:'easeOut'}}
        viewport={{once:true,amount:0.3}}
        className="grid w-full gap-6 rounded-2xl px-4 md:px-0 py-20 grid-cols-2 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-4">
            <span className="text-primary-text flex text-sm items-center gap-1 mask-r-from-30%">
                {t("prayer.current")} <span className="w-24 h-0.5 bg-primary-text"></span> 
            </span>
            <div className="text-4xl md:text-6xl text-primary-text font-semibold tracking-tighter">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
            <div className="flex items-center gap-4">
                <h3 className="text-primary-text text-lg font-medium">
                    {date?.readable}
                </h3>
                /
                <h3 className="text-primary-text text-lg font-medium">
                    {date?.hijri?.date}
                </h3>
            </div>
        <p className="text-xs font-light text-gold-accent text-start">{t("prayer.warning")}</p>
        </div>
        <div className="relative col-span-2 md:col-span-1 flex min-h-44 flex-col overflow-hidden justify-between rounded-2xl border border-gold-accent/30 bg-cards/70 p-5 text-left shadow-lg backdrop-blur-md">
           <div className="absolute -top-3 -left-3">
            <img src="/light.svg" className="w-14 h-14 opacity-30" alt="" />
           </div>
            <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-secondary-text">{t("prayer.upcoming")}</span>
                {upcomingPrayer && (
                    <span className="rounded-full bg-gold-accent/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-gold-accent">
                        {nextPrayerDate && nextPrayerDate.getDate() !== time.getDate() ?  t("prayer.tomorrow") : t("prayer.today")}
                    </span>
                )}
            </div>
            <div className="mt-6">
                <p className="text-3xl font-semibold tracking-tight text-primary-text">
                    {upcomingPrayer ? prayerLabels[upcomingPrayer.key as (typeof prayerOrder)[number]] : "Unavailable"}
                </p>
                <p className="mt-1 text-sm text-secondary-text">
                    {upcomingPrayer?.value.slice(0, 5) ?? "--:--"}
                </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-gold-accent/10 pt-3">
                <span className="text-xs text-secondary-text">{t("prayer.start")}</span>
                <span className="text-sm font-medium text-gold-accent">{countdown}</span>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 col-span-2 gap-4">
            {gatherData.slice(0,7).map((prayer)=>{
                
                return(
                    <div 
                key={prayer.key} 
                className={`${prayer.key === 'Sunset' ? 'hidden' : ''} group flex flex-col justify-between border border-gold-accent/20 bg-cards/40 hover:bg-cards/80 hover:border-gold-accent/60 p-4 rounded-2xl transition-all duration-300 shadow-sm`}
            >
               
                <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-gold-accent/10 text-gold-accent group-hover:scale-105 transition-transform duration-300">
                            {prayerIcons[prayer.key]}
                        </span>
                        <h1 className="text-sm sm:text-base font-semibold text-primary-text tracking-wide">{prayerTranslate[prayer.key]}</h1>
                    </div>
                </div>

                
                <div className="w-full text-right">
                    <span className="text-gold-accent text-lg sm:text-xl font-bold tracking-tight">
                        {prayer.value}
                    </span>
                </div>
            </div>
                )
            })}
        </div>
        </motion.section>
     );
}
 
export default PrayerTimes;
