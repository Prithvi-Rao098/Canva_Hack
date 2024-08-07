import {
  Button,
  FormField,
  Rows,
  Select,
  Text,
  TypographyCard,
} from "@canva/app-ui-kit";
import {
  addNativeElement,
  ui,
  FontWeight,
  TextAttributes,
} from "@canva/design";
import { useState } from "react";
import styles from "styles/components.css";

type DraggableTextProperties = {
  textAlign: TextAttributes["textAlign"];
  fontWeight: FontWeight;
  fontStyle: TextAttributes["fontStyle"];
  decoration: TextAttributes["decoration"];
};

const watermarkContent = "This is a watermark";

export const App = () => {
  const [{ fontStyle, fontWeight, decoration, textAlign }, setState] = useState<
    Required<DraggableTextProperties>
  >({
    decoration: "none",
    fontStyle: "normal",
    fontWeight: "light",
    textAlign: "center",
  });

  const addWatermark = () => {
    addNativeElement({
      type: "TEXT",
      children: [watermarkContent],
      fontWeight: fontWeight as FontWeight,
      fontStyle: fontStyle as TextAttributes["fontStyle"],
      decoration: decoration as TextAttributes["decoration"],
      textAlign: textAlign as TextAttributes["textAlign"],
      color: "#AAAAAA", // Subtle grey color for the watermark text
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="4u">
        <Text>
          Use the form below to customize the watermark and then add it to the canvas.
        </Text>
        <Rows spacing="1.5u">
          // FormFields remain the same
          <TypographyCard
            ariaLabel="Add text to design"
            onClick={addWatermark}
            onDragStart={addWatermark} // Enables dragging the watermark onto the canvas
          >
            <Text
              variant={
                ["semibold", "bold", "heavy"].includes(fontWeight)
                  ? "bold"
                  : "regular"
              }
            >
              {watermarkContent}
            </Text>
          </TypographyCard>
        </Rows>
      </Rows>
    </div>
  );
};