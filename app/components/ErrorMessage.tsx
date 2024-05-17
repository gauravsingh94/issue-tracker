import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren, ReactNode } from "react";
const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <Text color="red" as="p">{children}</Text>;
};

export default ErrorMessage;
