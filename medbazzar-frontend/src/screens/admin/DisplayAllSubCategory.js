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
import {
  Button,
  Grid,
  TextField,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubCategory(props) {
  var classes = useStyles();
  var navigate = useNavigate();
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [tempPicture, setTempPicture] = useState("");
  const [picture, setPicture] = useState({
    file: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b84dd8103038865.5f446e8ad38fc.png",
    bytes: "",
  });

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    if (result.status) {
      setCategoryList(result.data);
    }
  };

  const fillAllCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);
  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  const handleCancel = () => {
    setPicture({ file: tempPicture, bytes: "" });
    setShowBtn(false);
  };
  const handleEditData = async () => {
    var submit = true;
    if (subCategory.length == 0) {
      var submit = false;
      handleError("subCategory", "please write sub-category name first");
    }
    if (category.length == 0) {
      var submit = false;
      handleError("category", "please write category name first");
    }

    if (submit) {
      var body = {
        categoryid: category,
        subcategoryname: subCategory,
        subcategoryid: subCategoryId,
      };
      var result = await postData("subcategory/update_subcategory_data", body);
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
      fetchAllSubCategory();
    }
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });

    setShowBtn(true);
  };
  const handleEditPicture = async () => {
    var formData = new FormData();
    formData.append("subcategoryid", subCategoryId);
    formData.append("picture", picture.bytes);

    var result = await postData("subcategory/update_subcategory_picture");
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
    fetchAllSubCategory();
  };
  const handleDelete = async (rowData) => {
    var body = { subcategoryid: rowData.subcategoryid };

    Swal.fire({
      title: "Do you want to Delete the sub category?",

      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData("subcategory/delete_subCategory", body);
        if (result.status) {
          Swal.fire("Deleted!", "", "success");
          fetchAllSubCategory();
        } else Swal.fire("failed to delete record !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("your sub Category Data is safe", "", "info");
      }
    });
    fetchAllSubCategory();
  };

  const fetchAllSubCategory = async () => {
    var result = await getData("subCategory/display_all_subcategory");
    if (result.status) {
      setSubCategoryData(result.data);
    }
  };
  useEffect(function () {
    fetchAllSubCategory();
  }, []);
  const handleOpen = (rowData) => {
    setOpen(true);
    setCategory(rowData.categoryid);
    setSubCategoryId(rowData.subcategoryid);
    setSubCategory(rowData.subcategoryname);
    setPicture({ file: `${serverURL}/images/${rowData.picture}` });
    setTempPicture(`${serverURL}/images/${rowData.picture}`);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function showSubCategoryForm() {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>Edit Sub Category</DialogTitle>
        <DialogContent>
          {" "}
          <div className={classes.box}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {fillAllCategory()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={subCategory}
                  error={error.subCategory}
                  helperText={error.subCategory}
                  onFocus={() => handleError("subCategory", null)}
                  onChange={(event) => setSubCategory(event.target.value)}
                  label="Sub-Category Name"
                  fullWidth
                  style={{ marginTop: 10, marginBottom: 15 }}
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
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  function showSubCategory() {
    return (
      <MaterialTable
        title="Main Category"
        columns={[
          { title: "Category ", field: "categoryname" },
          { title: "Sub-Category ID", field: "subcategoryid" },
          { title: "Sub-Category", field: "subcategoryname" },
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
        data={subCategoryData}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Sub Category",
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Sub Category",
            onClick: (event, rowData) => handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Sub Category",
            isFreeAction: true,
            onClick: (event) => navigate("/admindashboard/subcategory"),
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
      <div className={classes.boxDisplay}>{showSubCategory()}</div>
      {showSubCategoryForm()}
    </div>
  );
}
