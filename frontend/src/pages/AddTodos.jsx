import Layoat from "./Layout";
import FormAddTodos from "../components/FormAddTodos";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { useEffect } from "react";

const AddTodos = () => {
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
      <FormAddTodos />
    </Layoat>
  );
};

export default AddTodos;
