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

export default function DisplayAllCategory() {
  var classes = useStyles();
  var navigate = useNavigate();

  const [error, setError] = useState({});
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tempPicture, setTempPicture] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };

  const handleCancel = () => {
    setPicture({ file: tempPicture, bytes: "" });
    setShowBtn(false);
  };
  const handleDelete = async (rowData) => {
    var body = { categoryid: rowData.categoryid };

    Swal.fire({
      title: "Do you want to Delete the category?",

      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData("category/delete_Category", body);
        if (result.status) {
          Swal.fire("Deleted!", "", "success");
          fetchAllCategory();
        } else Swal.fire("failed to delete record !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("your Category Data is safe", "", "info");
      }
    });
    fetchAllCategory();
  };
  const handleEditPicture = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("picture", picture.bytes);

    var result = await postData("category/update_category_picture", formData);
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
    fetchAllCategory();
  };

  const handleEditData = async () => {
    var submit = true;
    if (category.length == 0) {
      handleError("category", "write category name first");
      submit = false;
    }

    if (submit) {
      var body = { categoryid: categoryId, categoryname: category };
      var result = await postData("category/update_category_data", body);
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
      fetchAllCategory();
    }
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });

    setShowBtn(true);
  };
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    if (result.status) {
      setCategoryData(result.data);
    }
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (rowData) => {
    setOpen(true);
    setCategoryId(rowData.categoryid);
    setCategory(rowData.categoryname);
    setPicture({ file: `${serverURL}/images/${rowData.picture}` });
    setTempPicture(`${serverURL}/images/${rowData.picture}`);
  };
  const showCategoryForm = () => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <div className={classes.box}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <TextField
                  value={category}
                  error={error.category}
                  helperText={error.category}
                  onFocus={() => handleError("category", null)}
                  onChange={(event) => setCategory(event.target.value)}
                  label="Category name"
                  fullWidth
                  style={{ margin: 10 }}
                />
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
                      <Button variant="contained" component="label" fullWidth>
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
                  alt="Remy Sharp"
                  src={picture.file}
                  variant="rounded"
                  style={{ height: 80, width: 80 }}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit Data</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function showCategory() {
    return (
      <MaterialTable
        title="Main Category"
        columns={[
          { title: "Category ID", field: "categoryid" },
          { title: "Category Type", field: "categoryname" },
          {
            title: "Icon",
            field: "picture",
            render: (rowData) => (
              <img
                src={`${serverURL}/images/${rowData.picture}`}
                alt="Category Icon"
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ),
          },
        ]}
        data={categoryData}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Category",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Category",
            isFreeAction: true,
            onClick: (event) => navigate("/admindashboard/category"),
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

  return (
    <div className={classes.root}>
      <div className={classes.boxDisplay}>{showCategory()}</div>
      {showCategoryForm()}
    </div>
  );
}
