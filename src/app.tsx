import {
  Box,
  Button,
  FormField,
  Grid,
  ImageCard,
  Rows,
  Select,
  Text,
  FileInput,
  TextInput,
} from "@canva/app-ui-kit";

import {
  addNativeElement,
  getCurrentPageContext,
  initAppElement,
} from "@canva/design";
import type { Placement } from "@canva/design";
import styles from "styles/components.css";

import cat from "assets/images/cat.jpg";
import dog from "assets/images/dog.jpg";
import rabbit from "assets/images/rabbit.jpg";
import { useCallback, useEffect, useState } from "react";
import baseStyles from "styles/components.css";
//import { upload } from "@canva/asset";
import { upload, AssetUploadOptions } from "@canva/asset";

// __________________________________________________  //

// Values to represent the user how they want to orient the water mark on the page
const enum ElementOrientation {      
  DEFAULT = "default",     // default is with repeated elements with no angle
  SINGLE_ELEMENT = "single_element",
  REPEATED_SLANTED_LEFT = "repeated_slanted_left",
  REPEATED_SLANTED_RIGHT = "repeated_slanted_right", 
}

// Adding state to store the uploaded image
const [uploadedImage, setUploadedImage] = useState(null);
const [watermarkText, setWatermarkText] = useState('');

const handleImageUpload = useCallback((event) => {
  const file = event.target.files[0]; // Ensure you're getting the file from the event
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        setUploadedImage(e.target.result as string); // Type assertion here
      }
    };
    reader.readAsDataURL(file);
  }
}, []);





// __________________________________________________  //
return (
  <div className={styles.scrollContainer}>
    <Rows spacing="2u">
      <Text>
        To make changes to this app, edit the <code>src/app.tsx</code> file,
        then close and reopen the app in the editor to preview the changes.
      </Text>
      <FileInput
        label="Upload Image"
        onChange={handleImageUpload}
        accept="image/*"
      />
    </Rows>
  </div>
);