import Spinner from "./Spinner";

const SpinnerComponent: React.FC = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  );
};
export default SpinnerComponent;
