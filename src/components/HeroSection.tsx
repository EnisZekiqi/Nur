import { motion } from "motion/react";
import { useTranslation } from 'react-i18next';
const HeroSection = () => {

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.16, delayChildren: 0.15 },
        },
    };
    const childrenVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: "easeOut" as const },
        },
    };
    const children2Variants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 0.6,
            y: 0,
            transition: { duration: 0.65, ease: "easeOut" as const },
        },
    };

        const { t } = useTranslation("common");
    
    return (
        <section className="hero mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:px-6 py-16 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:px-12 lg:py-24">
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-5 text-left">
                <motion.span
                variants={childrenVariants}
                className="rounded-xl border border-gold-accent/40 bg-cards px-3 py-1 text-xs uppercase tracking-[0.18em] text-secondary-text">
                    {t("hero.subtitle")}
                </motion.span>
                <motion.h1 
                variants={childrenVariants}
                className="max-w-2xl text-6xl font-medium italic tracking-tighter text-primary-text sm:text-7xl lg:text-8xl">
                    {t("hero.title")}
                    <motion.b
                        animate={{ opacity: [0.86, 1, 0.86] }}
                        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                        className="bg-gradient-to-r from-primary-text via-gold-accent to-gold-accent bg-clip-text font-normal text-transparent"
                    >
                        {' '}{t("hero.highlight")}
                    </motion.b>
                </motion.h1>
                <motion.p 
                variants={childrenVariants}
                className="max-w-xl text-sm leading-7 text-secondary-text sm:text-base">
                    {t("hero.description")}
                </motion.p>
                <motion.a
                    href="#prayer-times"
                    variants={childrenVariants}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-xl bg-primary-text px-5 py-3 text-sm font-medium text-background hover:text-[#F7F5EF] transition-colors duration-200 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-gold-accent/50"
                >
                    {t("nav.button")}
                </motion.a>
            </motion.div>

            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex min-h-[28rem] items-center justify-center lg:min-h-[34rem]">
                <div className="absolute h-72 w-72 rounded-full bg-gold-accent/20 blur-3xl sm:h-96 sm:w-96" />
                <div className="absolute w-54 h-54 md:h-64 md:w-64 rounded-full border border-gold-accent/40 sm:h-80 sm:w-80" />
                <div className="absolute h-70 w-70 md:h-80 md:w-80 rounded-full border border-dashed border-gold-accent/40 sm:h-[26rem] sm:w-[26rem]" />

                 <motion.svg 
                    variants={children2Variants}
                 fill="#B28D4F" className="absolute -top-18 -right-4 opacity-60 w-[100px] h-[100px]  md:w-[150px] md:h-[150px]"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 396.586 396.586" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M281.603,179.637c0.828,0,1.5-0.671,1.5-1.5v-4.601h4.451c0.828,0,1.5-0.671,1.5-1.5v-9.699c0-0.829-0.672-1.5-1.5-1.5 h-24.146c-3.842-27.97-40.149-45.072-56.818-51.509c0.26-0.794,0.404-1.637,0.404-2.515c0-3.405-2.109-6.332-5.133-7.646 c1.078-0.939,1.76-2.294,1.76-3.806c0-1.994-1.182-3.722-2.906-4.57l-0.781-6.204c3.354-0.748,5.861-3.736,5.861-7.315v-0.5 c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.5c0,3.579,2.508,6.567,5.861,7.315l-0.781,6.204 c-1.725,0.849-2.906,2.576-2.906,4.57c0,1.512,0.682,2.866,1.758,3.806c-3.021,1.313-5.131,4.24-5.131,7.646 c0,0.877,0.144,1.721,0.404,2.515c-16.67,6.437-52.977,23.539-56.818,51.509h-24.148c-0.828,0-1.5,0.671-1.5,1.5v9.699 c0,0.829,0.672,1.5,1.5,1.5h4.451v4.601c0,0.829,0.672,1.5,1.5,1.5h3.271v162.282h-3.271c-0.828,0-1.5,0.671-1.5,1.5v4.598h-4.451 c-0.828,0-1.5,0.671-1.5,1.5v9.702c0,0.829,0.672,1.5,1.5,1.5h32.018c17.57,23.99,57.244,35.867,57.244,35.867 s39.674-11.877,57.244-35.867h32.016c0.828,0,1.5-0.671,1.5-1.5v-9.702c0-0.829-0.672-1.5-1.5-1.5h-4.451v-4.598 c0-0.829-0.672-1.5-1.5-1.5h-3.27V179.637H281.603z M161.343,331.651h-26.795V228.584c0-24.726,13.396-40.929,13.396-40.929 s13.398,16.203,13.398,40.929V331.651z M221.644,331.651h-46.701V228.584c0-24.726,23.352-40.929,23.352-40.929 s23.35,16.203,23.35,40.929V331.651z M262.04,331.651h-26.795V228.584c0-24.726,13.396-40.929,13.396-40.929 s13.398,16.203,13.398,40.929V331.651z"></path> <path d="M198.294,39.054c4.143,0,7.5-3.358,7.5-7.5v-0.963c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.963 C190.794,35.695,194.151,39.054,198.294,39.054z"></path> <path d="M198.294,15.962c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.962 C190.794,12.604,194.151,15.962,198.294,15.962z"></path> <path d="M198.294,62.145c4.143,0,7.5-3.358,7.5-7.5v-0.962c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.962 C190.794,58.786,194.151,62.145,198.294,62.145z"></path> </g> </g></motion.svg>
                <motion.svg 
                variants={children2Variants}
                fill="#B28D4F" className="absolute -top-4 -left-4 opacity-60 w-[100px] h-[100px] md:w-[150px] md:h-[150px]"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 396.586 396.586" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M281.603,179.637c0.828,0,1.5-0.671,1.5-1.5v-4.601h4.451c0.828,0,1.5-0.671,1.5-1.5v-9.699c0-0.829-0.672-1.5-1.5-1.5 h-24.146c-3.842-27.97-40.149-45.072-56.818-51.509c0.26-0.794,0.404-1.637,0.404-2.515c0-3.405-2.109-6.332-5.133-7.646 c1.078-0.939,1.76-2.294,1.76-3.806c0-1.994-1.182-3.722-2.906-4.57l-0.781-6.204c3.354-0.748,5.861-3.736,5.861-7.315v-0.5 c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.5c0,3.579,2.508,6.567,5.861,7.315l-0.781,6.204 c-1.725,0.849-2.906,2.576-2.906,4.57c0,1.512,0.682,2.866,1.758,3.806c-3.021,1.313-5.131,4.24-5.131,7.646 c0,0.877,0.144,1.721,0.404,2.515c-16.67,6.437-52.977,23.539-56.818,51.509h-24.148c-0.828,0-1.5,0.671-1.5,1.5v9.699 c0,0.829,0.672,1.5,1.5,1.5h4.451v4.601c0,0.829,0.672,1.5,1.5,1.5h3.271v162.282h-3.271c-0.828,0-1.5,0.671-1.5,1.5v4.598h-4.451 c-0.828,0-1.5,0.671-1.5,1.5v9.702c0,0.829,0.672,1.5,1.5,1.5h32.018c17.57,23.99,57.244,35.867,57.244,35.867 s39.674-11.877,57.244-35.867h32.016c0.828,0,1.5-0.671,1.5-1.5v-9.702c0-0.829-0.672-1.5-1.5-1.5h-4.451v-4.598 c0-0.829-0.672-1.5-1.5-1.5h-3.27V179.637H281.603z M161.343,331.651h-26.795V228.584c0-24.726,13.396-40.929,13.396-40.929 s13.398,16.203,13.398,40.929V331.651z M221.644,331.651h-46.701V228.584c0-24.726,23.352-40.929,23.352-40.929 s23.35,16.203,23.35,40.929V331.651z M262.04,331.651h-26.795V228.584c0-24.726,13.396-40.929,13.396-40.929 s13.398,16.203,13.398,40.929V331.651z"></path> <path d="M198.294,39.054c4.143,0,7.5-3.358,7.5-7.5v-0.963c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.963 C190.794,35.695,194.151,39.054,198.294,39.054z"></path> <path d="M198.294,15.962c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.962 C190.794,12.604,194.151,15.962,198.294,15.962z"></path> <path d="M198.294,62.145c4.143,0,7.5-3.358,7.5-7.5v-0.962c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5v0.962 C190.794,58.786,194.151,62.145,198.294,62.145z"></path> </g> </g></motion.svg>
               

                <motion.img 
                variants={children2Variants}
                src="/light.svg" className="absolute bottom-8 left-4 z-10 h-16 w-16 opacity-70" alt="" />
                <motion.img 
                variants={childrenVariants}
                src="/moon.png" className="relative z-10 w-[16rem] md:w-[18rem] object-cover drop-shadow-2xl sm:w-[24rem]" alt="Crescent moon illustration" />

                
                <motion.div
                initial={{y:-10,opacity:0.8}}
                animate={{y:[0,-10,0],opacity:[0.8,1,0.8]}}
                transition={{duration:3.2,ease:'easeInOut',repeat: Infinity}}
                className="absolute bottom-10 right-0 z-20 rounded-2xl border border-gold-accent/30 bg-cards/90 px-4 py-3 text-left shadow-xl backdrop-blur-md">
                    <p className="text-[10px] uppercase tracking-widest text-secondary-text">Stay consistent</p>
                    <p className="mt-1 text-sm font-semibold text-primary-text">One day at a time</p>
                </motion.div>
            </motion.div>
        </section>
    );
}
 
export default HeroSection;
