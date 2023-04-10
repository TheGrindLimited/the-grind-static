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
                <title>For Coach / School | The Grind</title>
            </Head>
            <div className="bg-[url(/assets/images/inner-page-hero-bg.png)] bg-cover bg-bottom bg-no-repeat pt-[82px] lg:pt-[106px]">
                <div className="relative">
                    <div className="container">
                        <div className="relative w-full py-14 md:my-14 md:inline-block md:py-0 lg:my-[128px]">
                            <div className="heading relative mb-8 text-center lg:mb-0 lg:w-1/2 ltr:lg:text-left rtl:lg:text-right">
                                <h6>For Coach / School</h6>
                                <h4 className="!text-white">Wanna elevate your training experience?</h4>
                                <a href="https://coach.thegrind-app.com/" className="btn mx-auto my-12 block w-fit bg-white lg:mx-0 lg:rtl:ml-auto">
                                    Start Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='align-middle'>
                    <div className="heading text-left">
                        <h2>Schedule Training</h2>
                        <h2>Plan for drills</h2>
                        <h1 className='max-w-[430px]'>We not only help you to plan the drills for in person training, but you can set programs for each individual trainees to work on in other days.</h1>
                    </div>
                </div>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[3].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[1].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
                <div className='align-middle'>
                    <div className="heading">
                        <h2 className='max-w-[420px]'>Manage Team Activities</h2>
                        <h1 className='max-w-[400px] text-left'>We make sure everyone in the group knows when and where the training is happening, and you know who is coming and who is not.</h1>
                    </div>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='align-middle'>
                    <div className="heading text-left">
                        <h2>Share knowledge</h2>
                        <h2>Build community</h2>
                        <h1 className='max-w-[400px]'>We help you build your sports training knowledge base, so that your trainees can look back anytime.</h1>
                    </div>
                </div>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[4].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
            </div>

            <div className='flex py-[41px] lg:py-[53px] justify-center gap-[15vw]'>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData.data[6].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
                <div className='align-middle'>
                    <div className="heading text-left">
                        <h2 className='max-w-[430px]'>Branding for coaches</h2>
                        <h1 className='max-w-[400px]'>We build you a profile to represent your coaching style based on daily training highlight with your students.</h1>
                    </div>
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
