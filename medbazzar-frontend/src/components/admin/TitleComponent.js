import { useNavigate } from "react-router-dom";
export default function TitleComponent({ title, logo, listicon, page }) {
  var navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <img src={logo} />
        <div style={{ color: "#00008B", fontWeight: "bolder", fontSize: 16 }}>
          {title}
        </div>
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => navigate(page)}>
        <img src={listicon} width="30" />
      </div>
    </div>
  );
}
