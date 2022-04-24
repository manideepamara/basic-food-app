const handler = async({query:{id}},handlerResponse) => {
    const response =  await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json")
    const data = await response.json()
    const filteredData = data.filter(({Brand}) =>  id.toLowerCase() === Brand.toLowerCase() );
    handlerResponse.status(200).json(filteredData);
}

export default handler;