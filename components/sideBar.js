import Link from 'next/link';

export default function SideBar() {
  return (
    <div style={{flex: 1, height: '100%', border: '1px solid grey', backgroundColor: 'white', flexDirection: "row"}}>
      <h1>Jae.Y</h1>
      <Link href="/about">
        <a>about</a>
      </Link>
      <Link href="/works">
        <a>works</a>
      </Link>
      <Link href="/contacts">
        <a>contacts</a>
      </Link>
    </div>
  );
}