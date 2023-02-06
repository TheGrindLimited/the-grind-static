import type { NextPage } from 'next'
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = (props: any) => {
  //console.log(props.company_data)

  let {description} = props.company_data.data.attributes

  return (
    <div>
      {description}
    </div>
  )
}

export async function getStaticProps() {
  let company = await axios.get("http://localhost:1337/api/companies/1")
  let company_data = company.data

  if(!company_data) return {props: {}}

  return {
    props: {
      company_data
    }
  }
}

export default Home
