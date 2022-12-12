import React, { useContext } from "react";
import { LoadingContext } from "../../App";
import './loader.css'
const Loader = () => {
    const {loading}=useContext(LoadingContext)
    return loading?(
        <div className="spinner-box">
            <div className="configure-border-1">
                <div className="configure-core"></div>
            </div>
            <div className="configure-border-2">
                <div className="configure-core">
                </div>
            </div>
        </div>
    ):null
}

export default Loader;