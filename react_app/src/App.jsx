import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getBoiska } from './api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function App() {
  const [boiska, setBoiska] = useState([]);
  const [status, setStatus] = useState('Ładowanie boisk...');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getBoiska().then(({ data, fallback }) => {
      setBoiska(data);
      if (fallback) setStatus('Brak połączenia z serwerem – pokazuję dane zapasowe');
      else setStatus(data.length === 0 ? 'Brak boisk w bazie' : null);
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {status && (
        <div style={{
          position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, background: 'white', padding: '15px 25px', borderRadius: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)', textAlign: 'center', fontWeight: 'bold'
        }}>
          {status}
        </div>
      )}

      <MapContainer center={[52.2297, 21.0122]} zoom={11.5} style={{ width: '100%', height: '100%', zIndex: 0 }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {boiska.map((b) => (
          <Marker
            key={b.id}
            position={[b.lat, b.lon]}
            eventHandlers={{ click: () => setSelected(b) }}
          />
        ))}
      </MapContainer>

      {selected && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white',
          zIndex: 1000, padding: '25px', borderRadius: '25px 25px 0 0',
          boxShadow: '0 -10px 25px rgba(0,0,0,0.2)', maxHeight: '50vh', overflowY: 'auto'
        }}>
          <button
            onClick={() => setSelected(null)}
            style={{ float: 'right', cursor: 'pointer', border: 'none', background: '#eee', borderRadius: '50%', width: '35px', height: '35px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✖</button>

          <h2 style={{ marginTop: 0 }}>{selected.nazwa || 'Brak nazwy'}</h2>
          <p style={{ fontSize: '1.1rem', color: '#555' }}>📍 {selected.adres}, {selected.dzielnica}</p>
          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ddd' }} />
          <p><strong>🏀 Typ obiektu:</strong> {selected.typ || '-'}</p>
          <p><strong>⚽ Przeznaczenie:</strong> {selected.przeznaczenie || '-'}</p>
          <p><strong>🕒 Poniedziałek:</strong> {selected.godziny || '-'}</p>
          <p><strong>ℹ️ Uwagi:</strong> {selected.uwagi || 'Brak'}</p>
        </div>
      )}
    </div>
  );
}
