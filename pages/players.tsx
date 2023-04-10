import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';

const Coach = (props: any) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.direction) === 'rtl' ? true : false;

    const [imageData, setImageData] = useState(props.image_data.data[0].attributes.Slider)
    
    return (
        <div>
            <Head>
                <title>For Players / Young Athletes / Parents | The Grind</title>
            </Head>
            <div className="bg-[url(/assets/images/inner-page-hero-bg.png)] bg-cover bg-bottom bg-no-repeat pt-[82px] lg:pt-[106px]">
                <div className="relative">
                    <div className="container">
                        <div className="relative w-full py-14 md:my-14 md:inline-block md:py-0 lg:my-[128px]">
                            <div className="heading relative mb-8 text-center lg:mb-0 lg:w-1/2 ltr:lg:text-left rtl:lg:text-right">
                                <h6>For Players / Young Athletes / Parents</h6>
                                <h4 className="!text-white">Wanna get better at your sports?</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[4].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
                <div className='align-middle'>
                    <div className="heading text-left">
                        <h2 className='max-w-[430px]'>Have your own drill database</h2>
                        <h1 className='max-w-[430px]'>We help you build your sports training knowledge base, so that you can look back anytime without asking your coach.</h1>
                    </div>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='align-middle'>
                    <div className="heading">
                        <h2 className='max-w-[450px]'>Communicate with other players</h2>
                        <h1 className='max-w-[400px] text-left'>You can discuss with your teammates & coaches on specific drills or concepts.</h1>
                    </div>
                </div>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[5].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[0].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
                <div className='align-middle'>
                    <div className="heading text-left">
                        <h2 className='max-w-[450px]'>Show off your achievements & sports journey</h2>
                        <h1 className='max-w-[400px]'>You can build your own sports career profile, share your progress & show off your personal highlights.</h1>
                    </div>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='align-middle'>
                    <div className="heading text-left">
                        <h2 className='max-w-[430px]'>Explore new sports knowledge</h2>
                        <h1 className='max-w-[400px]'>You can get to know other coaches, explore new sports knowledge and reach out to them.</h1>
                    </div>
                </div>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[2].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
            </div>
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

export default Coach;
