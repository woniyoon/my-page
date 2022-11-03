import NavBar from "./NavBar.js";

export default function Layout({children}) {  // container 개념
  return (
    <div className="container">
      <NavBar />
      <div className='contents-divider'></div>
      <div className='main'>{children}</div>
      <style jsx>{`
        .container {
          background-color: #fff7e6;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .contents-divider {
          border-bottom: 2px solid black;
        }
        .main {
          display: flex;
          justify-content: center;
          flex: 1;
        }
      `}</style>
    </div>
  );
}