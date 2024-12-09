import axios from 'axios';
const BaseURL = 'https://api.exchangerate-api.com/v4/latest/';

export const HttpGet = async(aParams) => {
  const oURL = BaseURL + aParams;
  const oResult = await axios.get(oURL);
  return oResult?.data
}