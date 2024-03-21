export const Page = ({ children }) => {
  return (
    <div className="Page">
      <div className="TopMargin"></div>
      <div className="SideMargin">{children}</div>
    </div>
  );
};
