export const getMasterData = async() => {
    const response =  await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json")
    const data = await response.json()
    return data;
}

export const getBrandedData  = async(brandId) => {
    const masterData = await getMasterData();
    const imageData = await getImageData();
    const res =  masterData.filter(({Brand}) =>  brandId.toLowerCase() === Brand.toLowerCase() );
    let i = 0;
    return res.map(each => {
        i=(i+1)%imageData.length
        return {...each,Image:imageData[i].Image}
    })
}

export const getImageData = async() => {
    const response =  await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json")
    const data = await response.json()
    return data
}

export const getCountryData = async(countryId='All') => {
    const masterData = await getMasterData();
    const imageData = await getImageData();
    let  i = 0;
    const isCountryFilterApplied = countryId !== 'All' ;
    const myResponses = {}
    const filteredData = masterData.filter(({Country}) => isCountryFilterApplied ? countryId.toLowerCase() === Country.toLowerCase() : true);
    filteredData.forEach((resp)=> {
        const {Country} = resp;
        try{

            myResponses[Country.toLowerCase()] = [...myResponses[Country.toLowerCase()],{...resp,Image:imageData[i].Image}];
            
        }
        catch(e){
            myResponses[Country.toLowerCase()] = [{...resp,Image:imageData[i].Image}]

        }
        i=(i+1)%imageData.length;
    })
    return myResponses;
}

export const getCountries = async() => {
    const masterData = await getMasterData();
    const countries = {}
    masterData.forEach(data => { countries[data.Country.toLowerCase()] = 1 });
    //console.log(countries);
    return Object.keys(countries);
}

export const getBrands = async() => {
    const masterData = await getMasterData();
    const brands = {}
    masterData.forEach(data => { brands[data.Brand.toLowerCase()] = 1 });
    //console.log(brands);
    return Object.keys(brands);
}

export const fetchCountries = async(from,len) => {
    const countries = await getCountries();
    let isEnd = false;
    if(from+len>=countries.length)
        isEnd = true;
    return {isEnd,responses:countries.slice(from,from+len)};
}