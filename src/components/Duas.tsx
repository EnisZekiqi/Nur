'use client'
import { useQuery } from "@tanstack/react-query";
import { Dices, RadiationIcon, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Dua = {
    title: string;
    category: string;
    translation: string;
    reference?: string | null;
};

const Duas = () => {

    
    const duasPerDay = 6

    
    const [searchTerm, setSearchTerm] = useState("");
    const [pushSearch,setPushSearch]=useState("")
     const [selectedCategory, setSelectedCategory] = useState("");

    const { data: duas = [], isLoading, isError } = useQuery<Dua[]>({
    queryKey: ["duas", pushSearch],
    queryFn: async () => {
        const url = pushSearch.trim() !== ""
            ? `https://ummahapi.com/api/duas/search?q=${encodeURIComponent(pushSearch)}`
            : "https://ummahapi.com/api/duas";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch duas");
        }

        const json = await response.json();

        return pushSearch.trim() !== ""
            ? json.data?.results ?? []
            : json.data?.duas ?? [];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});
const {
    data: randomDua,
    refetch: fetchRandomDua,
} = useQuery({
    queryKey: ["random-dua"],
    queryFn: async () => {
        const response = await fetch(
            "https://ummahapi.com/api/duas/random"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch random dua");
        }

        const json = await response.json();

        return json.data;
    },
    enabled: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});
///starts with this on the refreshing hte page or initial load
const dailyDuas = useMemo(() => {
    const day = new Date().getDay();
    const start = day * duasPerDay;

    return duas.slice(start, start + duasPerDay);
}, [duas]);

////once search button is clicked the search data is shown here 

    function submitSearch() {
        setPushSearch(searchTerm)
    }

    function RandomDua() {
        fetchRandomDua()
        setSelectedCategory('random')
    }

    const resetDuas = () => {
        setSearchTerm("");
        setPushSearch("")
        setSelectedCategory("");
    };

    if (isLoading) {
    return (
        <section className="flex flex-col relative gap-6 overflow-hidden items-center justify-center px-4 md:px-0 py-20 border-t border-cards animate-pulse w-full max-w-7xl mx-auto">
            
           
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                
                <div className="space-y-2 w-full md:w-auto">
                    <div className="h-10 w-32 bg-primary-text/10 rounded-lg" />
                    <div className="h-4 w-full md:w-96 bg-secondary-text/10 rounded" />
                </div>

                
                <div className="grid w-full grid-cols-2 items-center gap-2 md:flex md:w-auto md:shrink-0">
                    <div className="col-span-2 md:col-span-1 h-10 w-full md:w-40 bg-cards/60 border border-gold-accent/20 rounded-xl" />
                    <div className="h-10 w-full md:w-24 bg-primary-text/20 rounded-xl" />
                    <div className="h-10 w-full md:w-24 bg-gold-accent/20 rounded-xl" />
                    <div className="col-span-2 md:col-span-1 h-10 w-full md:w-36 bg-secondary-text/20 rounded-xl" />
                </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div 
                        key={index} 
                        className="flex flex-col justify-between border border-gold-accent/20 bg-cards/30 p-5 rounded-2xl shadow-sm h-48"
                    >
                        
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="h-6 w-3/5 bg-primary-text/15 rounded-md" />
                            <div className="h-5 w-20 bg-gold-accent/10 rounded-full" />
                        </div>

                        
                        <div className="space-y-2 w-full my-auto">
                            <div className="h-3 w-full bg-secondary-text/15 rounded" />
                            <div className="h-3 w-4/5 bg-secondary-text/15 rounded" />
                            <div className="h-3 w-2/3 bg-secondary-text/15 rounded" />
                        </div>

                        
                        <div className="pt-3 border-t border-gold-accent/10 flex items-center justify-between">
                            <div className="h-3 w-16 bg-secondary-text/10 rounded" />
                            <div className="h-5 w-24 bg-gold-accent/10 rounded" />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
    if (isError ) {
        return 'Problems...'
    }



    return ( 
        <section id="daily-duas" className="flex flex-col relative gap-4 overflow-hidden items-center justify-center px-4 md:px-0 py-20 border-t border-gold-accent/20">
           <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="space-y-2">
                 <h1 className="text-4xl font-semibold text-primary-text text-start">Duas</h1>
            <p className="text-sm font-normal tracking-tight text-secondary-text text-balance text-start w-full max-w-2xl">Check duas daily , each day will have 10 different duas , you can also have random duas as well searching specific ones</p>
            </div>
            <div className="grid w-full grid-cols-2 items-center gap-2 md:flex md:w-auto md:shrink-0 mt-4 md:mt-0">
                <input type="text" placeholder="Search Duas" className="col-span-2 w-full min-w-0 text-primary-text text-sm placeholder:text-secondary-text rounded-xl p-2 focus:outline-0 border border-gold-accent/60 focus:border-gold-accent md:col-span-1 md:w-40" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <button onClick={submitSearch} className="flex w-full items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm bg-primary-text text-background cursor-pointer font-medium whitespace-nowrap md:w-auto"><Search size={18}/> Search</button>
                <button onClick={RandomDua} className="flex w-full items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm bg-gold-accent text-background cursor-pointer font-medium whitespace-nowrap md:w-auto"><Dices size={18}/> Random</button>
                <button onClick={resetDuas} className="col-span-2 flex w-full items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm bg-secondary-text text-background cursor-pointer font-medium whitespace-nowrap md:col-span-1 md:w-auto"><RotateCcw size={18}/> Reset Filtering</button>
            </div>
           </div>
        <div className={`grid ${selectedCategory.trim() !== ''? 'grid-col-1':'grid-cols-1 md:grid-cols-3'} gap-4 mt-4`}>
            {selectedCategory !== "" && randomDua ? 
            (
                <div className="group flex flex-col gap-4 justify-between border border-gold-accent/20 bg-cards/40 hover:bg-cards/80 hover:border-gold-accent/60 p-4 rounded-2xl transition-all duration-300 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-primary-text">{randomDua.title}</h2>
                        <h3>{randomDua.category}</h3>
                    </div>
                    <p className="text-xs font-light text-secondary-text text-start">{randomDua.translation}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-light text-secondary-text">
                            Reference
                        </p>
                        <em className="text-gold-accent font-medium text-xs">{randomDua.reference}</em>
                    </div>
                </div>)
            
            :pushSearch.trim() !== ''? duas.map((dua)=>(
                <div className="group flex flex-col gap-4 justify-between border border-gold-accent/20 bg-cards/40 hover:bg-cards/80 hover:border-gold-accent/60 p-4 rounded-2xl transition-all duration-300 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-primary-text">{dua.title}</h2>
                        <h3>{dua.category}</h3>
                    </div>
                    <p className="text-xs font-light text-secondary-text text-start">{dua.translation}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-light text-secondary-text">
                            Reference
                        </p>
                        <em className="text-gold-accent font-medium text-xs">{dua.reference}</em>
                    </div>
                </div>
            )) : (dailyDuas.map((dua)=>(
                <div className="group relative flex flex-col justify-between border border-gold-accent/20 bg-cards/40 hover:bg-cards/80 hover:border-gold-accent/60 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-gold-accent/5 backdrop-blur-sm">
    
                {/* Top Row: Title & Category Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-xl font-bold text-primary-text tracking-tight">
                        {dua.title}
                    </h2>
                    <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-gold-accent/10 text-gold-accent border border-gold-accent/20 shrink-0">
                        {dua.category}
                    </span>
                </div>

                {/* Translation / Description */}
                <p className="text-xs font-light text-secondary-text text-start leading-relaxed mb-6">
                    {dua.translation}
                </p>

                {/* Bottom Row: Reference Tag */}
                <div className="pt-3 border-t border-gold-accent/10 flex items-center justify-between text-xs">
                    <span className="font-light text-secondary-text opacity-80">
                        Reference
                    </span>
                    <em className="text-gold-accent font-medium not-italic bg-gold-accent/5 px-2 py-0.5 rounded border border-gold-accent/10">
                        {dua.reference ?? 'No reference'}
                    </em>
                </div>
            </div>)
            ))}
        </div>
        </section>
     );
}
 
export default Duas;