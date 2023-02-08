import NavBar from "./NavBar.js";

export default function Layout({children}) {  // container 개념
  const copyright = "ⓒ 2023. Jaewon all rights reserved.";

  return (
    <div className="container">
      <NavBar />
      <div className='contents-divider'></div>
      <div className='main'>{children}</div>
      <p className='copyrightTxt'>{copyright}</p>
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
        .copyrightTxt {
          margin: 0.8rem;
          font-size: 0.8rem;
          text-align: right;
        }
      `}</style>
    </div>
  );
}