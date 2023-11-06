import {} from "react";
export default function ValidateToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
  return <div></div>;
}
