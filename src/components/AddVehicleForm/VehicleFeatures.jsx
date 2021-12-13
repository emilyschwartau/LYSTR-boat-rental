import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function VehicleFeatures({ handleChange }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_VEHICLE_TYPES" });
  }, [dispatch]);

  const { features, newVehicleInput } = useSelector((store) => store.vehicle);

  return;
}
