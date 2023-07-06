import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '../../store';
import { toggleTheme, toggleDirection } from '../../store/themeConfigSlice';
import { useRouter } from 'next/router';
import axios from 'axios';

const Header = (props: any) => {
    const router = useRouter();

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        if (window.innerWidth < 1024) {
            setShowMenu(!showMenu);
        } else {
            setShowMenu(false);
        }
    };

    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    interface imgData{
        data: Array<any>
    }

    const [imageData, setImageData] = useState<imgData>()

    useEffect(() => {
        async function getData() {
            const results = await axios('https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-images?populate=*');
            setImageData(results.data)
        }
        
        getData()
    }, [])

    let enRoute = ""
    let zhRoute = ""
    if(router.asPath === "/"){
        enRoute = router.asPath + "en-US"
        zhRoute = router.asPath + "zh"
    }else{
        enRoute = "/en-US" + router.asPath
        zhRoute = "/zh" + router.asPath
    }

    return (
        <header className={`sticky top-0 z-50 bg-black transition duration-300 ${props.className}`}>
            <div className="container">
                <div className="flex items-center justify-between py-1 lg:py-0">
                    <Link href="/" className='flex flex-col gap-1'>
                        {imageData ?
                            <img src={imageData.data[0].attributes.image.data[0].attributes.url} className="w-[100px] h-[90px] mt-4"/>
                            :
                            <>
                                <div className="text-white text-xl font-bold">THE GRIND</div><div className='text-white text-sm'>NEVER STOPS</div>
                            </>
                            }
                    </Link>
                    <div className="flex items-center">
                        <div onClick={() => toggleMenu()} className={`overlay fixed inset-0 z-[51] bg-black/60 ${showMenu ? '' : 'hidden'}`}></div>
                        <div className={`menus ${showMenu ? 'overflow-y-auto ltr:!right-0 rtl:!left-0' : ''}`}>
                            <div className="border-b border-gray/10 ltr:text-right rtl:text-left lg:hidden">
                                <button onClick={() => toggleMenu()} type="button" className="p-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-black dark:text-white"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <ul onClick={() => toggleMenu()}>
                                <li>
                                    <Link href="/" className={router.pathname === '/' ? 'active' : ''}>
                                        Home
                                    </Link>
                                </li>
                                <li className="group relative" onClick={(e) => e.stopPropagation()}>
                                    <Link
                                        href="#"
                                        className={
                                            router.pathname === '/coach'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        For Coach/School
                                        {/*the following is cursor animation*/}
                                        <div className="transition duration-500 group-hover:rotate-180 ltr:ml-2 rtl:mr-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19 9L12 15L10.25 13.5M5 9L7.33333 11"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                    <div className="submenu" onClick={() => toggleMenu()}>
                                        <Link href="/coach" className={router.pathname === '/coach' ? 'active' : ''}>
                                            Features
                                        </Link>
                                        <Link href="https://coach.thegrind-app.com/" className={router.pathname === '/https://coach.thegrind-app.com/' ? 'active' : ''}>
                                            Team admin/coach portal
                                        </Link>
                                    </div>
                                </li>

                                <li>
                                    <Link href="/players" className={router.pathname === '/players' ? 'active' : ''}>
                                        For Players/Young Athletes/Parents
                                    </Link>
                                </li>

                                <li className="group relative" onClick={(e) => e.stopPropagation()}>
                                    <Link
                                        href="#"
                                        className={
                                            router.pathname === '/lang'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        Lang
                                        <div className="transition duration-500 group-hover:rotate-180 ltr:ml-2 rtl:mr-2">
                                            {/*the following is cursor animation*/}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19 9L12 15L10.25 13.5M5 9L7.33333 11"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                    <div className="submenu" onClick={() => toggleMenu()}>
                                        <Link href="/" className={router.pathname === '/chinese' ? 'active' : ''}> {/*wrong linking now */}
                                            中文
                                        </Link>
                                        <Link href="/" className={router.pathname === '/english' ? 'active' : ''}> {/*wrong linking now */}
                                            Eng
                                        </Link>
                                    </div>
                                </li>
                                
                                {/*
                                <li className="group relative" onClick={(e) => e.stopPropagation()}>
                                    <a
                                        href={router.locale === "en-US" ? enRoute : zhRoute}
                                        className={
                                            router.pathname === enRoute
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        {router.locale === "en-US" ? "EN" : "ZH" }
                                        <div className="transition duration-500 group-hover:rotate-180 ltr:ml-2 rtl:mr-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19 9L12 15L10.25 13.5M5 9L7.33333 11"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </a>
                                    <div className="submenu2" onClick={() => toggleMenu()}>
                                        <a href={router.locale === "en-US" ? zhRoute : enRoute}>
                                            {router.locale === "en-US" ? "ZH" : "EN" }
                                        </a>
                                    </div>
                                </li>
                                */}

                                {/*
                                <li>
                                    <Link
                                        href="/portfolio"
                                        className={router.pathname === '/portfolio' || router.pathname === '/portfolio-detail' ? 'active' : ''}
                                    >
                                        Portfolio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/services"
                                        className={router.pathname === '/services' || router.pathname === '/services-detail' ? 'active' : ''}
                                    >
                                        Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className={router.pathname === '/team' ? 'active' : ''}>
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-us" className={router.pathname === '/about-us' ? 'active' : ''}>
                                        About Us
                                    </Link>
                                </li>
                                <li
                                    className={`${showSearch ? '!w-full' : ''}
                  search-bar absolute hidden w-0 overflow-hidden bg-black transition-all duration-500 ltr:right-0 rtl:left-0 lg:block`}
                                >
                                    <form action="" className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full border-b border-white bg-transparent py-1 outline-none ltr:pl-2 ltr:pr-8 rtl:pr-2 rtl:pl-8"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:right-0 rtl:left-0"
                                            onClick={() => toggleSearch()}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </form>
                                </li>

                                */}

                            </ul>
                            
                        </div>
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:hidden"
                            onClick={() => toggleMenu()}
                        >
                            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <path
                                    d="M2 15H11C11.552 15 12 15.447 12 16C12 16.553 11.552 17 11 17H2C1.448 17 1 16.553 1 16C1 15.447 1.448 15 2 15Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M2 8H20C20.552 8 21 8.447 21 9C21 9.553 20.552 10 20 10H2C1.448 10 1 9.553 1 9C1 8.447 1.448 8 2 8Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M21 2C21 1.447 20.552 1 20 1H7C6.448 1 6 1.447 6 2C6 2.553 6.448 3 7 3H20C20.552 3 21 2.553 21 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>

                        

                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
