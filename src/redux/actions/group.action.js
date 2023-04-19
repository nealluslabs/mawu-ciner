import { db, fb, auth, storage } from '../../config/firebase';
import "firebase/firestore";
import firebase from "firebase/app";
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from '../../utils/toast-fxn';
import { isItLoading, playlistUpdate, saveAllGroup, saveEmployeer, saveGroupMembers, saveMyGroup, savePrivateGroup, savePublicGroup,storeMovieData,storeWatchListData } from '../reducers/group.slice';


export const createGroup = (groupData, user, file, navigate, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("movies").add({
    title: groupData.title,
    description: groupData.description,
    cast:groupData.cast,
    creatorId:groupData.creatorId,
    genre:groupData.genre,
    duration:groupData.duration,
    imageUrl: "none for now",
    adminApproved:false,
    videoUrl:url,
    watching: ["an array of ciner IDs"],
    shared: [{userId:"the preson that shared it",platform:"where they shared it"}],
    comments: [{userId:"the preson that commented",comment:"the comment made"}],
    releaseDate: groupData.releaseDate.toLocaleDateString("en-US", options),
    trending:[],
    featuredFilms:[],
    recommendations:[]
}).then(() => {
      
            notifySuccessFxn("movie added")
            /*setLoading(false);*/
            navigate('/dashboard/home', { replace: true });
        
    })
  .catch((err) => {
    console.error("Error adding movie: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    dispatch(isItLoading(false));
  })
}

export const fetchMovieData = (idArray) => async (dispatch) => {
  const movie = db.collection('movies').where('id', 'in', idArray);
  movie.get().then((snapshot) => {
    const movies = snapshot.docs.map((doc) => ({ ...doc.data() }));
    if (movies.length) {
    
  dispatch(storeMovieData(movies));  
  
    //window.alert(doc.data().url);
      



   /* .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })*/





  } else {
     
      //notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  window.alert(error);
  console.log("Error getting document:", error);
});
return movie;
};






export const fetchWatchListData = (idArray) => async (dispatch) => {
  
  /*idArray.forEach((item) => {*/
    const watchListItem = db.collection('movies').where('id', 'in', idArray);
  watchListItem.get().then((snapshot) => {
    const watching = snapshot.docs.map((doc) => ({ ...doc.data() }));

    if (watching.length){
    
 /*----->*/  dispatch(storeWatchListData(watching));  // <---- watchList issue is here ! storeWatchList data causes the problem
  
   // window.alert(doc.data().title);
      
  } else {
     
      //notifyErrorFxn("Unauthorized❌")
      console.log("No such movie!");
  }
}

  )

.catch((error) => {
  window.alert(error);
  console.log("Error getting document:", error);
});
  /*})*/

//return movie; this might be  the issue - IF U HAVE BUGS
};



export const addToUserPlaylist = (uid,movieId/*,setAdded*/) => async (dispatch) => {
  console.log('about to add title',movieId)
  db.collection("UserData").doc(uid).update({
  watchList:firebase.firestore.FieldValue.arrayUnion(movieId)
}).then((docRef) => {
  console.log("Document updated is: ", docRef);
  /*setAdded(true)*/
  dispatch(fetchWatchListData)
  dispatch(playlistUpdate(true));
})
.catch((error) => {
  console.error("Error adding adding movie to watch List: ", error);
  notifyErrorFxn("movie could not be added, please try again")
  
});
}


export const removeFromUserPlaylist =(uid,movieId/*,setAdded*/) => async (dispatch) => {
  console.log('about to remove movie id',movieId)
  db.collection("UserData").doc(uid).update({
    watchList:firebase.firestore.FieldValue.arrayRemove(movieId)
  }).then((docRef) => {
    console.log("Document updated is: ", docRef);
    /*setAdded(false)*/
    dispatch(fetchWatchListData)
    dispatch(playlistUpdate(false));
})
.catch((error) => {
    console.error("Error deleting movie from watchList: ", error);
    notifyErrorFxn("movie could not be removed, please try again")
});

}




export const uploadGroupImage = (groupData, file,navigate/*, user,setLoading*/) => async (dispatch) => {
   //I DISPATCH THE LOADING FIRST SO THAT WE CAN SEE OUR LOADING SCREEN
  dispatch(isItLoading(true));
 
  console.log('THESE ARE THE FILE DETAILS: ', file);
  const videoName = uuidv4() + '.' + file?.name.split('.')?.pop();
  
  console.log('File Name: ', videoName);
  const uploadTask = storage.ref(`creator_vids/${videoName}`).put(file);
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
        .ref(`creator_vids`)
        .child(videoName)
        .getDownloadURL()
        .then(url => {
          console.log('video URL: ', url);
          //dispatch(isItLoading(false));
          
          dispatch(createGroup(groupData,  file,/*user, setLoading,*/ navigate, url));
          dispatch(isItLoading(false));
          notifySuccessFxn("Video Uploaded Successfully!!")
        });
    }
  );
}

