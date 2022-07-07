import { createContext, useState } from 'react';
import axios from 'axios';

export const NotificationsContext = createContext({notifications:[], requestNotifications:()=>{}}); //{notificationsCount: 0, setNotificationsCount: ()=>{}
const NotificationsContextProvider = (props)=>{
    const [notifications, setNotifications] = useState([]);
    const requestNotifications = async ()=>{
        try{
        let response = await axios.get(props.portalURL + 'api/notifications/', { headers: { Authorization: props.token.token, "Content-Type": "application/json" }});
        if(response && response.status === 200 && response.data && response.data.notifications) {
          setNotifications(response.data.notifications);
        }
      }catch(err) {
        console.log('NotificationsContextProvider.requestNotifications.catch:', err);
      }
      }
    return (<NotificationsContext.Provider value={{notifications, requestNotifications}}>
        {props.children}
    </NotificationsContext.Provider>);
}

export default NotificationsContextProvider;

