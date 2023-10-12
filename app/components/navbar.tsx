import Link from 'next/link'

export default function Navbar() {
    return (
        <div>
            <Link href={"/"}>Home</Link>
            <Link href={"/competities"}>Competities</Link>
        </div>
    );
}
