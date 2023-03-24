import React, {
  useEffect,
  useState,
} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import avatar from "../../assets/Avatar.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { auth, db } from "../../firebase";
import Plans from "../../components/Plans/Plans";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
function Profile() {
  const user = useSelector(selectUser);
  const [subscription, setSubscription] =
    useState(null);

  useEffect(() => {
    const q = query(
      collection(
        db,
        "customers",
        user.uid,
        "subscriptions"
      )
    );

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(
        async (subscription) => {
          setSubscription(
            subscription.data().role
          );
        }
      );
    });
  }, [user.uid]);
  return (
    <div className="profile">
      <Header />

      <div className="profileBody">
        <h1>Edit Profile</h1>
        <div className="profileInfo">
          <img src={avatar} alt="ava" />
          <div className="profileDetails">
            <h2>{user.email}</h2>
            <div className="profilePlans">
              <h3>
                Plans{" "}
                {subscription ? (
                  <span>
                    {`(Current Plan: ${subscription})`}
                  </span>
                ) : (
                  ""
                )}
              </h3>

              <Plans />
              <Button
                className="profileSignOut"
                onClick={() => auth.signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
