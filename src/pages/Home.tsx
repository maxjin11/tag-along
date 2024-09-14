import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getUserById } from '../services/userService';
import MappedIn, { MapView, useMapData, useMap, Label, useEvent } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { createActivity, getActivityById } from '../services/activityService';
import AddActivity from '../components/AddActivity';

interface Props {
  user:any
}

function MyCustomComponent( { user }: Props) {
  const { mapView, mapData } = useMap();
  const [locationState, setLocationState] = useState("");
  const [timeState, setTimeState] = useState(0);

  mapData.getByType('space').forEach(space => {
      mapView.updateState(space, {
          interactive: true,
          hoverColor: "#98FB98"
      });
  });

  const loadActivites = async () => {
    for (const friend of user.friends) {
      const friendInfo = await getUserById(friend);
      if (friendInfo) {
        console.log(friendInfo.activities.length)
        for (const activity in friendInfo.activities) {
          const activityInfo = await getActivityById(activity);
          if (activityInfo) {
            console.log(activityInfo.title);
            const coords = new MappedIn.Coordinate(activityInfo.latitude, activityInfo.longitude);
            mapView.Labels.add(coords, friendInfo.name, {
              appearance: {
              marker: {
                icon: `<img width="50" height="50" src=${friendInfo.pfp} alt="friend" />`
              }}
            });
          }
        }
      }
    }
  }

  loadActivites();

  useEvent("click", (event) => {
    if (event.spaces[0]) {
      let activity = event.spaces[0];
      const curTime = Date.now();
      createActivity(curTime, activity.center.latitude, activity.center.longitude, activity.name ?? "Unnamed Activity", user.id, user.bio)
      setLocationState(activity.name);
      setTimeState(curTime);
    }
  })

  return (
    <>
      <AddActivity location={ locationState } time={ timeState }></AddActivity>
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
      <div className = "bg-slate-400 h-screen w-screen flex justify-center items-center">

        <div className = "font-bold text-2xl text-white">Loading...</div>  
      </div> 
    )
  } 
  return mapData && userInfo ? 
  (<div>
    <img className='absolute z-50 top-0 right-0 m-8 size-16 rounded-full' src={userInfo.pfp}></img>
    <MapView mapData={mapData} style={{ width: '100vw', height: '100vh' }}><MyCustomComponent user={userInfo} /></MapView>
    </div>): null;
}

export default Home