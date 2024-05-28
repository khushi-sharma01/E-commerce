import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
export default function PlusMinusComponent(props) {
  const [value, setValue] = useState(props.qty);
  useEffect(function(){
    setValue(props.qty)
  },[props.qty],value)
  const handlePlus = () => {
    setValue((prev) => prev + 1);
    var v = value;
    v = v + 1;
    props.onChange(v);
  };
  const handleMinus = () => {
    setValue((prev) => prev - 1);
    var v = value;
    v = v - 1;
    props.onChange(v);
  };
  return (
    <div style={{ display: "flex",width: '100%'  }}>
      {value == 0 ? (
        <Stack direction="row" spacing={2}  style={{width:props.width}}  onClick={handlePlus}  >
           
          <Button
           
            variant="outlined"
            fullWidth
            size="small"
            style={{
                
              borderColor: "#0e1f45",
              color: '#0e1f45',
             
              height: 35,
            }}
            startIcon={<ShoppingCartOutlinedIcon />}
          >
            Add
          </Button>
        </Stack>
      ) : (
        <div
        style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-evenly",
            background:"#0e1f45",
            width:props.width,
            height: 36,
            borderRadius: 4,
          }}
        >
          <span
            onClick={handleMinus}
            style={{
              cursor: "pointer",
              color: "#fff",
              fontSize: 16,
              fontWeight: "bolder",
            }}
          >
            -
          </span>

          <span style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            {value}
          </span>
          <span
            onClick={handlePlus}
            style={{
              cursor: "pointer",
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            +
          </span>
        </div>
      )}
    </div>
  );
}
