import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchSingleEvent,
  updateEvent,
} from "../../redux/eventSlice";

function EditEvent() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleEvent } = useSelector((state) => state.events);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(fetchSingleEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleEvent) {
      reset({
        title: singleEvent.title,
        description: singleEvent.description,
        category: singleEvent.category,
        date: singleEvent.date?.slice(0, 10),
        time: singleEvent.time,
        venue: singleEvent.venue,
      });
    }
  }, [singleEvent, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateEvent({ id, data })).unwrap();
      alert("Event updated successfully");
      navigate("/my-events");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit Event</h1>

      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />

      <textarea
        placeholder="Description"
        {...register("description", { required: true })}
      />

      <input
        type="text"
        placeholder="Category"
        {...register("category", { required: true })}
      />

      <input
        type="date"
        {...register("date", { required: true })}
      />

      <input
        type="time"
        {...register("time", { required: true })}
      />

      <input
        type="text"
        placeholder="Venue"
        {...register("venue", { required: true })}
      />

      <button type="submit">Update Event</button>
    </form>
  );
}

export default EditEvent;