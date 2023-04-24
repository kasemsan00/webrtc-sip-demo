import Head from "next/head";
import Sidebar from "@/components/Layout/Sidebar";
import MainView from "@/components/Layout/MainView";
import LocalVideo from "@/components/Video/LocalVideo";
import { useEffect, useState } from "react";
import RemoteVideo from "@/components/Video/RemoteVideo";
import ProfileList from "@/components/LeftPanel/ProfileList";
import CallOut from "@/components/LeftPanel/CallOut";
import UserAgentHandler from "@/hooks/UserAgentHandler";
import Setting from "@/components/Setting/Setting";
import { getExtension } from "@/request/request";
import { setProfile } from "@/redux/slices/profileDataSlice";
import { useAppDispatch } from "@/redux/store";
import ConnectSip from "@/components/LeftPanel/ConnectSip";

export default function Home() {
  const dispatch = useAppDispatch();
  const [userAgent, status, handleRegister, handleUnRegister] = UserAgentHandler();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(setProfile(await getExtension()));
    })();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>WebRTC Test</title>
        <meta name="description" content="WebRTC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="main">
        <Sidebar>
          <LocalVideo />
          <ProfileList />
          <ConnectSip status={status} handleRegister={handleRegister} handleUnRegister={handleUnRegister} />
          {/*<StatusConnection status={status} />*/}
          <CallOut />
          <button className="btn btn-ghost" onClick={() => setIsSettingOpen(true)}>
            Setting
          </button>
        </Sidebar>
        <MainView>
          <RemoteVideo />
        </MainView>
      </main>
      <Setting open={isSettingOpen} />
    </>
  );
}
