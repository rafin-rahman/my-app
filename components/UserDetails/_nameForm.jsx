"use client";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string(),
});

export default function _nameForm({ textContent }) {
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const formRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: textContent,
    },
  });
  // When user clicks outside the form, hide the save button
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowSaveBtn(false);
        form.reset();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit()}
          ref={formRef}
        >
          <div className="mt-2">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={textContent}
                        type={"text"}
                        {...field}
                        onChange={(event) => {
                          setShowSaveBtn(true);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          {showSaveBtn ? (
            <div className={"flex justify-between"}>
              <Button
                variant={"outline"}
                type={"submit"}
                onClick={() => {
                  setShowSaveBtn(false);
                  // clear form
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type={"submit"}
                onClick={() => {
                  setShowSaveBtn(false);
                }}
              >
                Save
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </>
  );
}
