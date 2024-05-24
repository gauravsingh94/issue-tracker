import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueAction = () => {
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">Create Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueAction;
