import { useState,useEffect, useRef } from 'react';
import { Moon, Sparkles, BookOpen, Heart, Repeat, Sun, MoonIcon, MenuIcon, X } from 'lucide-react';
import { motion,AnimatePresence } from 'motion/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
    const [activeNav, setActiveNav] = useState<number | null>(null);
    const [smallerActive,setSmallerActive]=useState(false)
    const { t } = useTranslation("common");
    const theme = useTheme((state)=>state.theme)
    const changeTheme = useTheme((state)=>state.changeTheme)
useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
}, [theme]);
    const navigation = [
        {
            id: 0,
            title: t("nav.navigation1"),
            url: "#daily-quran",
            description: t("nav.nav1description"),
            icon: <BookOpen size={16} className="text-gold-accent" />,
            smallInformation: [
                { title: t("nav.smallInformation1.title1"), subtitle:  t("nav.smallInformation1.description1") },
                { title:  t("nav.smallInformation1.title2"), subtitle:  t("nav.smallInformation1.description2") },
                { title:  t("nav.smallInformation1.title3"), subtitle: t("nav.smallInformation1.description3") },
                { title:  t("nav.smallInformation1.title4"), subtitle: t("nav.smallInformation1.description4") }
            ]
        },
        {
            id: 1,
            title: t("nav.navigation2"),
            url: "#daily-duas",
            description: t("nav.nav2description"),
            icon: <Heart size={16} className="text-gold-accent" />,
            smallInformation: [
                { title: t("nav.smallInformation2.title1"), subtitle: t("nav.smallInformation2.description1") },
                { title: t("nav.smallInformation2.title2"), subtitle: t("nav.smallInformation2.description2") },
                { title: t("nav.smallInformation2.title3"), subtitle: t("nav.smallInformation2.description3") },
                { title: t("nav.smallInformation2.title4"), subtitle: t("nav.smallInformation2.description4") }
            ]
        },
        {
            id: 2,
            title: t("nav.navigation3"),
            url: "#digital-tasbih",
            description: t("nav.nav3description"),
            icon: <Repeat size={16} className="text-gold-accent" />,
            smallInformation: [
                { title: t("nav.smallInformation3.title1"), subtitle: t("nav.smallInformation3.description1") },
                { title: t("nav.smallInformation3.title2"), subtitle: t("nav.smallInformation3.description2") },
                { title: t("nav.smallInformation3.title3"), subtitle: t("nav.smallInformation3.description3") },
                { title: t("nav.smallInformation3.title4"), subtitle: t("nav.smallInformation3.description4") }
            ]
        },
        {
            id: 3,
            title: t("nav.navigation4"),
            url: "#names-of-allah",
            description: t("nav.nav4description"),
            icon: <Sparkles size={16} className="text-gold-accent" />,
            smallInformation: [
                { title: t("nav.smallInformation4.title1"), subtitle: "Ar-Rahman (الرحمن)" },
                { title: t("nav.smallInformation4.title2"), subtitle: "Ar-Rahim (الرحيم)" },
                { title: t("nav.smallInformation4.title3"), subtitle: "As-Salam (السلام)" },
                { title: t("nav.smallInformation4.title4"), subtitle: t("nav.smallInformation4.description4") }
            ]
        },
    ];
      const buttonRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (!buttonRef.current?.contains(event.target as Node)) {
            setSmallerActive(false);
          }
        };
    
        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setSmallerActive(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('keydown', handleEscape);
        };
      }, []);


    return ( 
        <motion.nav
        initial={{opacity:0,y:-10}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.3,ease:'linear'}}
        className="flex items-center justify-between w-full px-6 py-2.5 md:py-4 bg-background/80 backdrop-blur-md border-b border-gold-accent/20 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <span className="rounded-full p-2 border border-gold-accent/60 bg-cards text-gold-accent shadow-sm">
                    <Moon size={18}/>
                </span>
                <span className="text-xl text-primary-text font-bold tracking-wide">Nur</span>
            </div>


            <div className="hidden xl:flex items-center gap-6">
                {navigation.map((nav) => (
                    <div onMouseEnter={() => setActiveNav(nav.id)}
                            onMouseLeave={()=>setActiveNav(null)}
                             className="relative" key={nav.id}>
                        <button
                            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer py-1 ${
                                activeNav === nav.id ? "text-gold-accent" : "text-secondary-text hover:text-primary-text"
                            }`}
                            type="button"
                            aria-expanded={activeNav === nav.id}
                            
                        >
                            {nav.icon}
                            {nav.title}
                        </button>
                        {activeNav === nav.id && <div className='absolute left-1/2 -translate-x-1/2 top-[80%] bg-transparent z-20 mt-0 w-80 h-10'/>}
                         <AnimatePresence mode='wait'>
                        {activeNav === nav.id && (
                                <>
                                <motion.div
                                 initial={{opacity:0,y:-10}}
                                animate={{opacity:1,y:0}}
                                exit={{opacity:0,y:-10}}
                                transition={{duration:0.3,ease:'linear'}}
                                className="absolute left-1/2 -translate-x-1/2 top-full z-20 mt-3 w-80 rounded-2xl border border-gold-accent/40 bg-cards p-5 text-left shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                                <h1 className='text-lg font-semibold text-primary-text flex items-center gap-1'>
                                    <span className='bg-gold-accent h-1.5 w-1.5 rounded-full'></span> 
                                    {nav.title}
                                    </h1>
                                <div className="border-b border-gold-accent/10 pb-3 mb-3">
                                    <p className="text-xs leading-relaxed text-secondary-text text-balance">{nav.description}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {nav.smallInformation.map((item, idx) => (
                                        <div 
                                            key={idx}
                                            className="group p-2 rounded-lg hover:bg-gold-accent/10 transition-colors duration-150 cursor-pointer"
                                        >
                                            <p className="text-xs font-semibold text-primary-text group-hover:text-gold-accent transition-colors">
                                                {item.title}
                                            </p>
                                            <p className="text-[11px] text-secondary-text">{item.subtitle}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-3 border-t border-gold-accent/10 text-right">
                                    <a
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-gold-accent hover:text-primary-text transition-colors duration-200"
                                        href={nav.url}
                                        onClick={() => setActiveNav(null)}
                                    >
                                        {t("nav.exploreButton")} &rarr;
                                    </a>
                                </div>
                            </motion.div>
                            </>
                        )}
                        </AnimatePresence>
                    </div>
                ))}
                
            </div>

          
              <div ref={buttonRef} className="flex items-center gap-4" >
                  <button onClick={()=>setSmallerActive(prev => !prev)} className='hidden md:block xl:hidden relative px-2.5 py-2 rounded-xl bg-cards border border-gold-accent/60 hover:border-gold-accent transition-all duration-200 cursor-pointer'><MenuIcon size={15}/></button>
               <AnimatePresence>
                 {smallerActive && 
                <motion.div
                 initial={{opacity:0,y:-10}}
                 animate={{opacity:1,y:0}}
                  exit={{opacity:0,y:-10}}
                   transition={{duration:0.3,ease:'linear'}}
                className="hidden md:flex absolute top-15 bg-cards p-2 rounded-xl border  border-gold-accent  flex-col items-start gap-2">
                    {navigation.map((nav)=>(
                        <a href={nav.url} className='flex items-center gap-1 hover:bg-background px-2 py-1 w-full rounded-xl hover:text-gold-accent transition-all duration-200' key={nav.id}>
                            {nav.icon}
                            <p>{nav.title}</p>
                        </a>
                    ))}
                </motion.div>
                }
               </AnimatePresence>
               <button  onClick={()=>setSmallerActive(prev => !prev)} className='block md:hidden  relative p-1.5 rounded-xl bg-cards border border-gold-accent/60 hover:border-gold-accent transition-all duration-200 cursor-pointer'><MenuIcon size={20}/></button>
                <AnimatePresence>
                    {smallerActive && 
                    <>
                    <div onClick={()=>setSmallerActive(false)} className="fixed inset-0 bg-background/60 h-screen backdrop-blur-2xl"></div>
                    <motion.div
                     initial={{opacity:0,x:20}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0,x:20}}
                    transition={{duration:0.3,ease:'linear'}}
                    className='fixed top-0 right-0 flex h-dvh w-75 flex-col items-start gap-4 bg-cards p-2 border-l border-gold-accent'
                    >
                    <div className="flex justify-between items-center w-full border-b border-gold-accent/40 pb-2">
                        <div className="flex items-center  gap-3  w-full">
                    <span className="rounded-full p-2 border border-gold-accent/60 bg-cards text-gold-accent shadow-sm">
                        <Moon size={18}/>
                    </span>
                    <span className="text-xl text-primary-text font-bold tracking-wide">Nur</span>
                     </div>
                     <button onClick={()=>setSmallerActive(false)} className='p-1 rounded-xl bg-cards border border-gold-accent/60 hover:border-gold-accent transition-all duration-200 cursor-pointer'><X size={20}/></button>
                    </div>
                    <h3 className='text-base font-medium text-primary-text'>Navigation</h3>
                    {navigation.map((nav)=>(
                    <a href={nav.url} className='flex items-center justify-between gap-1 hover:bg-background px-2 py-1 w-full rounded-xl hover:text-gold-accent transition-all duration-200' key={nav.id}>
                    <div className="flex items-center gap-2">
                    {nav.icon}
                    <p className='text-sm font-base'>{nav.title}</p>
                    </div>
                    <span className='text-xs uppercase text-secondary-text '>0{nav.id}</span>
                     </a>
                    ))}
                    <div className="flex flex-col justify-between h-full w-full">
                        <div className='space-y-2 w-full'>
                        <h3 className='text-base font-medium text-primary-text pt-2 border-t border-gold-accent/40 w-full text-start'>Customization</h3>
                    <div className="flex items-center justify-between w-full px-2 py-1">
                    <p className='text-sm font-base text-secondary-text'>Theme Color</p>
                      <button onClick={changeTheme} className=' rounded-xl px-2.5 py-1.5 border border-gold-accent/60 hover:border-gold-accent transition-all duration-200 cursor-pointer flex bg-cards text-xs text-primary-text  items-center gap-1'>{theme === 'light' ? <MoonIcon size={15}/> :<Sun size={15}/> } {theme === 'light' ? 'Light' :'Dark'} </button>
                    </div>
                    <div className="flex items-center justify-between w-full px-2 py-1">
                        <p className='text-sm font-base text-secondary-text'>Language Changer</p>
                        <LanguageSwitcher/>
                    </div>
                        </div>
                <button className=" rounded-xl bg-primary-text w-full px-4 py-2 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-[#F7F5EF] focus:outline-none focus:ring-2 focus:ring-gold-accent/50">
                    {t("nav.button")}
                </button>
                    </div>
                    </motion.div>
                    </>
                    }
                </AnimatePresence>
                <button onClick={changeTheme} className='hidden rounded-xl px-2.5 py-1.5 border border-gold-accent/60 hover:border-gold-accent transition-all duration-200 cursor-pointer md:flex bg-cards text-xs text-primary-text  items-center gap-1'>{theme === 'light' ? <MoonIcon size={15}/> :<Sun size={15}/> } {theme === 'light' ? 'Light' :'Dark'} </button>
                <div className="hidden md:block">
                    <LanguageSwitcher/>
                </div>
            <a href='#prayer-times' className="hidden md:block rounded-xl bg-primary-text px-4 py-2 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-[#F7F5EF] focus:outline-none focus:ring-2 focus:ring-gold-accent/50">
                {t("nav.button")}
            </a>
            </div>
        </motion.nav>
    );
}

export default Navbar;