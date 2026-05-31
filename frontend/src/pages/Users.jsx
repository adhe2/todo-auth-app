import Layoat from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UsersList";

const Todos = () => {
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
      <UserList />
    </Layoat>
  );
};

export default Todos;
