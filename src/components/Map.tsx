import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

const Map = () => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-maps-key');

        if (error) {
          console.error('Error fetching API key:', error);
          setIsLoadingKey(false);
          return;
        }

        if (data?.apiKey) {
          setApiKey(data.apiKey);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoadingKey(false);
      }
    };

    fetchApiKey();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    id: 'google-map-script',
  });

  // Don't load Google Maps until we have the API key
  const shouldLoadMap = !isLoadingKey && apiKey;


  if (!shouldLoadMap) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-muted-foreground">{t('map.loading')}</p>
        </div>
      </section>
    );
  }

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
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
        </div>
      </div>
      <div className="h-[400px] w-full shadow-lg">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={churchLocation}
          zoom={15}
        >
          <Marker position={churchLocation} />
        </GoogleMap>
      </div>
    </section>
  );
};

export default Map;
