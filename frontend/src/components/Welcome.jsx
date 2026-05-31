import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="text-4xl font-medium pb-4">DASHBOARD</h1>
      <h2 className="text-2xl font-medium">Welcome {user && user.name}</h2>
    </div>
  );
};

export default Welcome;
