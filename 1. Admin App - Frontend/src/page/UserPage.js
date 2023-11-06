import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { userAPI } from "../utils/API";
import Toast from "../toast/Toast";
import LoaderIcon from "react-loader-icon";
import styles from "./UserPage.module.scss";
import useHttp from "../hook/use-http";
import Button from "../component/utils/button/Button";
import { getToken } from "../utils/isAuthi";

const UserPage = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [dataUserFilter, setDataUserFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    sendRequest: sendRequestDelete,
  } = useHttp();

  /////////////////1.get Module/////////////
  //chạy hook
  useEffect(() => {
    //option
    const option = {
      url: userAPI.adminUserApi,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    //cb handle data
    const getData = (data) => {
      setDataUser(data);
      setDataUserFilter(data);
    };
    sendRequest(option, getData);
  }, [sendRequest]);

  //filter
  useEffect(() => {
    if (searchInput) {
      setDataUserFilter(
        dataUser.filter((d) =>
          d.email.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setDataUserFilter([...dataUser]);
    }
  }, [searchInput, dataUser]);

  //new user
  const newUserHandle = () => {
    navigate("/user/add");
  };

  //delete user
  const deleteHandle = async (id) => {
    const isConfirm = window.confirm("Confirm!");
    if (isConfirm) {
      //cb update state
      const updateState = (dataRes) => {
        //tìm class delete
        const index = dataUser.findIndex((d) => d._id === id);

        let usersListUpdate = dataUser;
        usersListUpdate.splice(index, 1);

        setDataUser(usersListUpdate);

        if (error) {
          Toast.message.error(dataRes.message, Toast.option);
        }

        //thành công báo
        Toast.message.success(dataRes.message, Toast.option);
      };

      //hook delete
      sendRequestDelete(
        {
          url: userAPI.adminUserApi + "/" + id,
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
        updateState
      );
    }
  };

  //edit
  const editHandle = (id) => {
    navigate("/user/add/" + id);
  };

  let content = <p>Please add data!</p>;
  if (dataUser.length > 0) {
    content = (
      <table
        className={
          styles.table + " table caption-top align-middle table-bordered"
        }
      >
        <thead>
          <tr className="align-middle table-dark">
            <th scope="col">STT</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Password</th> */}
            <th scope="col">Role</th>
            <th scope="col">Courses</th>
            <th scope="col">Classes</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Created By</th>
          </tr>
        </thead>
        <tbody>
          {dataUserFilter.length > 0 &&
            dataUserFilter.map((data, index) => {
              return (
                <tr key={data._id}>
                  <th scope="row">{index + 1}</th>
                  <th>{data.email}</th>
                  {/* <td>{data.password}</td> */}
                  <td>{data.role}</td>
                  <td>
                    {data.courses.length > 0 &&
                      data.courses.map((d) => {
                        return d.code + " ";
                      })}
                  </td>
                  <td>
                    {data.classes.length > 0 &&
                      data.classes.map((d) => {
                        return d.code + " ";
                      })}
                  </td>
                  <td>
                    <Button action="edit" onClick={() => editHandle(data._id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      action="delete"
                      onClick={() => deleteHandle(data._id)}
                      disable={isLoadingDelete}
                    >
                      {isLoadingDelete ? "Sending..." : "Delete"}
                    </Button>
                  </td>
                  <td>{data.createdBy?.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }
  return (
    <div className={styles.containers}>
      <div className={styles["header-container"]}>
        <div className={styles.title}>USER CREATING</div>
        <div className={styles["action-container"]}>
          <input
            className={styles.search}
            placeholder="Tìm kiếm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.trim())}
          ></input>
          <Button action="add" onClick={newUserHandle}>
            Create
          </Button>
        </div>
      </div>

      {/* table */}
      <div className={styles["body-container"]}>
        <div className={styles["table-container"] + " table-responsive"}>
          {isLoading ? <LoaderIcon color={"red"} /> : content}
        </div>
        {Toast.container}
      </div>
    </div>
  );
};

export default UserPage;
