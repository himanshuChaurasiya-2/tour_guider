import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      if (response && response.data) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error :", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="App">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && <p>Name is required</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#^$!%*?&]{6,}$/,
                  message: "Password length >= 6, Demo : Abc#12",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;
