import { FC } from "react";
import svgLoader from "../../assets/icons/loader.svg";
import "./Loader.css";

const Loader: FC = () => {
    return <img className="loader" src={svgLoader} alt="Loading"/>
}

export default Loader;