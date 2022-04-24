const handler = async({query:{country}},handlerResponse) => {
    const response =  await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json")
    const data = await response.json()
    const isCountryFilterApplied = country ;
    const myResponses = {}
    const filteredData = data.filter(({Country}) => isCountryFilterApplied ? country[0].toLowerCase() === Country.toLowerCase() : true);
    filteredData.forEach((resp)=> {
        const {Country} = resp;
        try{

            myResponses[Country.toLowerCase()] = [...myResponses[Country.toLowerCase()],resp];
        }
        catch(e){
            myResponses[Country.toLowerCase()] = [resp]
        }
    })
    handlerResponse.status(200).json(myResponses);
}

export default handler;