import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';

const Coach = (props: any) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.direction) === 'rtl' ? true : false;

    const [imageData, setImageData] = useState(props.image_data.data[0].attributes.image.data)
    const [textData, setTextData] = useState(props.text_data.data)
    
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
                                <h6>{textData[0].attributes.text}</h6>
                                <h4 className="!text-white">{textData[1].attributes.text}</h4>
                                <a href="https://coach.thegrind-app.com/" className="btn mx-auto my-12 block w-fit bg-white lg:mx-0 lg:rtl:ml-auto">
                                    Start Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col-reverse py-[41px] lg:py-[53px] justify-center lg:gap-[15vw] gap-[3vw] lg:flex-row items-center'>
                <div className='align-middle'>
                    <div className="heading text-center lg:text-left">
                        <h2 className='max-w-[430px] px-2 lg:px-0'>{textData[2].attributes.text}</h2>
                        <h1 className='max-w-[430px] text-center lg:text-left px-4 lg:px-0'>{textData[3].attributes.text}</h1>
                    </div>
                </div>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData[0].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
            </div>

            <div className='flex flex-col py-[41px] lg:py-[53px] justify-center lg:gap-[15vw] gap-[3vw] lg:flex-row items-center'>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData[1].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
                <div className='align-middle'>
                    <div className="heading text-center lg:text-left">
                        <h2 className='max-w-[430px] px-2 lg:px-0'>{textData[4].attributes.text}</h2>
                        <h1 className='max-w-[400px] text-center lg:text-left px-4 lg:px-0'>{textData[5].attributes.text}</h1>
                    </div>
                </div>
            </div>

            <div className='flex flex-col-reverse py-[41px] lg:py-[53px] justify-center lg:gap-[15vw] gap-[3vw] lg:flex-row items-center'>
                <div className='align-middle'>
                    <div className="heading text-center lg:text-left">
                        <h2 className='max-w-[430px] px-2 lg:px-0'>{textData[6].attributes.text}</h2>
                        <h1 className='max-w-[400px] text-center lg:text-left px-4 lg:px-0'>{textData[7].attributes.text}</h1>
                    </div>
                </div>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData[2].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
            </div>

            <div className='flex flex-col py-[41px] lg:py-[53px] justify-center lg:gap-[15vw] gap-[3vw] lg:flex-row items-center'>
                <div className='w-[240px] h-[480px]'>
                    <img src={imageData[3].attributes.url} className="w-[240px] h-[480px]"/>
                </div>
                <div className='align-middle'>
                    <div className="heading text-center lg:text-left">
                        <h2 className='max-w-[430px] px-2 lg:px-0'>{textData[8].attributes.text}</h2>
                        <h1 className='max-w-[400px] text-center lg:text-left px-4 lg:px-0'>{textData[9].attributes.text}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps(context : any) {
    let image = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-coach-images?populate=*")
    let text : any;
    if(context.locale == "en-US"){
        text = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-coach-texts?_locale=en-US")
    }else{
        text = await axios.get("https://thegrind-strapi-5x42fcw6uq-df.a.run.app/api/the-grind-coach-texts?_locale=zh")
    }
    const image_data = image.data
    const text_data = text.data

    return {
      props: {
        image_data,
        text_data
      }
    }
  }

export default Coach;
