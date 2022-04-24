import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getBrandedData, getBrands } from "../../fetchData";

const Brand  = ({brand,brandedData}) => {
    return <>
        <Head>
            <title>{ }</title>
        </Head>
        <h1>{brand}</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>

            {brandedData.map(each =>

                <div style={{ margin: "10px" }} key={`${brand}#${each.Variety}#${each.Brand}`}>
                    <div>
                        <Image src={each.Image} loading={"lazy"} width={"250px"} height={"250px"} />
                    </div>
                    <div>
                        <Link href={`/country/${each.Country.toLowerCase()}`}><a>{each.Country}</a></Link>
                        <p style={{width:"250px",wordBreak:"break-all"}}>{each.Variety}</p><p>{each.Style}</p><p>{each["Top Ten"]}</p><p>{each.Stars} star Rating</p>
                    </div>
                </div>)}
        </div>
    </>
}


export async function getStaticPaths(){
    const brands = await getBrands();
    const paths = brands.map(brand => ({params:{brand}}));
    return {
        paths,
        fallback:false
    }
}


export async function getStaticProps({params}){
    const {brand} = params;
    const brandedData = await getBrandedData(brand);
    return {
        props:{
            brand,
            brandedData
        }
    }
}
export default Brand;