
import notificationService from '@/services/notificationService';
import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

 
const Notification = () => {
    const[notificationState,setNotificationState] = useState<any>({open : false});

    useEffect(() => {
        const subscription = notificationService.events$.subscribe(notification => setNotificationState(notification));

        return() => subscription.unsubscribe();
    });

  return (
    <Snackbar
    anchorOrigin={{vertical:'bottom', horizontal:'center'}}
        open={notificationState.open}
        onClose={() => notificationService.close()}
        message={notificationState.message}
        autoHideDuration={3000}
    />
  );
};

export default Notification;