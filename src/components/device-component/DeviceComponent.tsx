import useMediaQuery from "../../hooks/useMediaQuery";
import { useState, useEffect, ReactNode } from "react";

interface DevicePropsInterface {
    deviceType: string;
    deviceWidth: number;
    deviceHeight: number;
    scaleDesktop: number;
    scaleTablet: number;
    scaleMobile: number;
    mobileBreakPoint: number;
    tabletBreakPoint: number;
    desktopBreakPoint: number;
    children: ReactNode;
}

const DeviceComponent = (props:DevicePropsInterface) => {

    const [getScale, setScale] = useState(props.mobileBreakPoint);
    const [getWidth, setWidth] = useState(props.mobileBreakPoint);

    useEffect(() => {

        if(Mobile) {
            setScale(props.scaleMobile);
        }

        if(Tablet) {
            setScale(props.scaleTablet);
        }
    
        if(Desktop) {
            setScale(props.scaleDesktop);
        }

        if(typeof window !== 'undefined') {
            setWidth(window.innerWidth);
        }
        
    }, [setScale, getScale, setWidth, getWidth]);

    const Mobile = useMediaQuery(`(max-width: ${props.mobileBreakPoint}px)`);
    const Tablet = useMediaQuery(`(max-width: ${props.tabletBreakPoint}px)`);
    const Desktop = useMediaQuery(`(min-width: ${props.desktopBreakPoint}px)`);
    const ContainerHeight = props.deviceType == "desktop" ? (props.deviceHeight * getScale) + 125 + "px" : props.deviceHeight * getScale + "px";

    return (
        <div className="device-container" style={{height: ContainerHeight}}>
            <div className={"device-wrapper " + props.deviceType } style={{minWidth: props.deviceWidth, height: props.deviceHeight, scale: getScale}}>
                <div className="top-bar">
                    <span className="speaker"></span>
                </div>
                <div className="device-viewport" style={{minHeight: props.deviceHeight - 160}}>
                    {props.children}
                </div>
                <div className="bottom-bar">
                    <div className="button"></div>
                </div>
                {props.deviceType && 
                    <div className="monitor-stand">
                        <div className="monitor-bottom"></div>
                    </div>
                }
            </div>
        </div>
    );
}

export default DeviceComponent;