import Layoat from "./Layout";
import Welcome from "../components/Welcome";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layoat>
      <Welcome />
    </Layoat>
  );
};

export default Dashboard;
