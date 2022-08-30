/* eslint-disable jsx-a11y/alt-text */
import { toast } from "react-toastify";

export const MsgSuccess = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <b style={{ color: "#1F7D23", fontWeight: 400 }}>{message}</b>
      </div>
    </div>
  );
};

export const MsgFail = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <b style={{ color: "#FF0000", fontWeight: 400 }}>{message}</b>
      </div>
    </div>
  );
};

export const toastSuccess = (message) => {
  return toast.success(<MsgSuccess message={message} />, {
    autoClose: 5000,
  });
};

export const toastFail = (massage) => {
  return toast.error(<MsgFail message={massage} />, {
    autoClose: 5000,
  });
};
