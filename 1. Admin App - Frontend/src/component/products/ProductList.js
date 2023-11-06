import styles from "./ProductList.module.css";

const ProductList = (props) => {
  const deleteProductHandle = (id) => {
    props.deleteProduct(id);
  };
  return (
    <div className={styles.containes}>
      <table className={"table " + styles.table}>
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">PRICE</th>
            <th scope="col">IMAGE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">EDIT</th>
          </tr>
        </thead>
        <tbody className={styles.row}>
          {props.items.map((data) => {
            return (
              <tr>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>
                  <img
                    className={styles.image}
                    src={data.img1}
                    alt={data.name}
                  ></img>
                </td>
                <td>{data.category}</td>
                <td className={styles["btn-containe"]}>
                  <button
                    onClick={() => deleteProductHandle(data._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    DELETE
                  </button>
                  <button type="button" className="btn btn-success">
                    UPDATE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
