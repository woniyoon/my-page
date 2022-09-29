import SideBar from "./SideBar";

export default function Layout({children}) {  // container 개념
  return (
    <div className="container">
      <SideBar />
      <div className='contents-divider'></div>
      <div className='main'>{children}</div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          height: 100vh;
          align-items: center;
        }
        .contents-divider {
          border-left: 3px solid black;
          height: 95vh;
        }
        .main {
          flex: 9;
          padding: 3em;
        }
      `}</style>
    </div>
  );
}