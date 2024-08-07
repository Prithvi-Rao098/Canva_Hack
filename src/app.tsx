import { Button, Rows, Text, TextInput } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import styles from "styles/components.css";
import { useState } from "react";

export const App = () => {
  const [watermarkTexts, setWatermarkTexts] = useState<string[]>([]);

  // Handle text input change
  const handleTextChange = (event) => {
    setWatermarkTexts(prevTexts => [...prevTexts, event.target.value]);
  };

  // Add text watermarks to the canvas
  const addTextWatermarks = () => {
    if (watermarkTexts.length > 0) {
      watermarkTexts.forEach((text, index) => {
        addNativeElement({
          type: "TEXT",
          children: [text],
          fontSize: 24, // Adjust font size as needed
          color: "#000000",
          left: 100, // Adjust position as needed
          top: 100 + index * 50, // Adjust position for each watermark
          rotation: 45, // 45-degree angle
        });
      });
    } else {
      alert("Please enter text for the watermark.");
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          This app adds multiple text watermarks to the Canvas page, try it out.
        </Text>

        <TextInput 
          placeholder="Enter your watermark text here"
          onChange={handleTextChange}
        />

        <Button variant="primary" onClick={addTextWatermarks} stretch>
          Click to add Texts as your watermarks
        </Button>
      </Rows>
    </div>
  );
};