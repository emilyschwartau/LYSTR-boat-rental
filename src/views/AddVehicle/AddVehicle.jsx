import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import VehicleInfo from "../../components/AddVehicleForm/VehicleInfo";
import VehicleAddress from "../../components/AddVehicleForm/VehicleAddress";
import VehicleFeatures from "../../components/AddVehicleForm/VehicleFeatures";
import VehiclePhotos from "../../components/AddVehicleForm/VehiclePhotos";
import VehicleAvailability from "../../components/AddVehicleForm/VehicleAvailability";

export default function AddVehicle() {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    dispatch({
      type: "ADD_VEHICLE_ONCHANGE",
      payload: { property: name, value: value },
    });
  };

  return (
    <>
      <VehicleInfo handleChange={handleChange} />
      <VehicleAddress handleChange={handleChange} />
      <VehicleFeatures />
      <VehiclePhotos />
      {/* <VehicleAvailability /> */}
    </>
  );
}
