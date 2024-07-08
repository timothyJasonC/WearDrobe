import React, { useEffect, useState } from 'react';
import { MapOptions } from '@maptiler/sdk';
import * as maptilersdk from '@maptiler/sdk';
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import "@maptiler/geocoding-control/style.css";
import type { MapController } from "@maptiler/geocoding-control/types";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import maplibregl from "maplibre-gl";
import { toast } from 'sonner';

export default function Map({ setCurrentCity, setCurrentProvince, setLngLat, setCurrentSubDistrict, setCurrentAddress, setCurrentWard, setCurrentNeighbor, setCurrentRoad }: { setCurrentCity:React.Dispatch<React.SetStateAction<string>>, setCurrentProvince: React.Dispatch<React.SetStateAction<string>>, setCurrentSubDistrict:any, setCurrentNeighbor:any, setCurrentAddress:any, setCurrentWard: any, setCurrentRoad:any, setLngLat:any }) {
    const [ backupCity, setBackupCity ] = useState('')
    const [API_KEY] = useState('PsYxZBSXcseSSIr6soAI');
    const [mapController, setMapController] = useState<MapController>();

    useEffect(() => {
        maptilersdk.config.apiKey = API_KEY;
        const options : MapOptions = {
            container: document.getElementById("map") as HTMLElement,
            style: maptilersdk.MapStyle.STREETS,
            geolocate: maptilersdk.GeolocationType.POINT,
            fullscreenControl: 'bottom-right',
            language: 'name:id',
        }
        const map = new maptilersdk.Map(options);
        const marker = new maptilersdk.Marker({ color: '#ff0000' }).setLngLat([0, 0]).addTo(map);
        
        setMapController(createMapLibreGlMapController(map, maplibregl));

        map.on('load', () => {
            map.addSource('search-results', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            });
            map.addLayer({
                'id': 'point-result',
                'type': 'circle',
                'source': 'search-results',
                'paint': {
                    'circle-radius': 8,
                    'circle-color': '#B42222',
                    'circle-opacity': 0.5
                },
                'filter': ['==', '$type', 'Point']
            });
        });

        map.on('click', async (e) => {
            const { lng, lat } = e.lngLat;
            marker.setLngLat([lng, lat])
            const results = await maptilersdk.geocoding.reverse([lng, lat]);
            if (results.features) {
                const countryId = results.features.filter(item => item.place_type_name[0] == 'country')[0].id
                if (countryId == 'country.148') {
                    const province = results.features.filter(item => item.place_type_name[0] == 'province')[0].text_id
                    const provinceMapping: { [key: string]: string } = {
                        'Daerah Istimewa Yogyakarta': 'DI Yogyakarta',
                        'Daerah Khusus Ibukota Jakarta': 'DKI Jakarta',
                        'Provinsi Bali': 'Bali',
                        'Kepulauan Bangka-Belitung': 'Bangka Belitung',
                        'Aceh': 'Nanggroe Aceh Darussalam (NAD)',
                        'Nusa Tenggara Barat': 'Nusa Tenggara Barat (NTB)',
                        'Nusa Tenggara Timur': 'Nusa Tenggara Timur (NTT)',
                        'Sumatra Utara': 'Sumatera Utara',
                        'Sumatra Selatan': 'Sumatera Selatan',
                        'Sumatra Barat': 'Sumatera Barat',
                        'Papua Selatan': 'Papua',
                        'Papua Tengah': 'Papua',
                        'Papua Pegunungan': 'Papua'
                    };

                    const city = results.features.filter(item => item.place_type_name[0] == 'regency')[0]

                    let typeArr = []
                    for (let type of results.features) {
                        if ((type.place_type_name[0] == 'country' || type.place_type_name[0] == 'province') || type.place_type_name[0] == 'regency') {
                            continue
                        } else {
                            typeArr.push(type.place_type_name[0])
                        }
                    }
                    if (typeArr) {
                        if (typeArr.includes('sub-district')) {
                            const subDistrict = results.features.filter(item => item.place_type_name[0] == "sub-district")[0];
                            setCurrentSubDistrict(subDistrict)
                        } else {
                            setCurrentSubDistrict()
                        }
                        
                        if (typeArr.includes('neighborhood association')) {
                            const neighbor = results.features.filter(item => item.place_type_name[0] == "neighborhood association")[0];
                            setCurrentNeighbor(neighbor)
                        } else {
                            setCurrentNeighbor()
                        }

                        if (typeArr.includes('ward')) {
                            const ward = results.features.filter(item => item.place_type_name[0] == "ward")[0];
                            setCurrentWard(ward)
                        } else {
                            setCurrentWard()
                        }
                        
                        if (typeArr.includes('road')) {
                            const road = results.features.filter(item => item.place_type_name[0] == "road")[0];
                            setCurrentRoad(road)
                        } else {
                            setCurrentRoad()
                        }

                        if (typeArr.includes('address')) {
                            const address = results.features.filter(item => item.place_type_name[0] == 'address')[0].place_name_id;
                            setCurrentAddress(address)
                        } else {
                            setCurrentAddress()
                        }
                    } else {
                        setCurrentSubDistrict(); setCurrentNeighbor(); setCurrentNeighbor()
                        setCurrentWard(); setCurrentRoad(); setCurrentAddress('')
                    }

                    let parsed = ''
                    let parsedBackupCity = ''
                    if (city && typeof city.text_id === 'string') {
                        if (city.text_id.includes('Kabupaten')) {
                            parsed = city.text_id.split('Kabupaten')[1].trim();
                        } else if (city.text_id.includes('Kota')) {
                            parsed = city.text_id.split('Kota')[1].trim();
                        }
                    } else if (typeArr.length > 0) {
                        toast('typeArr must exist', { description: typeArr[0] });
                        const backup = results.features.filter(item => item.place_type_name[0] == typeArr[typeArr.length - 1])[0];
                        if (backup && backup.text_id && typeof backup.text_id === 'string') {
                            if (backup.text_id.includes('Kabupaten')) {
                                parsedBackupCity = backup.text_id.split('Kabupaten')[1].trim();
                            } else if (backup.text_id.includes('Kota')) {
                                parsedBackupCity = backup.text_id.split('Kota')[1].trim();
                            } else {
                                parsedBackupCity = backup.text_id;
                            }
                            setBackupCity(backup.text_id);
                        }
                    }

                    const cityMapping: { [key: string]: string } = {
                        "Labuhanbatu": "Labuhan Batu",
                        "Labuhanbatu Selatan": "Labuhan Batu Selatan",
                        "Labuhanbatu Utara": "Labuhan Batu Utara",
                    };
                    
                    const newCity = cityMapping[city?.text_id] || parsed || city?.text_id || parsedBackupCity || backupCity || "";
                    setCurrentCity(newCity);
                    setCurrentProvince(provinceMapping[province] || province);
                    setLngLat([lng, lat])
                } else {
                    toast.error('Not within reach', { description: 'please choose Indonesian Region' })
                }

            }
        });

    }, []);

    return (
        <>
            <div id='map' className="w-full h-64 rounded-md" >
                <div className='absolute top-2 left-2'>
                    <GeocodingControl apiKey={API_KEY} mapController={mapController} />
                </div>
            </div>
            <div id="results">
                <ul id="search-results">
                </ul>
            </div>
        </>
    );
}
