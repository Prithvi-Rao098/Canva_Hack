import { upload } from "@canva/asset";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import styles from "styles/components.css";





export const App = () => {
  
  async function handleClick() {
    // Start uploading the media
    const result = await upload({
      type: "IMAGE",
      mimeType: "image/jpeg",
      url: "https://www.canva.dev/example-assets/image-import/image.jpg",
      thumbnailUrl:
        "https://www.canva.dev/example-assets/image-import/thumbnail.jpg",
    });

    // Get the reference for the upload
    console.log("The reference for the upload is:", result.ref);

    // Wait for the upload to complete
    await result.whenUploaded();
    console.log("The upload is complete.");
  }
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
        <button onClick={handleClick}>Upload image</button>
      </Rows>
    </div>
  );
};