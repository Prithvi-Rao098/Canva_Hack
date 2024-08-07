import { Button, Rows, Text, FileInput, TextInput } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import { upload } from "@canva/asset";
import styles from "styles/components.css";
import { useState } from "react";

export const App = () => {

  const onClick = () => {
    addNativeElement({
      type: "TEXT",
      children: ["Hello world!"],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          To make changes to this app, edit the <code>src/app.tsx</code> file,
          then close and reopen the app in the editor to preview the changes.
        </Text>
        <Button variant="primary" onClick={onClick} stretch>
          Do something cool
        </Button>
      </Rows>
    </div>
  );
};