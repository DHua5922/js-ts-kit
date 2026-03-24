import "bootstrap/dist/css/bootstrap.min.css";

function Bootstrap({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export default Bootstrap;
