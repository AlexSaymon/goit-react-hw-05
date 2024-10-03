import Navigation from "../Navigation/Navigation";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.wrapper}>
      <Navigation />
    </div>
  );
};

export default Header;
