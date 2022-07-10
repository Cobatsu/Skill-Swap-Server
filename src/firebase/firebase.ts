import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth' 

initializeApp({
    projectId: "skill-swap-387da",
    storageBucket: "skill-swap-387da.appspot.com",
});


export  {
    getAuth
}

