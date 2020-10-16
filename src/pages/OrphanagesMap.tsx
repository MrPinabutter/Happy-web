import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';

import 'leaflet/dist/leaflet.css'

import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';
import happyMapIcon from '../utils/mapIcon';

import '../styles/pages/orphanage-map.css'

interface Orphanage {
  id:number,
  latitude:number,
  longitude:number,
  name:string
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato do mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Teresina</strong>
          <span>Piaui</span>
        </footer>
      </aside>

      <Map 
        center={[-5.0960907,-42.7916728]} 
        zoom={13}
        style={{ width:'100%', height:'100%' }}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        
        {orphanages.map((orphanage) => {
          return(
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude,orphanage.longitude]}
              icon={happyMapIcon}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`} >
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap