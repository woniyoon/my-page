import SideBar from "./sidebar";

export default function Layout({children}) {  // container 개념
  return (
    <div style={{flexDirection: "row", display: "flex", height: "100vh"}}>
      <SideBar />
      <div style={{flex: 9}}>{children}</div>
    </div>
  );
}