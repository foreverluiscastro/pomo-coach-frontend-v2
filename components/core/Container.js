import { useAppContext } from "../providers/AppProvider";

export const Container = ({ children }) => {
  const { isStudy } = useAppContext();

  return (
    <div
      className={`Container ${isStudy ? "StudySecondary" : "BreakSecondary"}`}
    >
      {children}
    </div>
  );
};
