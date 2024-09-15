import React, { act, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getUserById } from '../services/userService';
import MappedIn, { MapView, useMapData, useMap, Label, useEvent, Marker, Navigation } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { createActivity, getActivityById } from '../services/activityService';
import AddActivity from '../components/AddActivity';
import { DocumentData } from 'firebase/firestore';

interface Props {
  user:any
}

function MyCustomComponent( { user }: Props) {
  const { mapView, mapData } = useMap();
  const [locationState, setLocationState] = useState("");
  const [timeState, setTimeState] = useState(0);
  const [myLabels, setMyLabels] = useState<DocumentData[]>([]);
  const [dest, setDest] = useState<MappedIn.Coordinate>();
  const [myLocation, setMyLocation] = useState<MappedIn.Coordinate>();
  const [directions, setDirections] = useState<MappedIn.Directions>();

  const destination = (myLocation && dest) ? mapView.getDirections(myLocation, dest) : undefined

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = new MappedIn.Coordinate(position.coords.latitude, position.coords.longitude);
        setMyLocation(coords);
      });
    }

    mapData.getByType('space').forEach(space => {
      mapView.updateState(space, {
          interactive: true,
          hoverColor: "#98FB98"
      });
    });
    
    const loadActivities = async () => {
      const labels: DocumentData[] = []

      for (const friend of user.friends) {
        const friendInfo = await getUserById(friend);
        if (friendInfo) {
          const activities = friendInfo.activities
          for (let i = 0; i < activities.length; i++) {
            const activityInfo = await getActivityById(activities[i]);
            if (activityInfo) {
              const coords = new MappedIn.Coordinate(activityInfo.latitude, activityInfo.longitude);
              labels.push(activityInfo);
            }
          }
        }
      }
      setMyLabels(labels);
    }

    loadActivities();
  }, [])

  useEvent("click", (event) => {
    if (!event.labels.length) {
      setDest(undefined);
    }
    if (event.spaces[0]) {
      let activity = event.spaces[0];
      const curTime = Date.now();
      createActivity(curTime, activity.center.latitude, activity.center.longitude, activity.name ?? "Unnamed Activity", user.id, user.name, user.pfp, user.bio)
      setLocationState(activity.name);
      setTimeState(curTime);
    }
  })

  return (
    <>
      <AddActivity location={ locationState } time={ timeState }></AddActivity>
      {mapData.getByType("space").map((space) => {
        return space.name ? (<Label key={space.center.latitude} target={space.center} text={space.name} />) : null;
      })}
      {myLabels.length > 0 && myLabels.map((activity) => {
        const coords = new MappedIn.Coordinate(activity.latitude, activity.longitude);
        const handeClick = () => {
          setDest(coords)
        }
        return <Marker key={activity.id} target={coords} options={{rank: "always-visible"}}>
          <img src={activity.pfp} onClick={handeClick} className='rounded-full size-10 cursor-pointer hover:scale-110' />
        </Marker>
      })}
      {myLocation && <Marker key={user.id} target={myLocation} options={{rank: "always-visible"}} >
        <img src={user.pfp} className='rounded-full size-10' />
      </Marker>}
      {destination && <Navigation directions={destination} />}
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