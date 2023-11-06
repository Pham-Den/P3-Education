import { useState } from "react";
import { useParams } from "react-router";
import styles from "./CoursesPage.module.css";

const CoursesPage = (props) => {
  const [isShow, setIsShow] = useState(false);

  //lấy params (id course)
  const params = useParams();

  //show content course
  const showHandle = () => {
    setIsShow(!isShow);
  };

  //fetch api lấy course
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>Khoá học Speaking 1 gồm tổng 24 buổi</div>
        <div className={styles.items}>
          <div
            onClick={showHandle}
            className={styles.subtitle + " " + styles.statusdone}
          >
            <div>Buổi 1 (S1.1): Are you sure...?</div>
            <div>
              <button className={styles.done}>Status: Done</button>
            </div>
          </div>
          {isShow && (
            <>
              <div className={styles.content}>
                <a className={styles.contentitem} href="#">
                  Slide
                </a>
                <a className={styles.contentitem} href="#">
                  Scripts
                </a>
                <a className={styles.contentitem} href="#">
                  Key
                </a>
                <a className={styles.contentitem} href="#">
                  Audio
                </a>
                <a className={styles.contentitem} href="#">
                  Video
                </a>
                <a className={styles.contentitem} href="#">
                  Practice 1
                </a>
                <a className={styles.contentitem} href="#">
                  Practice 2
                </a>
              </div>
              <div className={styles.rowinput}>
                {/* <label htmlFor="files" className={styles.choosefile}>
                    Select Image
                  </label> */}
                <input
                  // style={{ visibility: "hidden" }}
                  id="files"
                  className={styles.files}
                  type="file"
                ></input>

                <button className={styles.btn}>Mask as Done</button>
              </div>
            </>
          )}
        </div>
        <div className={styles.items}>
          <div className={styles.subtitle}>
            <div>Buổi 2 (S1.2): Are you sure...?</div>
            <div>
              <button className={styles.notyet}>Status: Notyet</button>
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.subtitle}>
            <div>Buổi 3 (S1.3): Are you sure...?</div>
            <div>
              <button className={styles.notyet}>Status: Notyet</button>
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.subtitle}>
            <div>Buổi 4 (S1.4): Are you sure...?</div>
            <div>
              <button className={styles.notyet}>Status: Notyet</button>
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.subtitle}>
            <div>Buổi 5 (S1.5): Are you sure...?</div>
            <div>
              <button className={styles.notyet}>Status: Notyet</button>
            </div>
          </div>
        </div>
      </div>
      {/* <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Sessions</th>
                  <th scope="col">Modules</th>
                  <th scope="col">Topics</th>
                  <th scope="col">Slides</th>
                  <th scope="col">Scripts</th>
                  <th scope="col">Key</th>
                  <th scope="col">Audio</th>
                  <th scope="col">Video</th>
                  <th scope="col">Practice 1</th>
                  <th scope="col">Practice 2</th>
                  <th scope="col">Mask as Done</th>
                  <th scope="col">Status</th>

                </tr>
              </thead>
              <tbody>
              </tbody>
        </table> */}
    </div>
  );
};

export default CoursesPage;
