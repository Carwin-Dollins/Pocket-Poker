import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export const Home = () => {
    const { unityProvider } = useUnityContext({
      loaderUrl: "Build/poker-webgl.loader.js",
      dataUrl: "Build/poker-webgl.data",
      frameworkUrl: "Build/poker-webgl.framework.js",
      codeUrl: "Build/poker-webgl.wasm",
    });

    return (
        <div>
            <Unity 
                style={{
                    width: "80%",
                    justifySelf: "center",
                    alignSelf: "center",
                }}
                unityProvider = {unityProvider}
            />
        </div>
    )
}
export default Home;