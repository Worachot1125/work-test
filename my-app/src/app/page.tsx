import Link from "next/link";

export default function Home() {
  return (<div>
          <h1>Landing Page</h1>
          <p>Worachot Thonglert</p>
          <Link href = "/student">go to student</Link>
          </div>
        );
}

