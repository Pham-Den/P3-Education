import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

import { moduleAPI } from "../utils/API";
import LinkModule from "../component/utils/LinkModule";
import { useNavigate, useSearchParams } from "react-router-dom";

import Toast from "../toast/Toast";
import LoaderIcon from "react-loader-icon";
import useHttp from "../hook/use-http";

import styles from "./ModulePage.module.scss";
import Button from "../component/utils/button/Button";
import { getToken } from "../utils/isAuthi";

const ModulePage = () => {
  const [query, setQuery] = useSearchParams();
  const jwt_token = Cookies.get("jwt_token");
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [modulesFilter, setModulesFilter] = useState([]);

  const [searchInput, setSearchInput] = useState(query.get("search"));

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  /////////////////1.get Module/////////////
  //cb handle data
  const getData = (data) => {
    setModules(data);
    if (searchInput && data) {
      setModulesFilter(
        data.filter((d) =>
          d.module.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setModulesFilter(data);
    }
  };
  //chạy hook
  useEffect(() => {
    sendRequest(
      {
        url: moduleAPI,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      },
      getData
    );
  }, [sendRequest]);

  const searchChangeHandle = (e) => {
    setSearchInput(e.target.value);
    setQuery({ search: e.target.value });
  };
  //Lọc data
  useEffect(() => {
    if (modules.length > 0 && searchInput) {
      setModulesFilter(
        modules.filter((data) =>
          data.module.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setModulesFilter(modules);
    }
  }, [searchInput]);

  const addModuleHandle = () => {
    navigate("/module/add");
  };

  //delete module
  const deleteHandle = async (id) => {
    const isConfirm = window.confirm("Confirm!");
    if (isConfirm) {
      //cb update state
      const updateState = (dataRes) => {
        //tìm class delete
        const index = modules.findIndex((d) => d._id === id);

        let modulesListUpdate = modules;
        modulesListUpdate.splice(index, 1);

        setModules(modulesListUpdate);
        setModulesFilter(modulesListUpdate);

        if (error) {
          Toast.message.error(dataRes.message, Toast.option);
        }

        //thành công báo
        Toast.message.success(dataRes.message, Toast.option);
      };

      //hook delete
      sendRequest(
        {
          url: moduleAPI + "/" + id,
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
        updateState
      );
    }
  };

  //edit module
  const editeModuleHandle = (id) => {
    navigate("/module/add/" + id);
  };

  let content = <p>Please add data!</p>;

  if (modules.length > 0) {
    content = (
      <table
        className={
          styles.table + " table caption-top align-middle table-bordered"
        }
      >
        <thead>
          <tr className="align-middle table-dark">
            <th scope="col">Modules</th>
            <th scope="col">Topics</th>
            <th scope="col">WPS</th>
            <th scope="col">Flashcards</th>
            <th scope="col">Slides</th>
            <th scope="col">Audio</th>
            <th scope="col">Video</th>
            <th scope="col">Text</th>
            <th scope="col">Key</th>
            <th scope="col">Task1</th>
            <th scope="col">Task2</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Created By</th>
          </tr>
        </thead>
        <tbody>
          {modulesFilter.length > 0 &&
            modulesFilter.map((data) => {
              return (
                <tr key={data._id}>
                  <th>{data.module}</th>
                  <td>{data.topic}</td>

                  <td>
                    <LinkModule link={data.wps}>WPS</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.flashcards}>Flashcards</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.slides}>Slides</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.audio}>Audio</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.video}>Video</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.text}>Text</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.key}>Key</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.task1}>Task1</LinkModule>
                  </td>
                  <td>
                    <LinkModule link={data.task2}>Task2</LinkModule>
                  </td>
                  <td>
                    <Button
                      action="edit"
                      onClick={() => editeModuleHandle(data._id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      action="delete"
                      onClick={() => deleteHandle(data._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>{data.createdBy && data.createdBy.email}</td>
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
        <div className={styles.title}>MODULE CREATING</div>
        <div className={styles["action-container"]}>
          <input
            onChange={searchChangeHandle}
            value={searchInput}
            className={styles.search}
            placeholder="Tìm kiếm"
          ></input>
          <Button action="add" onClick={addModuleHandle}>
            Create
          </Button>
        </div>
      </div>
      <div className={styles["body-container"]}>
        {/* table */}
        <div className={styles["table-container"]}>
          {isLoading ? <LoaderIcon color={"red"} /> : content}
        </div>

        {Toast.container}
      </div>
    </div>
  );
};

export default ModulePage;
