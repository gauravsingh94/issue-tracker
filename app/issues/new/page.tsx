"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface issueType {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<issueType>();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Search the docs…" {...register("title")}>
          <TextField.Slot>
            <FaSearch height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewIssue;
