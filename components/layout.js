import NavBar from "./NavBar";

export default function Layout({children}) {  // container 개념
  return (
    <div className="container">
      <NavBar />
      <div className='contents-divider'></div>
      <div className='main'>{children}</div>
      <style jsx>{`
        .container {
          background-color: #fff7e6;
        }
        .contents-divider {
          border-bottom: 2px solid black;
        }
        .main {
        }
      `}</style>
    </div>
  );
}