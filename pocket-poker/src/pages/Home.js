import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useCallback, useEffect } from "react";
import { Fragment } from "react";

// const { unityProvider } = useUnityContext({
//     loaderUrl: "Build/poker-webgl.loader.js",
//     dataUrl: "Build/poker-webgl.data",
//     frameworkUrl: "Build/poker-webgl.framework.js",
//     codeUrl: "Build/poker-webgl.wasm",
//   });

  
export const Home = () => {
    const { unityProvider, addEventListener, removeEventListener } =
        useUnityContext({
            loaderUrl: "Build/poker-webgl.loader.js",
            dataUrl: "Build/poker-webgl.data",
            frameworkUrl: "Build/poker-webgl.framework.js",
            codeUrl: "Build/poker-webgl.wasm",
    });


    // Upload data to Supabase here
    // winner = 1 if player wins
    // winner = -1 if bot wins
    // winner = 0 if there is a tie
    const handleResults = (winner, prizePool, winningHandId, losingHandId) => {
        console.log(`From JS: ${winner}, ${prizePool}, ${winningHandId}, ${losingHandId}`);
    }
  
    useEffect(() => {
      addEventListener("handleResults", handleResults);
      return () => {
        removeEventListener("handleResults", handleResults);
      };
    }, [addEventListener, removeEventListener, handleResults]);
  
    return (
      <Fragment>
        <Unity
            style={{
                width: "80%",
                justifySelf: "center",
                alignSelf: "center",
            }}
            unityProvider={unityProvider}
        />
      </Fragment>
    );
}
export default Home;