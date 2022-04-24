import { fetchCountries } from "../../fetchData";
import Head from "next/head";
import Link from "next/link";
import React,{ useEffect, useState } from "react";
const Home = () => {
    const [countries,setCountries]  = useState([]);
    const [isEnd,setIsEnd] = useState(false);
    const getCountries = () => {
        console.log(countries)
        if (!isEnd) {
            fetchCountries(countries.length, 4)
                .then(({ isEnd, responses }) => {
                    setCountries([...countries, ...responses])
                    setIsEnd(isEnd);
                })
        }

    }
    useEffect(() => {
        fetchCountries(0, 4)
            .then(({ isEnd, responses }) => {
                setCountries([...countries, ...responses])
                setIsEnd(isEnd);
            })
    }, []);
    return (<>
        <Head>
            <title>Country List</title>
        </Head>
        <h1>Countries dashboard</h1>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>

            {
                countries.map(country => <div style={{ flexDirection: "column", display: "flex", alignItems: "center", width: "250px", height: "250px", margin: "50px", border: "1px solid black" }} key={country}>
                    <h1>{country}</h1>
                    <br></br>
                    <Link href={`/country/${country}`}><a>View More info</a></Link>
                </div>)
            }
        </div>
        {!isEnd && <p style={{textAlign:"center",cursor:"pointer"}} onClick={getCountries}><a>Load More</a></p>}

    </>);
}




export default Home;