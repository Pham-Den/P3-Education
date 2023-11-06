import { useEffect, useState } from "react";
import styles from "../../page/RolingPage.module.scss";
import Button from "../utils/button/Button";
import useHttp from "../../hook/use-http";
import { getToken } from "../../utils/isAuthi";
import { userAPI } from "../../utils/API";
import Toast from "../../toast/Toast";

const RolingUserRow = (props) => {
  const [selectRole, setSelectRole] = useState("");

  const { isLoading, error, sendRequest } = useHttp();
  const updateRoleUserHandle = (id) => {
    const option = {
      url: userAPI.getAllModAPI + "/" + id,
      method: "PUT",
      body: { roleId: selectRole === "No-Role" ? "" : selectRole },
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getToken(),
      },
    };

    const messageHandle = (resData) => {
      ////

      Toast.message.success(resData.message, Toast.option);

      //update list
      props.onUpdateRole(id, selectRole === "No-Role" ? "" : selectRole);
    };

    sendRequest(option, messageHandle);
  };

  return (
    <tr>
      <th>{props.index + 1}</th>
      <td>{props.data.email}</td>
      <td>{props.data.roles && props.data.roles.name}</td>
      <td className={styles.gap}>
        <select
          defaultValue={props.data.roles ? props.data.roles.name : "No-Role"}
          value={selectRole}
          onChange={(e) => setSelectRole(e.target.value)}
        >
          <option>No-Role</option>
          {props.roleList &&
            props.roleList.length > 0 &&
            props.roleList.map((d) => {
              return <option value={d._id}>{d.name}</option>;
            })}
        </select>
        <Button
          action="add"
          onClick={() => updateRoleUserHandle(props.data._id)}
        >
          {props.data.roles
            ? isLoading
              ? "Sending..."
              : " Update"
            : isLoading
            ? "Sending..."
            : "Add"}
        </Button>
      </td>
      {Toast.container}
    </tr>
  );
};

export default RolingUserRow;
