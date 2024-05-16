"use client"
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { FaSearch } from "react-icons/fa";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Search the docs…">
        <TextField.Slot>
          <FaSearch height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <SimpleMDE placeholder="Description..." />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssue;
