import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupPending, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from '../../utils/toast-fxn';
import { clearGroup } from '../reducers/group.slice';


  export const signin = (user, history) => async (dispatch) => {
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('Signed In user is now: ', user.email);
       dispatch(fetchUserData(user.uid, "sigin", history));
    })
    .catch((error) => {
     
      var errorCode = error.code;
      var errorMessage = error.message;
      notifyErrorFxn(errorMessage);
      console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
      dispatch(loginFailed(errorMessage));
    });

};


export const signup = (user,history) => async (dispatch) => {
  console.log(user);
   dispatch(signupPending());
   console.log("Just before the sign up happens!!!!")
    fb.auth().createUserWithEmailAndPassword(
      user.email,
      user.password
  ).then((res)=>{
     db.collection('UserData').doc(res.user.uid).set({
      uid: res.user.uid,
      firstName: user.fName,
      lastName:user.lName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      registeredOn:new Date(),
      /*businessName:user.bName,
      companySize:user.companySize, 
      regType:user.regType, 
      country:user.country,
      certified:user.certified,
      state:user.state,
      industry:user.industry,
      city:user.city*/

    })
    

    dispatch(fetchUserData(res.user.uid, "sigin"));
  }).then(() => {
   
    history.push("/dashboard/home");
  }).catch((err) => {
    console.error("Error signing up: ", err);
    var errorMessage = err.message;
    dispatch(signupFailed({ errorMessage }));
  })
}


export const uploadImage = (user, file, history, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, history, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, history) => async (dispatch) => {
  var user = db.collection("UserData").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
     console.log("User Data is now!:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      
      //notifySuccessFxn("Logged In😊");
      history.push('/home', { replace: true });
    }
  } else {
     
      //notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const uploadProfileImage = (profileData, file, userID, history, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, history, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID, file, history, setLoading, url) => async (dispatch) => {
  // return  
  db.collection('employees').doc(userID).update({
    paymentLink: profileData.paymentLink,
    imageUrl: url,
  }).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(() => {
            setLoading(false);
            console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            history.push('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        history.push('/dashboard/home', { replace: true });
       }
     
  }).catch((err) => {
    setLoading(false);
    console.log("ERR-: ", err);
  })
}


export const logout = (history) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    history.push('/loginTest', { replace: true });
    console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}