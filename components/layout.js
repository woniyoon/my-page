import NavBar from "./NavBar";

export default function Layout({children}) {  // container 개념
  return (
    <div className="container">
      <NavBar />
      <div className='contents-divider'></div>
      <div className='main'>{children}</div>
      <style jsx>{`
        .container {
        }
        .contents-divider {
          border-bottom: 2px solid black;
          height: 1px;
        }
        .main {
          flex: 9;
          height: 100%;
          padding: 2em;
        }
      `}</style>
    </div>
  );
}