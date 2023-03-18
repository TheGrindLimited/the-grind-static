import Testimonial from '../components/Testimonial';
import { useState } from 'react';
import CounterComponent from '../components/CounterComponent';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import axios from 'axios';

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

    const [imageData, setImageData] = useState(props.image_data.data[0].attributes.Slider.data)

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

        axios.post("http://localhost:1337/api/emails", {
            "data": {
                "message": message,
                "firstname": firstName,
                "lastname": lastName,
                "email": emailAddress,
                "phoneNumber": phoneNumber
            }
        })
    }

    return (
        <div className="overflow-x-hidden">
            <div className="overflow-hidden bg-black pt-[82px] sm:-mx-[250px] sm:rounded-b-[50%] lg:-mx-[150px] lg:pt-[106px]">
                <div className="relative">
                    <img src="/assets/images/banner-lefticon.png" alt="banner-lefticon" className="absolute left-0 top-20 sm:left-[250px] lg:left-[150px]" />
                    <img
                        src="/assets/images/banner-rightIcon.png"
                        alt="banner-rightIcon"
                        className="absolute right-0 -top-4 sm:right-[250px] lg:right-[150px]"
                    />
                    <div className="container">
                        <div className="relative bg-[url(/assets/images/world-map.png)] text-white bg-cover bg-top bg-no-repeat pt-14 pb-0 lg:pt-20 lg:pb-60 xl:pt-36">
                                <h2 className="text-4xl font-extrabold leading-normal sm:text-5xl lg:text-[64px] lg:leading-[90px] ">
                                    A NEW WAY OF SPORTS TRAINING & COMPETING
                                </h2>
                                <Link href="#" className="btn mx-auto my-12 block w-fit bg-white lg:mx-0 lg:rtl:ml-auto">
                                    read more
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-[url(/assets/images/service-bg.png)] bg-cover bg-center bg-no-repeat py-14 dark:bg-none lg:py-[100px]">
                <div className="container">
                    <div className="heading text-center">
                        <h6>Our Mission</h6>
                        <h4>Start your grinding with</h4>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div data-aos="fade-up" data-aos-duration="1000">
                            <div
                                className="h-[280px] group rounded-3xl border-2 border-white bg-white p-6 transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary"
                                style={{
                                    boxShadow: '-20px 30px 70px rgba(219, 222, 225, 0.4)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition group-hover:bg-black"
                                    style={{
                                        boxShadow: '0px 15px 30px rgba(180, 118, 229, 0.4)',
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M14.2371 18.7087L18.7103 14.2366L21.4893 17.0156V21.4888H17.0172L14.2371 18.7087ZM5.2917 9.76334L2.3092 6.7819C2.21118 6.68399 2.13342 6.56771 2.08036 6.43973C2.02731 6.31174 2 6.17455 2 6.03601C2 5.89746 2.02731 5.76027 2.08036 5.63229C2.13342 5.5043 2.21118 5.38803 2.3092 5.29012L5.2917 2.30867C5.4894 2.11103 5.75751 2 6.03706 2C6.31662 2 6.58472 2.11103 6.78242 2.30867L9.76598 5.29012L5.2917 9.76334Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M5.29177 12.7459L7.21895 14.6742L8.71179 13.1813L6.78249 11.2552L8.27321 9.76449L10.2015 11.6917L11.6922 10.201L9.76605 8.27271L11.2568 6.78199L13.1818 8.71128L14.6736 7.2195L12.7454 5.29232L15.7279 2.31087C15.9256 2.11323 16.1937 2.0022 16.4732 2.0022C16.7528 2.0022 17.0209 2.11323 17.2186 2.31087L21.6908 6.78304C21.8884 6.98074 21.9994 7.24885 21.9994 7.5284C21.9994 7.80795 21.8884 8.07606 21.6908 8.27376L8.27321 21.6913C8.07551 21.889 7.8074 22 7.52785 22C7.2483 22 6.98019 21.889 6.78249 21.6913L2.31032 17.2192C2.11268 17.0215 2.00165 16.7533 2.00165 16.4738C2.00165 16.1942 2.11268 15.9261 2.31032 15.7284L5.29177 12.7459Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <div className="my-8 inline-block text-[22px] font-extrabold text-black dark:text-white dark:group-hover:text-black"
                                >
                                    Digitization
                                </div>
                                <p className="mb-10 text-lg font-semibold transition line-clamp-3 dark:group-hover:text-black">
                                    Digitise traditional sports training
                                </p>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000">
                            <div
                                className="h-[280px] group rounded-3xl border-2 border-white bg-white p-6 transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary"
                                style={{
                                    boxShadow: '-20px 30px 70px rgba(219, 222, 225, 0.4)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition group-hover:bg-black"
                                    style={{
                                        boxShadow: '0px 15px 30px rgba(180, 118, 229, 0.4)',
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M14.2371 18.7087L18.7103 14.2366L21.4893 17.0156V21.4888H17.0172L14.2371 18.7087ZM5.2917 9.76334L2.3092 6.7819C2.21118 6.68399 2.13342 6.56771 2.08036 6.43973C2.02731 6.31174 2 6.17455 2 6.03601C2 5.89746 2.02731 5.76027 2.08036 5.63229C2.13342 5.5043 2.21118 5.38803 2.3092 5.29012L5.2917 2.30867C5.4894 2.11103 5.75751 2 6.03706 2C6.31662 2 6.58472 2.11103 6.78242 2.30867L9.76598 5.29012L5.2917 9.76334Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M5.29177 12.7459L7.21895 14.6742L8.71179 13.1813L6.78249 11.2552L8.27321 9.76449L10.2015 11.6917L11.6922 10.201L9.76605 8.27271L11.2568 6.78199L13.1818 8.71128L14.6736 7.2195L12.7454 5.29232L15.7279 2.31087C15.9256 2.11323 16.1937 2.0022 16.4732 2.0022C16.7528 2.0022 17.0209 2.11323 17.2186 2.31087L21.6908 6.78304C21.8884 6.98074 21.9994 7.24885 21.9994 7.5284C21.9994 7.80795 21.8884 8.07606 21.6908 8.27376L8.27321 21.6913C8.07551 21.889 7.8074 22 7.52785 22C7.2483 22 6.98019 21.889 6.78249 21.6913L2.31032 17.2192C2.11268 17.0215 2.00165 16.7533 2.00165 16.4738C2.00165 16.1942 2.11268 15.9261 2.31032 15.7284L5.29177 12.7459Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <div className="my-8 inline-block text-[22px] font-extrabold text-black dark:text-white dark:group-hover:text-black"
                                >
                                    Accessible
                                </div>
                                <p className="mb-10 text-lg font-semibold transition line-clamp-3 dark:group-hover:text-black">
                                    Make training knowledge more accessible
                                </p>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000">
                            <div
                                className="h-[280px] group rounded-3xl border-2 border-white bg-white p-6 transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary"
                                style={{
                                    boxShadow: '-20px 30px 70px rgba(219, 222, 225, 0.4)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition group-hover:bg-black"
                                    style={{
                                        boxShadow: '0px 15px 30px rgba(180, 118, 229, 0.4)',
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M14.2371 18.7087L18.7103 14.2366L21.4893 17.0156V21.4888H17.0172L14.2371 18.7087ZM5.2917 9.76334L2.3092 6.7819C2.21118 6.68399 2.13342 6.56771 2.08036 6.43973C2.02731 6.31174 2 6.17455 2 6.03601C2 5.89746 2.02731 5.76027 2.08036 5.63229C2.13342 5.5043 2.21118 5.38803 2.3092 5.29012L5.2917 2.30867C5.4894 2.11103 5.75751 2 6.03706 2C6.31662 2 6.58472 2.11103 6.78242 2.30867L9.76598 5.29012L5.2917 9.76334Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M5.29177 12.7459L7.21895 14.6742L8.71179 13.1813L6.78249 11.2552L8.27321 9.76449L10.2015 11.6917L11.6922 10.201L9.76605 8.27271L11.2568 6.78199L13.1818 8.71128L14.6736 7.2195L12.7454 5.29232L15.7279 2.31087C15.9256 2.11323 16.1937 2.0022 16.4732 2.0022C16.7528 2.0022 17.0209 2.11323 17.2186 2.31087L21.6908 6.78304C21.8884 6.98074 21.9994 7.24885 21.9994 7.5284C21.9994 7.80795 21.8884 8.07606 21.6908 8.27376L8.27321 21.6913C8.07551 21.889 7.8074 22 7.52785 22C7.2483 22 6.98019 21.889 6.78249 21.6913L2.31032 17.2192C2.11268 17.0215 2.00165 16.7533 2.00165 16.4738C2.00165 16.1942 2.11268 15.9261 2.31032 15.7284L5.29177 12.7459Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <div className="my-8 inline-block text-[22px] font-extrabold text-black dark:text-white dark:group-hover:text-black"
                                >
                                    Connection
                                </div>
                                <p className="mb-10 text-lg font-semibold transition line-clamp-3 dark:group-hover:text-black">
                                    Connect the community
                                </p>
                            </div>
                        </div>
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
                                <h6>Who is it for?</h6>
                                <h4 className="leading-normal !text-white lg:!leading-[50px]">We bring solutions to make life easier for our customers.</h4>
                            </div>
                            <div className='flex flex-col gap-[12rem] md:gap-0 md:flex-row justify-around text-xl text-black py-8'>
                                <div className='flex flex-col items-center text-center justify-center cursor-pointer hover:-translate-y-5 ease-in duration-100'>
                                    <div className='w-[450px] h-[200px]'>
                                        <img src={imageData[5].attributes.url} className="w-[450px] h-[300px] opacity-60"/>
                                    </div>
                                    <div className='text-white text-2xl font-bold z-50'>For Coaches</div>
                                </div>
                                <div className='flex flex-col items-center text-center justify-center cursor-pointer hover:-translate-y-5 ease-in duration-100'>
                                    <div className='w-[450px] h-[200px]'>
                                        <img src={imageData[6].attributes.url} className="w-[450px] h-[300px] opacity-60"/>
                                    </div>
                                    <div className='text-white text-2xl font-bold z-50'>For Players</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='flex flex-col text-center py-14 gap-2'>
                <div className='heading'>
                    <h6>Collaboration</h6>
                    <h4>We are connected with</h4>
                </div>
                <div className='flex flex-col justify-center gap-16 md:flex-row items-center'>
                    <img src={imageData[0].attributes.url} className="w-[200px]" />
                    <img src={imageData[1].attributes.url} className="w-[200px]" />
                    <img src={imageData[2].attributes.url} className="w-[200px]" />
                </div>
            </section>
            {/*<Testimonial />*/}
            <section className="py-14 dark:bg-gray-dark lg:py-[100px]">
                <div className="container">
                    <div className="relative z-10 lg:flex">
                        <div className="heading text-center lg:mb-0 lg:w-1/3 ltr:lg:pr-10 ltr:lg:text-left rtl:lg:pl-10 rtl:lg:text-right">
                            <h6>STAY TUNED</h6>
                            <h4 className="sm:!leading-[50px]">Be the first to try out when we launch!</h4>
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
                                        First Name*
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
                                        Last Name*
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
                                        Email Address*
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
                                        Phone Number
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
                                    Message*
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
                                <button type="button" className="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary" onClick={(e) => sendEmailAPI(e)}>
                                    Send Message
                                </button>
                            </div>
                            <div className='flex flex-col'>
                                <a className='flex gap-1' href='mailto:info@thegrind-app.com'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg> info@thegrind-app.com
                                </a>
                                <div className='flex gap-4'>
                                    <a href="https://www.facebook.com/TheGrindapps">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" fill="currentColor" className="bi bi-facebook cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/thegrind_app/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" fill="currentColor" className="bi bi-instagram cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/company/thegrind-app/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" fill="currentColor" className="bi bi-linkedin cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='flex flex-col py-16'>
                        <div className='text-xl font-bold'>Get Updates</div>
                        <div>Get the latest app version, news & updates. Subscribe to our newsletter.</div>
                        <form className='flex'>
                            <input
                                type="text"
                                name="message"
                                className="w-full mr-20 rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                placeholder='Email Address*'
                            />
                            <button type="button" className="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export async function getStaticProps() {
  let image = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/thegrinds?populate=*")
  const image_data = image.data

  return {
    props: {
      image_data
    }
  }
}

export default Index;
