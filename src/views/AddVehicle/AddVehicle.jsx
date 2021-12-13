import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import VehicleInfo from "../../components/AddVehicleForm/VehicleInfo";
import VehicleAddress from "../../components/AddVehicleForm/VehicleAddress";
import VehicleFeatures from "../../components/AddVehicleForm/VehicleFeatures";
import VehiclePhotos from "../../components/AddVehicleForm/VehiclePhotos";
import VehicleAvailability from "../../components/AddVehicleForm/VehicleAvailability";

export default function AddVehicle() {
  return (
    <>
      <VehicleInfo />
      {/* <VehicleAddress />
      <VehicleFeatures />
      <VehiclePhotos />
      <VehicleAvailability /> */}
    </>
  );
}
