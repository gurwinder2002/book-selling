"use client";

import { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data: { message?: unknown } | null = await response
        .json()
        .catch(() => null);

      setSuccess(data?.message as string);
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>First Name:</h1>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <h1>Last Name:</h1>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <h1>Student ID:</h1>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        />
        <h1>Email:</h1>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <h1>Password:</h1>
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          >
            Register
          </button>
        </div>
        {error ? <p className="text-red-600">{error}</p> : null}
        {success ? <p className="text-green-600">{success}</p> : null}
      </form>
    </div>
  );
};

export default RegisterForm;
