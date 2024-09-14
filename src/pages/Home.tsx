import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getUserById } from '../services/userService';
import { MapView, useMapData, useMap, Label, useEvent } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { createActivity } from '../services/activityService';

interface Props {
  user:any
}

function MyCustomComponent( { user }: Props) {
  const { mapView, mapData } = useMap();

    mapData.getByType('space').forEach(space => {
        mapView.updateState(space, {
            interactive: true,
            hoverColor: "#98FB98"
        });
    });

  useEvent("click", (event) => {
    if (event.spaces[0]) {
      let activity = event.spaces[0];
      createActivity(Date.now(), activity.center.latitude, activity.center.longitude, activity.name ?? "Unnamed Activity", user.id, user.bio)
      console.log("hi there");
      mapView.Labels.add(activity, user.id);
      mapView.Labels.all();
      mapView.update();
    }
  })

  return (
    <>
      {mapData.getByType("space").map((space) => {
        return <Label key={space.center.latitude} target={space.center} text={space.name} />;
      })}
    </>
  );
}

function Home() {
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<any>(null);
  const user = location.state?.user; 

  const { mapData, isLoading, error } = useMapData({
		key: 'mik_Qar1NBX1qFjtljLDI52a60753',
		secret: 'mis_CXFS9WnkQkzQmy9GCt4ucn2D68zNRgVa2aiJj5hEIFM8aa40fee',
		mapId: '66ce20fdf42a3e000b1b0545',
	});
  
  useEffect( () => {
    const fetchData = async () => {
      if (user) {
        const userProfile = await getUserById(user)
        setUserInfo(userProfile)
        setLoading(false)
        console.log(userInfo)
      } else {  
        console.log("ERROR!!!")
      }
    }
    fetchData()
  }, [user]);
  if (loading || isLoading) {
    return (
      <div>Loading</div>
    )
  } 
  return mapData && userInfo ? 
  (<div>
    <img className='absolute z-50 top-0 right-0 m-8 size-16 rounded-full' src={userInfo.pfp}></img>
    <MapView mapData={mapData} style={{ width: '100vw', height: '100vh' }}><MyCustomComponent user={userInfo} /></MapView>
    </div>): null;
}

export default Home