export const fetchMyGroups = (coolers) => async (dispatch) => {
  console.log("Clicked...");
  /*dispatch(isItLoading(true));*/
  if (coolers.length) {
    const chunkSize = 10;
    const chunks = coolers.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, coolers.slice(i, i + chunkSize)]), []);
    const promises = chunks.map((chunk) => {
      return db
        .collection("groups")
        .where("groupId", "in", chunk)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    Promise.all(promises)
      .then((results) => {
        const myGroups = results.flat();
        console.log("My Groups Data:", myGroups);
        dispatch(saveMyGroup(myGroups));
        dispatch(isItLoading(false));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(isItLoading(false));
      });
  } else {
    dispatch(saveMyGroup(coolers));
    dispatch(isItLoading(false));
  }
};


// export const fetchMyGroups = (coolers) => async (dispatch) => {
//   console.log("Cilcked...")
//   dispatch(isItLoading(true));
//     if(coolers.length){
//       db.collection("groups")
//       . where('groupId', 'in', coolers)
//        .get()
//        .then((snapshot) => {
//         const myGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
//         console.log("DATA::: ", myGroups);
//         // return
//       if (myGroups.length) {
//         dispatch(isItLoading(false));
//         console.log("My Groups Data:", myGroups);
//         dispatch(saveMyGroup(myGroups));
//       } else {
//           dispatch(isItLoading(false));
//       }
//      }).catch((error) => {
//        console.log("Error getting document:", error);
//        dispatch(isItLoading(false));
//      });
//     }else{
//       dispatch(saveMyGroup(coolers));
//       dispatch(isItLoading(false));
//     }
//  };


export const fetchGroups = (adminID) => async (dispatch) => {
 /* dispatch(isItLoading(true));*/
  db.collection("groups")
  .where('admin', '==', adminID)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllGroup(allGroups));
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAllGroup(allGroups));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


export const fetchPublicGroup = () => async (dispatch) => {
 /*dispatch(isItLoading(true));*/
 db.collection("groups")
  .where("status", "==", "public")
  .get()
  .then((snapshot) => {
    const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (publicGroups.length) {
    dispatch(isItLoading(false));
    console.log("Public Groups Data:", publicGroups);
    dispatch(savePublicGroup(publicGroups));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});
};

export const fetchPrivateGroup = () => async (dispatch) => {
    /*dispatch(isItLoading(true));*/
    db.collection("groups")
     .where("status", "==", "private")
     .get()
     .then((snapshot) => {
       const privateGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (privateGroups.length) {
       dispatch(isItLoading(false));
       console.log("Private Groups Data:", privateGroups);
       dispatch(savePrivateGroup(privateGroups));
     } else {
         dispatch(isItLoading(false));
         console.log("No private groups!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
   };


   export const joinGroup = (groupID, user, today, navigate, userWalletBal, groupFee, groupBal, groupName, accruedBalance) => async (dispatch) => {
    let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const date = today.toISOString();  

   
    let newUserBal = userWalletBal - groupFee;
    let newGroupBal = groupBal + groupFee;
    let newAccruedBal = accruedBalance + groupFee;
      // console.log("New Group Bal: ", newGroupBal);
    /*dispatch(isItLoading(true));*/
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    accountBalance: newGroupBal,
    members: [...newMembers],
  }).then((res) => {
    db.collection('employees')
    .doc(user.id)
    .update({
      walletBalance: newUserBal,
      accruedBalance: newAccruedBal,
      coolers: [...user?.coolers, groupID],
    })
   .then(() => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: "",
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: user.id,
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      }).then(() => {
        return db.collection('inbox')
          .add({
              id: user.id,
              msg: `You have joined ${groupName}`,
              coolerName: groupName,
              amount: groupFee,
              isViewed: false,
              unread: 0,
              time: date,
          })
      }).then(() => {
        return db.collection('transactions')
          .add({
              userID: user.id,
              coolerID: groupID,
              type: 'Payment',
              amount: groupFee,
              date: todaysDate,
              createdAt: today.toLocaleDateString("en-US", options),
          })
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    // window.location = '/dashboard/home';
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   }) 
   })
})
 };
