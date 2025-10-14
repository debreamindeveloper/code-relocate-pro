import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

const Map = () => {
  const { t } = useTranslation();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCM8f5iAhQ1elA8ZsDW1IkEBqWAor8FHoo',
    id: 'google-map-script',
  });

  const churchLocation = {
    lat: 60.330772,
    lng: 25.071342
  };


  if (loadError) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-muted-foreground">{t('map.error')}</p>
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-muted-foreground">{t('map.loading')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
        </div>
        <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={churchLocation}
            zoom={15}
          >
            <Marker position={churchLocation} />
          </GoogleMap>
        </div>
      </div>
    </section>
  );
};

export default Map;
