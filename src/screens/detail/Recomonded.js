import { View, Text } from 'react-native'
import React from 'react'

import { useFetch } from '../../hooks/UseFetch'
import Carosel from '../../components/Carosel'
import { useNavigation } from '@react-navigation/native'
const Recomonded = ({ mediaType, id }) => {
    const navigation = useNavigation();
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
    return (
        <>
            {
                data?.results?.length >= 1 && (
                    <Carosel
                        title="Recommendations"
                        data={data?.results}
                        loading={loading} x
                        endpoint={mediaType}
                        navigate={(media_type, id) => {
                            navigation.navigate("Detail", { media_type: media_type, id: id });
                        }}
                    />
                )
            }
        </>
    )
}

export default Recomonded