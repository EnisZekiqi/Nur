import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Quran = () => {
    const [surah,setSurah]=useState(0)
    const [ayah,setAyah]=useState(0)
    //// states that will be in the api
    const [pushSurah,setPushSurah]=useState(2)
    const [pushAyah,setPushAyah]=useState(255)
    const [message,setMessage]=useState('')

    const {data:Quran,isLoading,error}=useQuery({
        queryKey: ['Quran', pushSurah, pushAyah],
        queryFn:async () => {
            const result = await fetch(`https://ummahapi.com/api/quran/surah/${pushSurah}/ayah/${pushAyah}`)
            return result.json()
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
  gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    function searchSurah() {
        if (surah > 114) {
            setMessage('Surah number must be between 1 and 114')
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return
        }else if (ayah === 0) {
            setMessage('Ayah number must be between higher than 0')
            setTimeout(() => {
                setMessage('')
            }, 3000);
            return
        }
        setPushSurah(surah)
        setPushAyah(ayah)
    }

    const SurahName = Quran?.data.surah
    const SurahMeaning = Quran?.data.verse
    
    if (isLoading) {
    return (
        <section className="py-20 px-6 md:px-12 border-t border-gold-accent/20 bg-gradient-to-b from-transparent to-black/5 animate-pulse">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                
                {/* Left Column Skeleton */}
                <div className="flex flex-col items-start gap-4">
                    {/* Badge Skeleton */}
                    <div className="h-6 w-28 bg-gold-accent/10 rounded-full" />
                    {/* Title Skeleton */}
                    <div className="h-10 w-48 bg-primary-text/10 rounded-lg" />
                    {/* Description Skeleton */}
                    <div className="space-y-2 w-full max-w-lg">
                        <div className="h-4 w-full bg-secondary-text/10 rounded" />
                        <div className="h-4 w-3/4 bg-secondary-text/10 rounded" />
                    </div>
                </div>

                {/* Right Column (Card) Skeleton */}
                <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-secondary-bg/50 border border-gold-accent/20 shadow-xl w-full">
                    
                    {/* Card Header Skeleton */}
                    <div className="flex items-center justify-between pb-4 border-b border-gold-accent/10 w-full">
                        <div className="flex flex-col gap-2">
                            <div className="h-3 w-12 bg-secondary-text/10 rounded" />
                            <div className="h-6 w-40 bg-primary-text/10 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-20 bg-gold-accent/10 rounded-md" />
                            <div className="h-7 w-16 bg-secondary-text/10 rounded-md" />
                        </div>
                    </div>

                    {/* Translation Name Skeleton */}
                    <div className="h-3 w-32 bg-secondary-text/10 rounded -mt-2" />

                    {/* Verses Content Box Skeleton */}
                    <div className="flex flex-col items-start gap-5 pt-2 w-full">
                        {/* Arabic Text Placeholder (Right-aligned lines) */}
                        <div className="flex flex-col items-end gap-2 w-full">
                            <div className="h-7 w-4/5 bg-primary-text/10 rounded" />
                            <div className="h-7 w-2/3 bg-primary-text/10 rounded" />
                        </div>

                        {/* Transliteration Placeholder */}
                        <div className="h-4 w-3/5 bg-secondary-text/10 rounded italic" />

                        {/* English Translation Box Placeholder */}
                        <div className="p-4 rounded-xl bg-gold-accent/5 border-l-2 border-gold-accent/40 w-full space-y-2">
                            <div className="h-4 w-full bg-gold-accent/10 rounded" />
                            <div className="h-4 w-4/5 bg-gold-accent/10 rounded" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

    if (error) {
        return 'Problems...'
    }



    
    
    return ( 
        <section id="daily-quran" className="py-20 px-4 md:px-0 border-t border-gold-accent/20 bg-gradient-to-b from-transparent to-background">
    <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        
        <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent px-3 py-1 rounded-full bg-gold-accent/10">
                Daily Inspiration
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary-text">
                Daily Quran
            </h1>
            <p className="text-sm tracking-tight font-normal text-secondary-text text-balance max-w-lg leading-relaxed text-start">
                Check daily Quran surah & ayah or search the surah and ayah you prefer to read.
            </p>
            <p className="text-xs font-light text-start text-secondary-text text-balance">
                In the inputs below,choose the surah & ayah you want to show,read & understand , a mistake will result of showing nothing
            </p>
            <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                <label htmlFor="surah" className="flex flex-col gap-1 text-xs text-start text-secondary-text">
                    Surah number
                    <input id="surah" type="number" value={surah} onChange={(e)=>setSurah((Number(e.target.value)))} placeholder="Select Surah" className="w-full min-w-0 text-primary-text text-sm placeholder:text-secondary-text rounded-xl p-2 focus:outline-0 border border-gold-accent/60 focus:border-gold-accent md:col-span-1 md:w-40" />
                </label>
                <label htmlFor="ayah" className="flex flex-col gap-1 text-xs text-start text-secondary-text">
                    Ayah number
                    <input id="ayah" type="number" value={ayah} onChange={(e) => setAyah(Number(e.target.value))} placeholder="Select Ayah" className="w-full min-w-0 text-primary-text text-sm placeholder:text-secondary-text rounded-xl p-2 focus:outline-0 border border-gold-accent/60 focus:border-gold-accent md:col-span-1 md:w-40" />
                </label>
            </div>
            <button onClick={searchSurah} className="rounded-xl bg-primary-text w-full px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:bg-primary cursor-pointer hover:text-[#F7F5EF] focus:outline-none focus:ring-2 focus:ring-gold-accent/50">Search Surah</button>
            <p className="text-red-400 text-xs font-light">{message}</p>
            </div>
        </div>

        
        <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-secondary-bg/50 border border-gold-accent/30 shadow-xl backdrop-blur-sm w-full">
            
           
            <div className="flex items-center justify-between pb-4 border-b border-gold-accent/10 w-full">
                <div className="flex flex-col">
                    <span className="text-xs text-secondary-text text-start uppercase tracking-wider">Surah</span>
                    <h2 className="text-xl font-semibold text-primary-text">
                        {SurahName.name_english} <span className="font-light text-secondary-text">({SurahName.name_arabic})</span>
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gold-accent/15 text-gold-accent border border-gold-accent/30">
                        Surah #{SurahName.number}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary-text/10 text-secondary-text">
                        Ayah {SurahMeaning.ayah}
                    </span>
                </div>
            </div>

           
            <div className="text-xs text-secondary-text font-medium -mt-2">
                {SurahName.name_translation}
            </div>

           
            <div className="flex flex-col items-start gap-5 pt-2">
                {/* Arabic Text (Right Aligned & Styled) */}
                <p className="text-2xl md:text-3xl font-serif text-primary-text text-right w-full leading-loose" dir="rtl">
                    {SurahMeaning.arabic}
                </p>

            
                <p className="text-sm font-medium text-secondary-text italic tracking-wide">
                    "{SurahMeaning.transliteration}"
                </p>

                
                <div className="p-4 rounded-xl bg-gold-accent/5 border-l-2 border-gold-accent w-full">
                    <p className="text-sm font-medium text-gold-accent leading-relaxed">
                        {SurahMeaning.translations.sahih_international}
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>
     );
}
 
export default Quran;