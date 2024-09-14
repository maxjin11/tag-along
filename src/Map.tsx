import React from 'react';
import { MapView, useMapData, useMap, Label, useEvent } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';

function MyCustomComponent() {
  const { mapView, mapData } = useMap();

    mapData.getByType('space').forEach(space => {
        mapView.updateState(space, {
            interactive: true,
            hoverColor: "#98FB98"
        });
    });

  useEvent("click", (event) => {
    console.log(`You clicked on ${event.coordinate.latitude}, ${event.coordinate.longitude}`)
  })

  return (
    <>
      {mapData.getByType("space").map((space) => {
        return <Label key={space.center.latitude} target={space.center} text={space.name} />;
      })}
    </>
  );
}

export default function Map() {
	const { mapData, isLoading, error } = useMapData({
		key: 'mik_Qar1NBX1qFjtljLDI52a60753',
		secret: 'mis_CXFS9WnkQkzQmy9GCt4ucn2D68zNRgVa2aiJj5hEIFM8aa40fee',
		mapId: '66ce20fdf42a3e000b1b0545',
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	return mapData ? <MapView mapData={mapData} style={{ width: '100vw', height: '100vh' }}><MyCustomComponent /></MapView> : null;
}