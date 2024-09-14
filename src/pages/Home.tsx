import React, { act, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getUserById } from '../services/userService';
import MappedIn, { MapView, useMapData, useMap, Label, useEvent, Path } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { createActivity, getActivityById } from '../services/activityService';
import AddActivity from '../components/AddActivity';
import { DocumentData } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import IconButton from '../components/IconButton';
import Core from '@mappedin/react-sdk/geojson/src/renderer';
import Mappedin from '@mappedin/react-sdk';

interface Props {
  user:any
}

interface friendActivity {
  coords: MappedIn.Coordinate;
  data: DocumentData;
  name: string
}

interface coord {
  latitude: number;
  longitude: number;
}
 
function MyCustomComponent( { user }: Props) {
  const { mapView, mapData } = useMap();
  const [locationState, setLocationState] = useState("");
  const [userLocation, setUserLocation] = useState<coord>({ latitude:0, longitude:0 });
  const [timeState, setTimeState] = useState(0);
  const [myLabels, setMyLabels] = useState<friendActivity[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    mapData.getByType('space').forEach(space => {
      mapView.updateState(space, {
          interactive: true,
          hoverColor: "#98FB98"
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation(position.coords);
      });
    }

    
    const loadActivities = async () => {
      const labels: friendActivity[] = []

      for (const friend of user.friends) {
        const friendInfo = await getUserById(friend);
        if (friendInfo) {
          const activities = friendInfo.activities
          for (let i = 0; i < activities.length; i++) {
            const activityInfo = await getActivityById(activities[i]);
            if (activityInfo) {
              const coords = new MappedIn.Coordinate(activityInfo.latitude, activityInfo.longitude);
              labels.push({ coords:coords, data:activityInfo, name:friendInfo.name });
            }
          }
        }
      }
      console.log(labels);
      setMyLabels(labels);
    }

    loadActivities();
  }, [])

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
      {!openSidebar && <div className="cursor-pointer left-0 top-0 ml-[30px] float-left absolute mt-[20px] h-[30px] w-[30px] inline-block z-3">
          <IconButton onClick={() => setOpenSidebar(true)} name="" icon="/menu.png"/>
      </div>}
      <Sidebar handleClose={() => setOpenSidebar(false)} isOpen={openSidebar}/>   
 
      <AddActivity location={ locationState } time={ timeState }></AddActivity>
      {/* {mapData.getByType("space").map((space) => {
        return <Label key={space.center.latitude} target={space.center} text={space.name} />;
      })} */}
      {myLabels.length > 0 && myLabels.map((activity: friendActivity) => {
        const userPosition = new MappedIn.Coordinate(userLocation.latitude, userLocation.longitude) ?? activity.coords;
        const directions = mapView.getDirections(userPosition, activity.coords);
        return directions && <Path coordinate={directions.coordinates} />
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