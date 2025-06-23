import { FC } from "react";
import svgLoader from "../../assets/icons/loader.svg"

const Loader: FC = () => {
    return <img style={{width: "50px"}} src={svgLoader} alt="Loading"/>
}

export default Loader;