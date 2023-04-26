import Testimonial from '../components/Testimonial';
import { useState } from 'react';
import CounterComponent from '../components/CounterComponent';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import axios from 'axios';
import { useRouter } from 'next/router';

const Index = (props: any) => {
    const [activeTab, setActiveTab] = useState<string>('all');
    const isRtl = useSelector((state: IRootState) => state.themeConfig.direction) === 'rtl' ? true : false;

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [message, setMessage] = useState("")

    const [missingInput, setMissingInput] = useState("");
    const [invalidEmail, setInvalidEmail] = useState("");
    const [invalidPhone, setInvalidPhone] = useState("");

    const [messageSent, setMessageSent] = useState(false);

    const [imageData, setImageData] = useState(props.image_data.data[0].attributes.image.data)
    const [textData, setTextData] = useState(props.text_data.data)
    const [linkData, setlinkData] = useState(props.link_data.data)

    const [subEmail, setSubEmail] = useState("")
    const [subed, setSubed] = useState(false)
    const [subInvalidEmail, setSubInvalidEmail] = useState("")

    const sendEmailAPI = (e: any) => {
        if(!firstName || !lastName || !emailAddress || !message){
            setMissingInput("Missing required information.")
            return;
        };
        setMissingInput("")
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailAddress.match(regexEmail)){
            setInvalidEmail("Invalid Email Address, please try again.")
            return;
        };
        setInvalidEmail("")
        let regexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (phoneNumber && !phoneNumber.match(regexPhone)){
            setInvalidPhone("Invalid Phone Number, please try again.")
            return;
        };

        axios.post("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/emails", {
            "data": {
                "message": message,
                "firstname": firstName,
                "lastname": lastName,
                "email": emailAddress,
                "phoneNumber": phoneNumber
            }
        })
        setMessageSent(true);
    }

    const emailSubscribe = () => {
        if (!subEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            setSubInvalidEmail("Invalid Email Address, please try again.")
            return;
        };
        axios.post("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/subscriptions", {
            data:{
                email: subEmail
            }
        })
        setSubed(true)
    }

    const router = useRouter();

    return (
        <div className="overflow-x-hidden">
            <div className="overflow-hidden bg-black pt-[82px] sm:-mx-[250px] sm:rounded-b-[50%] lg:-mx-[150px] lg:pt-[106px]">
                <div className="relative text-white bg-cover bg-bottom bg-no-repeat" style={{backgroundImage: `url(${imageData[0].attributes.url})`, }}>
                    <div className="container">
                        <div className="relative text-white pt-14 pb-0 lg:pt-20 lg:pb-60 xl:pt-36" >
                            <h2 className="text-4xl font-extrabold leading-normal sm:text-5xl lg:text-[64px] lg:leading-[90px] bg-gray-100 bg-opacity-100">
                                {textData[0].attributes.text}
                            </h2>
                            <div className="flex flex-col mx-auto my-12 gap-8 w-fit lg:mx-0 lg:rtl:ml-auto lg:flex-row">
                                <a href={linkData[5].attributes.links}>
                                    <img src={imageData[1].attributes.url} className="w-[200px] h-[60px]"/>
                                </a>
                                <a href={linkData[4].attributes.links}>
                                    <img src={imageData[2].attributes.url} className="w-[200px] h-[60px]"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className=" py-14 dark:bg-none lg:py-[100px]">
                <div className="container">
                    <div className="heading text-center">
                        <h6>{textData[1].attributes.text}</h6>
                        <h4>{textData[2].attributes.text}</h4>
                                                                        
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="players" data-aos="fade-up" data-aos-duration="1000">
                            <div
                                className="h-[280px] group rounded-3xl border-2 border-white bg-white p-6 transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary"
                                style={{
                                    boxShadow: '-20px 30px 70px rgba(219, 222, 225, 0.4)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full transition"
                                    style={{
                                        boxShadow: '0px 15px 30px rgba(180, 118, 229, 0.4)',
                                    }}
                                >
                                    <img src={imageData[3].attributes.url} className="w-[60px] h-[60px] rounded-full"/>
                                </div>
                                <div className="my-8 inline-block text-[22px] font-extrabold text-black dark:text-white dark:group-hover:text-black"
                                >
                                    {textData[3].attributes.text}
                                </div>
                                <p className="mb-10 text-lg font-semibold transition line-clamp-3 dark:group-hover:text-black">
                                    {textData[4].attributes.text}
                                </p>
                            </div>
                        </Link>
                        <Link href="players" data-aos="fade-up" data-aos-duration="1000">
                            <div
                                className="h-[280px] group rounded-3xl border-2 border-white bg-white p-6 transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary"
                                style={{
                                    boxShadow: '-20px 30px 70px rgba(219, 222, 225, 0.4)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full transition"
                                    style={{
                                        boxShadow: '0px 15px 30px rgba(180, 118, 229, 0.4)',
                                    }}
                                >
                                    <img src={imageData[4].attributes.url} className="w-[60px] h-[60px] rounded-full"/>
                                </div>
                                <div className="my-8 inline-block text-[22px] font-extrabold text-black dark:text-white dark:group-hover:text-black"
                                >
                                    {textData[5].attributes.text}
                                </div>
                                <p className="mb-10 text-lg font-semibold transition line-clamp-3 dark:group-hover:text-black">
                                    {textData[6].attributes.text}
                                </p>
                            </div>
                        </Link>
                        <Link href="players" data-aos="fade-up" data-aos-duration="1000">
                            <div
                                className="h-[280px] group rounded-3xl border-2 border-white bg-white p-6 transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary"
                                style={{
                                    boxShadow: '-20px 30px 70px rgba(219, 222, 225, 0.4)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full transition"
                                    style={{
                                        boxShadow: '0px 15px 30px rgba(180, 118, 229, 0.4)',
                                    }}
                                >
                                    <img src={imageData[5].attributes.url} className="w-[60px] h-[60px] rounded-full"/>
                                </div>
                                <div className="my-8 inline-block text-[22px] font-extrabold text-black dark:text-white dark:group-hover:text-black"
                                >
                                    {textData[7].attributes.text}
                                </div>
                                <p className="mb-10 text-lg font-semibold transition line-clamp-3 dark:group-hover:text-black">
                                    {textData[8].attributes.text}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <section
                className="py-14 dark:!bg-none lg:py-[100px]"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 54.69%)',
                }}
            >
                {/*<CounterComponent title="Company Facts" />*/}
                <div className="relative my-14 mx-auto border-[10px] border-transparent bg-black py-14 dark:border-black dark:bg-gray-dark lg:my-[100px] lg:py-[100px] xl:max-w-[1440px] xl:rounded-3xl">
                    <div className="container">
                        <div className="">
                            <div className="heading mb-16 text-center ltr:lg:text-left rtl:lg:text-right">
                                <h6>{textData[9].attributes.text}</h6>
                                <h4 className="leading-normal !text-white lg:!leading-[50px]">{textData[10].attributes.text}</h4>
                            </div>
                            <div className='flex flex-col gap-[12rem] md:gap-0 md:flex-row justify-around text-xl text-black py-8'>
                                <Link href="coach" className='flex flex-col items-center text-center justify-center cursor-pointer hover:-translate-y-5 ease-in duration-100'>
                                    <div className='w-[450px] h-[200px]'>
                                        <img src={imageData[6].attributes.url} className="w-[450px] h-[300px] opacity-60"/>
                                    </div>
                                    <div className='text-white text-2xl font-bold z-50'>{textData[11].attributes.text}</div>
                                </Link>
                                <Link href="players" className='flex flex-col items-center text-center justify-center cursor-pointer hover:-translate-y-5 ease-in duration-100'>
                                    <div className='w-[450px] h-[200px]'>
                                        <img src={imageData[7].attributes.url} className="w-[450px] h-[300px] opacity-60"/>
                                    </div>
                                    <div className='text-white text-2xl font-bold z-50'>{textData[12].attributes.text}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='flex flex-col text-center py-14 gap-2'>
                <div className='heading'>
                    <h6>{textData[13].attributes.text}</h6>
                    <h4>{textData[14].attributes.text}</h4>
                </div>
                <div className='flex flex-col justify-center gap-16 md:flex-row items-center'>
                    <img src={imageData[8].attributes.url} className="w-[200px]" />
                    <img src={imageData[9].attributes.url} className="w-[200px]" />
                    <img src={imageData[10].attributes.url} className="w-[200px]" />
                </div>
            </section>
            {/*<Testimonial />*/}
            <section className="py-14 dark:bg-gray-dark lg:py-[100px]" id="stay-tuned">
                <div className="container">
                    <div className="relative z-10 lg:flex">
                        <div className="heading text-center lg:mb-0 lg:w-1/3 ltr:lg:pr-10 ltr:lg:text-left rtl:lg:pl-10 rtl:lg:text-right">
                            <h6>{textData[15].attributes.text}</h6>
                            <h4 className="sm:!leading-[50px]">{textData[16].attributes.text}</h4>
                        </div>
                        <form action="" className="rounded-3xl bg-white px-4 py-12 dark:bg-[#101626] lg:w-2/3 lg:px-8">
                            <div className="grid gap-10 sm:grid-cols-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                        onChange={(e) => {setFirstName(e.target.value)}}
                                    />
                                    <label
                                        htmlFor=""
                                        className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white"
                                    >
                                        {textData[17].attributes.text}
                                    </label>
                                    <svg
                                        width="20"
                                        height="22"
                                        viewBox="0 0 20 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white"
                                    >
                                        <path
                                            d="M5.42855 5.57875C5.42855 8.10348 7.47525 10.1502 9.99998 10.1502C12.5247 10.1502 14.5714 8.10348 14.5714 5.57875C14.5714 3.05402 12.5247 1.00732 9.99998 1.00732"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M2 16.9328C2 15.9495 2.61812 15.0724 3.5441 14.7417V14.7417C7.71891 13.2507 12.2811 13.2507 16.4559 14.7417V14.7417C17.3819 15.0724 18 15.9495 18 16.9328V18.7014C18 19.9185 16.922 20.8535 15.7172 20.6813L13.8184 20.4101C11.2856 20.0483 8.71435 20.0483 6.18162 20.4101L4.28284 20.6813C3.07798 20.8535 2 19.9185 2 18.7014V16.9328Z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />
                                    </svg>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                        onChange={(e) => {setLastName(e.target.value)}}
                                    />
                                    <label
                                        htmlFor=""
                                        className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white"
                                    >
                                        {textData[18].attributes.text}
                                    </label>
                                    <svg
                                        width="20"
                                        height="22"
                                        viewBox="0 0 20 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white"
                                    >
                                        <path
                                            d="M5.42855 5.57875C5.42855 8.10348 7.47525 10.1502 9.99998 10.1502C12.5247 10.1502 14.5714 8.10348 14.5714 5.57875C14.5714 3.05402 12.5247 1.00732 9.99998 1.00732"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M2 16.9328C2 15.9495 2.61812 15.0724 3.5441 14.7417V14.7417C7.71891 13.2507 12.2811 13.2507 16.4559 14.7417V14.7417C17.3819 15.0724 18 15.9495 18 16.9328V18.7014C18 19.9185 16.922 20.8535 15.7172 20.6813L13.8184 20.4101C11.2856 20.0483 8.71435 20.0483 6.18162 20.4101L4.28284 20.6813C3.07798 20.8535 2 19.9185 2 18.7014V16.9328Z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />
                                    </svg>
                                </div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                        onChange={(e) => {setEmailAddress(e.target.value)}}
                                    />
                                    <label
                                        htmlFor=""
                                        className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white"
                                    >
                                        {textData[19].attributes.text}
                                    </label>
                                    <svg
                                        width="22"
                                        height="21"
                                        viewBox="0 0 22 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white"
                                    >
                                        <path
                                            d="M1 8.00732V7.00732C1 4.2459 3.23858 2.00732 6 2.00732H16C18.7614 2.00732 21 4.2459 21 7.00732V13.0073C21 15.7687 18.7614 18.0073 16 18.0073H6C3.23858 18.0073 1 15.7687 1 13.0073V12.0073"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M5 7.00732L9.8 10.6073C10.5111 11.1407 11.4889 11.1407 12.2 10.6073L17 7.00732"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="name"
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                        onChange={(e) => {setPhoneNumber(e.target.value)}}
                                    />
                                    <label
                                        htmlFor=""
                                        className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white"
                                    >
                                        {textData[20].attributes.text}
                                    </label>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <input
                                    type="text"
                                    name="message"
                                    className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                    onChange={(e) => {setMessage(e.target.value)}}
                                />
                                <label htmlFor="" className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white">
                                    {textData[21].attributes.text}
                                </label>
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white"
                                >
                                    <path
                                        d="M1 11.467V18.9267C1 19.7652 1.96993 20.2314 2.6247 19.7076L5.45217 17.4456C5.8068 17.1619 6.24742 17.0073 6.70156 17.0073H16C18.7614 17.0073 21 14.7687 21 12.0073V6.00732C21 3.2459 18.7614 1.00732 16 1.00732H6C3.23858 1.00732 1 3.2459 1 6.00732V7.62225"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="6.05005" cy="9.05713" r="1.25" fill="currentColor" />
                                    <circle cx="11.05" cy="9.05713" r="1.25" fill="currentColor" />
                                    <circle cx="16.05" cy="9.05713" r="1.25" fill="currentColor" />
                                </svg>
                            </div>
                            <div className='text-md text-[#FF5454]'>{missingInput}</div>
                            <div className='text-md text-[#FF5454]'>{invalidEmail}</div>
                            <div className='text-md text-[#FF5454]'>{invalidPhone}</div>
                            <div className="mt-10 text-center ltr:lg:text-right rtl:lg:text-left">
                                {messageSent ?
                                <div className='text-lg text-[#7dec51]'>{textData[22].attributes.text}</div>
                                :
                                <button type="button" className="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary" onClick={(e) => sendEmailAPI(e)}>
                                    {textData[23].attributes.text}
                                </button>
                                }
                            </div>
                            <div className='flex flex-col'>
                                <a className='flex gap-1' href='mailto:info@thegrind-app.com' target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg> info@thegrind-app.com
                                </a>
                                <div className='flex gap-4'>
                                    <a href={linkData[1].attributes.links} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" fill="currentColor" className="bi bi-facebook cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                        </svg>
                                    </a>
                                    <a href={linkData[2].attributes.links} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" fill="currentColor" className="bi bi-instagram cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                        </svg>
                                    </a>
                                    <a href={linkData[3].attributes.links} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" fill="currentColor" className="bi bi-linkedin cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='flex flex-col py-16'>
                        <div className='text-xl font-bold'>{textData[24].attributes.text}</div>
                        <div>{textData[25].attributes.text}</div>
                        <form className='flex flex-col lg:flex-row gap-3 lg:gap-0'>
                            <input
                                type="text"
                                name="message"
                                className="w-full mr-20 rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                placeholder='Email Address*'
                                onChange={(e) => setSubEmail(e.target.value)}
                            />
                            {
                            subed
                            ?
                            <div className='text-xl py-2 text-[#46ff7e]'>Subscribed!</div>
                            :
                            <button type="button" className="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary" onClick={() => emailSubscribe()}>
                                {textData[26].attributes.text}
                            </button>
                            }
                        </form>
                        <div className='text-lg text-[#FF5454]'>{subInvalidEmail}</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export async function getStaticProps(context : any) {
    let text: any;
    text = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-home-texts?sort=id&locale=en")
    /*
    if(context.locale == "en-US"){
        text = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-home-texts?sort=id&locale=en")
    }else{
        text = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-home-texts?sort=id&locale=zh")
    }
    */
    let image = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-home-images?populate=*")
    let link = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-infos")
    const image_data = image.data
    const text_data = text.data
    const link_data = link.data

    return {
    props: {
        image_data,
        text_data,
        link_data,
        context
    }
    }
}

export default Index;