//    export const joinGroup = (groupID, user, today, navigate, userBal, groupFee) => async (dispatch) => {
//     dispatch(isItLoading(true));
//     let newMembers;
//     var docRef = db.collection("groups").doc(groupID);
//     docRef.get().then((doc) => {
//     const data = doc.data();
//     const members = data.members;
//     newMembers = [...members, user.id];
// }).then(() => {
//   db.collection('groups')
//   var userRef = db.collection("groups").doc(groupID);
//   userRef.update({
//     members: [...newMembers],
//   }).then((res) => {
//     db.collection('employees')
//     .doc(user.id)
//     .update({
//       coolers: [...user?.coolers, groupID],
//     })
//    .then(() => {
//     db.collection('groups').doc(groupID).collection('membersCollection').add({
//       memberName: user.firstName + " " + user.lastName,
//       memberEmail: user.email,
//       memberImageUrl: "",
//       invitedBy: user.id,
//       invite: 0,
//       paid: 1,
//       users: user.id,
//       sentAt: today,
//     }).then((resp) => {
//       console.log("membersCollection RESPONSE: ", resp);
//       db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
//         id: resp.id,
//       })
//   }).then(() => {
//     dispatch(isItLoading(false));
//     notifySuccessFxn("Joined Group")
//     navigate('/dashboard/home', { replace: true });
//     }).catch((error) => {
//     console.log("Error joining group:", error);
//     var errorMessage = error.message;
//     notifyErrorFxn(errorMessage)
//     dispatch(isItLoading(false));
//   });
//    })
      
//    })
// })
//  };


export const joinPublicGroup = (groupID, user, today, navigate) => async (dispatch) => {
   /* dispatch(isItLoading(true));*/
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    members: [...newMembers],
  }).then((res) => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: user.imageUrl,
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: [user.id, user.id],
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   })
})
 };

 
export const joinPrivateGroup = (groupID, user, today, navigate) => async (dispatch) => {
  /*dispatch(isItLoading(true));*/
  let newMembers;
  var docRef = db.collection("groups").doc(groupID);
  docRef.get().then((doc) => {
  const data = doc.data();
  const members = data.members;
  newMembers = [...members, user.id];
}).then(() => {
db.collection('groups')
var userRef = db.collection("groups").doc(groupID);
userRef.update({
  members: [...newMembers],
}).then((res) => {
  db.collection('groups').doc(groupID).collection('membersCollection').add({
    memberName: user.firstName + " " + user.lastName,
    memberEmail: user.email,
    memberImageUrl: user.imageUrl,
    invitedBy: user.id,
    invite: 0,
    paid: 1,
    users: [user.id, user.id],
    sentAt: today,
  }).then((resp) => {
    console.log("membersCollection RESPONSE: ", resp);
    db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
      id: resp.id,
    })
}).then(() => {
  dispatch(isItLoading(false));
  notifySuccessFxn("Joined Group")
  navigate('/dashboard/home', { replace: true });
  }).catch((error) => {
  console.log("Error joining group:", error);
  var errorMessage = error.message;
  notifyErrorFxn(errorMessage)
  dispatch(isItLoading(false));
});
 })
})
};


export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  /*dispatch(isItLoading(true));*/
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

export const fetchEmployeer = (id) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    dispatch(saveEmployeer(doc.data()));
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};