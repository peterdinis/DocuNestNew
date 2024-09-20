import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const DocToolbar: FC = () => {
    return (
        <div className="ml-8 mt-6 flex justify-center align-top">
            <Button variant={"default"}>
                <Link href="/dashboard">Go back</Link>
            </Button>
            <Button variant={"default"}>
                <Link href="/dashboard">Go back</Link>
            </Button>
            <Button variant={"default"}>
                <Link href="/dashboard">Go back</Link>
            </Button>
            <Button variant={"default"}>
                <Link href="/dashboard">Go back</Link>
            </Button>
        </div>
    )
}

export default DocToolbar;