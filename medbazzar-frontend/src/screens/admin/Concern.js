import { useState } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { useStyles } from "./CategoriesCss";
import { Button, Grid, TextField,Avatar } from "@mui/material";
import { getData } from "../../services/FetchNodeServices";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Concern(props) {
  var classes = useStyles();
  

  const [concern,setConcern]=useState("");
  const [error,setError]=useState("");
  const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))

  }
  const [picture,setPicture]=useState ({file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
  bytes: "",
});
const handlePicture =(event)=>{
  setPicture({file:URL.createObjectURL(event.target.files[0]),
  bytes:event.target.files[0]})
}
const handleSubmit =async()=>
{var submit=true;
  if(submit){
    var formData=new FormData();
    formData.append("concernname",concern);
    formData.append("picture",picture.bytes)

    
    var result =await postData('concern/submit',formData);
    if(result.status){
      Swal.fire({
        icon: "Success",
        title: result.msg,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "Error",
        title: result.msg,
        timer: 1500,
      });
    

    }
  }

}
const handleReset =()=>{
  setConcern("")
  setPicture({file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
  bytes: "",})
}
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title={"ADD CONCERN"}
              logo="logo.png"
              listicon="checklist,png"
            ></TitleComponent>
          </Grid>

          <Grid xs={12}>
            <TextField label="Concern"
            fullWidth
            value={concern}
            error={concern.error}
            helperText={error.concern}
            onFocus={() => handleError("concern", null)}
            onChange={(event)=>{setConcern(event.target.value)}}
            style={{ margin: 10 }}
            ></TextField>
          </Grid>
          <Grid item  xs={6}>
            <Button fullWidth variant="contained" component="label">Upload
            <input
                onClick={() => handleError("picture", null)}
                onChange={handlePicture}
                type="file"
                hidden
                accept="images/*"
                multiple
              ></input></Button>
              {error.picture ? (
              <span
                style={{ fontFamily: "Kanit", color: "#d32f2f", fontSize: 13 }}
              >
                {error.picture}
              </span>
            ) : (
              <></>
            )}

          </Grid>
          <Grid item xs={6}>  <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />

          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained" fullWidth>
              RESET
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
