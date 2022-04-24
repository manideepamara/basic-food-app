import { getCountries, getCountryData } from "../../fetchData";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const CountryDetail = ({ country, countryData }) => {

    return <>
        <Head><title>{country}</title></Head>
        <>
            <h1>{country}</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>

                {countryData[country].map(each =>

                    <div style={{ margin: "10px" }} key={`${country}#${each.Variety}#${each.Brand}`}>
                        <div>
                            <Image src={each.Image} loading={"lazy"} width={"250px"} height={"250px"} />
                        </div>
                        <div>
                            <Link href={`/brand/${each.Brand.toLowerCase()}`}><a>{each.Brand}</a></Link>
                            <p style={{width:"250px",wordBreak:"break-all"}}>{each.Variety}</p><p>{each.Style}</p><p>{each["Top Ten"]}</p><p>{each.Stars} star Rating</p>
                        </div>
                    </div>)}
            </div>
        </>
        <Link href={`/country`}><a>Back to Home page</a></Link>
    </>
}


export async function getStaticPaths() {
    const countries = await getCountries();
    const paths = countries.map(country => ({ params: { country } }));
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const { country } = params;
    const countryData = await getCountryData(country);
    return {
        props: {
            country,
            countryData
        }
    }
}




export default CountryDetail;