import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import "./index.scss";

export default function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-wrapper">
      <h1>Not Found</h1>
      <Button variant="contained" onClick={handleClick}>
        Back to prev
      </Button>
    </div>
  );
}
