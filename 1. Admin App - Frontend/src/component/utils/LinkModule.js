const LinkModule = (props) => {
  if (props.link) {
    return (
      <a href={props.link} target="_blank">
        {props.children}
      </a>
    );
  }
};

export default LinkModule;
