import { useState } from "react";
import axios from "axios";



const PreferenceForm = ({ setRecommendations }) => {

  const [formData, setFormData] =
    useState({
      budget: "",
      fuel: "",
      seating: ""
    });

 const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:5000/api/recommend",
            formData
        );

        console.log(response.data);

        setRecommendations(
            response.data.recommendations
        );

    } catch (error) {
        console.error(error);
    }
};

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded-xl shadow"
    >

      <input
        placeholder="Budget"
        className="border p-2 w-full mb-3"
        onChange={e =>
          setFormData({
            ...formData,
            budget: e.target.value
          })
        }
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={e =>
          setFormData({
            ...formData,
            fuel: e.target.value
          })
        }
      >
        <option value="">
          Select Fuel
        </option>
        <option>Petrol</option>
        <option>Diesel</option>
        <option>Hybrid</option>
      </select>

      <input
        placeholder="Seats"
        className="border p-2 w-full mb-3"
        onChange={e =>
          setFormData({
            ...formData,
            seating: e.target.value
          })
        }
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Get Recommendations
      </button>

    </form>
  );
}

export default PreferenceForm