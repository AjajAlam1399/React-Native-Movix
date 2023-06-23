import { fetchDataFromApi } from "../services/Api";

import { getApiConfigration, getGenres } from "./HomeSlice";

export const getApiConfig = (url, params) => async (dispatch) => {
    const recivedData = await fetchDataFromApi(url, params);

    const uri = {
        backdrop: recivedData?.images?.secure_base_url + "original",
        poster: recivedData?.images?.secure_base_url + "original",
        profile: recivedData?.images?.secure_base_url + "original",
    }

    dispatch(getApiConfigration(uri));
};