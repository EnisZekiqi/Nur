import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Names ={
    number: number,
    arabic: string,
    transliteration: string,
    english: string,
    meaning: string
}

const Names = () => {
    const [nextPage,setNextPage]=useState(1)
    const { t } = useTranslation("common");

    const {data,isLoading,error}=useQuery({
        queryKey:['names'],
        queryFn:async () => {
            const result = await fetch ('https://ummahapi.com/api/asma-ul-husna')
           return result.json()
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

     if (isLoading ) {
        return 'Loading...'
    }
    if (error ) {
        return 'Problems...'
    }
    const perPage =10
    const names = data?.data?.names  
    const totalCount = data?.data?.total_count
    const nextDisabled = nextPage * perPage + 9 === totalCount

    const tenNames = useMemo(() => {
        const namesPerPage= 10
        const start = nextPage * namesPerPage;
    
        return names.slice(start, start + namesPerPage);
    }, [names]);

    return ( 
        <section id="names-of-allah" className="px-4 md:px-0 py-20 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-semibold text-primary-text">{t("nav.navigation4")}</h1>
            <p className="text-sm font-normal text-secondary-text tracking-tight text-balance text-center w-full ">{t("nav.nav4description")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
    {tenNames.map((name:Names, index:number) => (
        <div 
            key={name.arabic || index} 
            className="group relative flex flex-col justify-between border border-gold-accent/20 bg-cards/40 hover:bg-cards/80 hover:border-gold-accent/60 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-gold-accent/5 backdrop-blur-sm"
        >
            {/* Top row: Arabic Name & Transliteration */}
            <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="text-2xl font-bold text-primary-text font-serif tracking-wide">
                    {name.arabic}
                </h2>
                <span className="text-xs font-medium tracking-wide uppercase px-2 py-1 rounded-md bg-gold-accent/10 text-gold-accent border border-gold-accent/20">
                    {name.transliteration}
                </span>
            </div>

            {/* Middle: English Translation/Description */}
            <p className="text-xs font-light text-secondary-text text-start leading-relaxed mb-4">
                {name.english}
            </p>

            {/* Bottom: Meaning Highlight */}
            <div className="pt-3 border-t border-gold-accent/10 flex items-center gap-2">
                <em className="text-gold-accent font-medium text-xs text-balance not-italic">
                    {name.meaning}
                </em>
            </div>
        </div>
    ))}
</div>
        <div className="flex items-center gap-2">
            <button disabled={nextPage === 1} onClick={()=>setNextPage(nextPage - 1)} className="disabled:opacity-50 bg-cards rounded-xl cursor-pointer text-primary-text border border-primary hover:border-gold-accent transition-all duration-300 p-2"><ChevronLeft/></button>
            <button disabled={nextDisabled} onClick={()=>setNextPage(nextPage + 1)} className="disabled:opacity-50 bg-cards rounded-xl cursor-pointer text-primary-text border border-primary hover:border-gold-accent transition-all duration-300 p-2"><ChevronRight/></button>
        </div>
        </section>
     );
}
 
export default Names;