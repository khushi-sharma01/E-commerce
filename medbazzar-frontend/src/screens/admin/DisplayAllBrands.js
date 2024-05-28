import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss";
import { useEffect, useState } from "react";
import { serverURL, getData, postData } from "../../services/FetchNodeServices";
import TitleComponent from "../../components/admin/TitleComponent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Swal from "sweetalert2";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function DisplayAllBrands() {
  var classes = useStyles();
  var navigate = useNavigate();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandData, setBrandData] = useState([]);
  const [tempPicture, setTempPicture] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const handleOpen = (rowData) => {
    setOpen(true);
    setBrandId(rowData.brandid);
    setBrand(rowData.brandname);
    setPicture({ file: `${serverURL}/images/${rowData.picture}` });
    setTempPicture(`${serverURL}/images/${rowData.picture}`);
    ShowBrandForm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });

    setShowBtn(true);
  };

  const handleEditData = async () => {
    var submit = true;
    if (brand.length == 0) {
      handleError("brand", "write brand name first");
      submit = false;
    }
    if (submit) {
      var body = { brandid: brandId, brandname: brand };
      var result = await postData("brand/update_brand_data", body);
      console.log("API Response:", result);

      if (result.status) {
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
      fetchAllBrand();
    }
  };

  const handleEditPicture = async () => {
    var formData = new FormData();
    formData.append("brandid", brandId);
    formData.append("picture", picture.bytes);
    var result = await postData("brand/update_brand_picture", formData);
    if (result.status) {
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
    fetchAllBrand();
  };

  const handleCancel = () => {
    setPicture({ file: tempPicture, bytes: "" });
    showBtn(false);
  };
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  const handleDelete = async (rowData) => {
    var body = { brandid: rowData.brandid };

    Swal.fire({
      title: "Do you want to Delete the Brand?",

      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData("brand/delete_brand", body);
        if (result.status) {
          Swal.fire("Deleted!", "", "success");
          fetchAllBrand();
        } else Swal.fire("failed to delete record !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("your brand Data is safe", "", "info");
      }
    });
    fetchAllBrand();
  };

  const fetchAllBrand = async () => {
    var result = await getData("brand/display_all_brand");

    if (result.status) {
      setBrandData(result.data);
    }
  };
  useEffect(function () {
    fetchAllBrand();
  }, []);

  function ShowBrand() {
    return (
      <MaterialTable
        title="Main Brands"
        columns={[
          { title: "Brand ID", field: "brandid" },
          { title: "Brand Type", field: "brandname" },
          {
            title: "Icon",
            field: "picture",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.picture}`}
                alt="Brand Icon"
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ),
          },
        ]}
        data={brandData}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Brand",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Brand",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Brands",
            isFreeAction: true,
            onClick: (event) => navigate("/admindashboard/brand"),
          },
        ]}
        options={
          {
            paging:true,
            pageSize:3,
            emptyRowsWhenPaging:false,
            pageSizeOptions:[3,5,7,9]
          }
        }
      />
    );
  }

  const ShowBrandForm = () => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>Edit Brand</DialogTitle>
        <DialogContent>
          <div className={classes.box}>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <TextField
                  value={brand}
                  error={error.brand}
                  helperText={error.brand}
                  onFocus={() => handleError("brand", null)}
                  onChange={(event) => setBrand(event.target.value)}
                  label="Brand Name"
                  fullWidth
                  style={{ marginTop: 15, marginBottom: 15 }}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                {showBtn ? (
                  <div
                    style={{
                      width: "100%",
                      height: 90,
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button variant="contained" onClick={handleEditPicture}>
                      Save
                    </Button>
                    <Button variant="contained" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        width: "100%",
                        height: 90,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="contained" component={"label"} fullWidth>
                        Set New Picture
                        <input
                          onClick={() => handleError("picture", null)}
                          onChange={handlePicture}
                          type="file"
                          hidden
                          accept="images/*"
                          multiple
                        ></input>
                      </Button>
                    </div>

                    {error.picture ? (
                      <span
                        style={{
                          fontFamily: "Kanit",
                          color: "#d32f2f",
                          fontSize: 13,
                        }}
                      >
                        {error.picture}
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Grid>

              <Grid item xs={6}>
                <Avatar
                  alt="Remy sharp"
                  src={picture.file}
                  variant="rounded"
                  style={{ height: 80, width: 80 }}
                ></Avatar>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit Data</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.boxDisplay}>{ShowBrand()}</div>
      {ShowBrandForm()}
    </div>
  );
}
