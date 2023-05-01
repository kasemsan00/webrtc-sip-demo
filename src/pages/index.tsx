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
import StatusConnection from "@/components/LeftPanel/StatusConnection";

export default function Home() {
  const dispatch = useAppDispatch();
  const [status, handleRegister, handleUnRegister] = UserAgentHandler();
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
          <div className="flex flex-col gap-2 w-full">
            <LocalVideo />
            <ProfileList />
            <ConnectSip status={status} handleRegister={handleRegister} handleUnRegister={handleUnRegister} />
            <StatusConnection />
            <CallOut />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <button className="btn btn-ghost" onClick={() => setIsSettingOpen(true)}>
              Setting
            </button>
          </div>
        </Sidebar>
        <MainView>
          <RemoteVideo />
        </MainView>
      </main>
      <Setting open={isSettingOpen} />
    </>
  );
}
