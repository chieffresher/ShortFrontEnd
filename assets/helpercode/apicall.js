import axios from 'axios';

let serverBaseUrl = "http://72.167.150.61:7002/api";

export async function getCountries()
{
    let url = serverBaseUrl+"/country";
    let countries = [];
    try
    {
        let response = await axios.get(url);
        let data =  response.data;
        for(var i=0; i < data.length; i++)
          countries.push({label:data[i].id, value:data[i].name});
    }
    catch(error)
    {
        console.log("Error fetching data : "+error);
    }
    return countries;
}

export async function getIndustries()
{
    let url = serverBaseUrl+"/industry";
    let industries = [];
    try
    {
        let response = await axios.get(url);
        let data = await response.data;
        for(var i=0; i < data.length; i++)
          industries.push({label:data[i].id, value:data[i].name});
    }
    catch(error)
    {
        console.log("Error fetching data : "+error);
    }
    return industries;
}




