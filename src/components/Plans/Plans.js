import React, {
  useEffect,
  useState,
} from "react";
import { db } from "../../firebase";
import "./Plans.css";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../Button/Button";

function Plans() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] =
    useState(null);
  const user = useSelector(selectUser);

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
          console.log(subscription.data());

          setSubscription({
            role: subscription.data().role,
            current_period_start:
              subscription.data()
                .current_period_start.seconds,
            current_period_end:
              subscription.data()
                .current_period_end.seconds,
          });
        }
      );
    });
  }, [user.uid]);

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("active", "==", true)
    );

    onSnapshot(q, (querySnapshot) => {
      const products = {};

      querySnapshot.forEach(
        async (productDoc) => {
          products[productDoc.id] =
            productDoc.data();

          const productDocRef = doc(
            db,
            "products",
            productDoc.id
          );

          const priceSnap = await getDocs(
            collection(productDocRef, "prices")
          );

          priceSnap.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        }
      );
      setProducts(products);
    });
  }, []);

  const userRef = collection(
    db,
    "customers",
    user.uid,
    "checkout_sessions"
  );

  const loadCheckOut = async (priceId) => {
    const docRef = await addDoc(userRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(
          `An error occured: ${error.message}`
        );
      } else if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MlfZNFNzS4b45VAvdWLtOfdPiHRvMaIEFyYPP0BbjXkn9fRXAVOOEYB6o83rh7cPeeHmitaNlMVvDipkVAp9Rxv00gJQ0s8Dp"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans">
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end *
              1000
          ).toLocaleString("default", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      )}
      {Object.entries(products).map(
        ([productId, productData]) => {
          const isCurrentPackage =
            productData.name?.includes(
              subscription?.role
            );

          return (
            <div
              key={productId}
              className={`${
                isCurrentPackage &&
                "plansPlanDisabled"
              } plansPlan`}>
              <div className="plansInfo">
                <h2>{productData.name}</h2>
                <h3>{productData.description}</h3>
              </div>
              <Button
                onClick={() =>
                  !isCurrentPackage &&
                  loadCheckOut(
                    productData.prices.priceId
                  )
                }>
                {isCurrentPackage
                  ? "Current Plan"
                  : "Subscribe"}
              </Button>
            </div>
          );
        }
      )}
    </div>
  );
}

export default Plans;
