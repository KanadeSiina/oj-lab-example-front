import * as React from 'react';
import { Container } from '@mui/material';
import { Unity, useUnityContext } from "react-unity-webgl";

export default function DashboardPage() {

  const { unityProvider } = useUnityContext({
    loaderUrl: "/game/build/kart.loader.js",
    dataUrl: "/game/build/kart.data.unityweb",
    frameworkUrl: "/game/build/kart.framework.js.unityweb",
    codeUrl: "/game/build/kart.wasm.unityweb",
  });

  return (
    <Container  maxWidth='false' sx={{ mt: 4, mb: 4 }}>
      <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
    </Container>
  );
}