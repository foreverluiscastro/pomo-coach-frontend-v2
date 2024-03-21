export const Modal = ({ children }) => {
  return (
    <div className="ModalBackground">
      <div className="Modal">{children}</div>
    </div>
  );
};
