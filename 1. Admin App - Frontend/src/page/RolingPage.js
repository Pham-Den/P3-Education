import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LoaderIcon from "react-loader-icon";

import RolingPopup from "../component/roling/RolingPopup";
import Button from "../component/utils/button/Button";
import styles from "./RolingPage.module.scss";

import useHttp from "../hook/use-http";
import { roleAPI, userAPI } from "../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../store";
import { getToken } from "../utils/isAuthi";
import Toast from "../toast/Toast";
import RolingUserRow from "../component/roling/RolingUserRow";

const RolingPage = () => {
  const container = document.getElementById("popup-role");
  const isShowPopup = useSelector((state) => state.popup.isShow);
  const dispatch = useDispatch();

  const [roleList, setRoleList] = useState([]);
  const [modList, setModList] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const option = {
      url: roleAPI.getAllRole,
      headers: {
        authorization: "Bearer " + getToken(),
      },
    };

    //send api
    sendRequest(option, setRoleList);
  }, [sendRequest]);

  //edit handel
  const showPopupHandle = (data) => {
    //
    dispatch(popupActions.SHOW_POPUP(data));
  };

  //updateRoleHandle
  const updateRoleHandle = (data) => {
    Toast.message.success("Successfully!", Toast.option);

    let array = [...roleList];
    const index = array.findIndex((d) => d._id === data._id);

    if (index === -1) {
      array.push(data);
    } else {
      array[index] = data;
    }

    setRoleList(array);
  };

  ///////////deleteHandle ///////
  const {
    isLoading: isLoadingRemove,
    error: errorRemove,
    sendRequest: sendRequestRemove,
  } = useHttp();
  const deleteHandle = (data) => {
    const isConfirm = window.confirm(`Confirm delete role: ${data.name}!`);
    if (isConfirm) {
      const option = {
        url: roleAPI.getAllRole + "/" + data._id,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + getToken(),
        },
      };

      const messageHandle = (resData) => {
        Toast.message.success(resData.message, Toast.option);
        const array = [...roleList];
        const index = array.findIndex((d) => d._id === data._id);
        if (index !== -1) {
          array.splice(index, 1);
        }

        setRoleList(array);
      };

      sendRequestRemove(option, messageHandle);
    }
  };

  //////// get mod list //////////////
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();
  useEffect(() => {
    const option = {
      url: userAPI.getAllModAPI,
      headers: {
        authorization: "Bearer " + getToken(),
      },
    };

    sendRequestGet(option, setModList);
  }, [sendRequestGet]);

  /////////updateUserRoleHandle
  const updateUserRoleHandle = (idUser, role) => {
    let array = [...modList];
    let roleCurrent;
    const indexUser = array.findIndex((d) => d._id === idUser);

    if (indexUser !== -1) {
      if (!role) {
        array[indexUser].roles = "";
      } else {
        let arrayRole = [...roleList];
        const indexRole = arrayRole.findIndex((d) => d._id === role);
        if (indexRole !== -1) {
          roleCurrent = arrayRole[indexRole];
        }

        array[indexUser].roles = roleCurrent;
      }
    }
    setModList(array);
  };
  return (
    <>
      <div className={styles.containers}>
        <div className={styles["title-row"]}>
          <div className={styles.tilte}>Roling Page</div>
          <div>
            <Button action="add" onClick={() => showPopupHandle(null)}>
              Create
            </Button>
          </div>
        </div>
        <div className={styles["table-container"]}>
          <table className={"table table-bordered " + styles.table}>
            <thead>
              <tr className="table-dark">
                <th scope="col">STT</th>
                <th scope="col">Quyền hạn</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="3">
                    <LoaderIcon color={"red"} />
                  </td>
                </tr>
              )}
              {roleList.length > 0 &&
                roleList.map((data, index) => {
                  return (
                    <tr key={data._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.name}</td>
                      <td className={styles.gap}>
                        <Button
                          action="edit"
                          onClick={() => showPopupHandle(data)}
                        >
                          Edit
                        </Button>
                        <Button
                          action="delete"
                          onClick={() => deleteHandle(data)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {isShowPopup &&
        createPortal(
          <RolingPopup onUpdateRole={updateRoleHandle} />,
          container
        )}
      {Toast.container}
      <div className={styles.containers}>
        <div className={styles["title-row"]}>
          <div className={styles.tilte}>List Mod</div>
        </div>
        <div className={styles["table-container"]}>
          <table className={"table table-bordered " + styles.table}>
            <thead>
              <tr className="table-dark">
                <th scope="col">STT</th>
                <th scope="col">Email</th>
                <th scope="col">Quyền hạn</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingGet && (
                <tr>
                  <td colSpan="4">
                    <LoaderIcon color={"red"} />
                  </td>
                </tr>
              )}
              {!isLoadingGet && modList.length === 0 && (
                <tr>
                  <td colSpan="4">No Mod Found!</td>
                </tr>
              )}
              {modList.length > 0 &&
                modList.map((d, index) => {
                  return (
                    <RolingUserRow
                      key={d._id}
                      roleList={roleList}
                      data={d}
                      index={index}
                      onUpdateRole={updateUserRoleHandle}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RolingPage;
