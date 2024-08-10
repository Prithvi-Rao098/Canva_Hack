import {
  Button,
  ColorSelector,
  FormField,
  NumberInput,
  RadioGroup,
  Rows,
  Select,
  Slider,
  Text,
  TextInput,
  Title,
} from "@canva/app-ui-kit";
import { initAppElement, FontWeight, TextAttributes } from "@canva/design";
import { upload } from "@canva/asset";
import { useEffect, useState } from "react";
import styles from "styles/components.css";

type AppElementData = {
  text: string;
  color: string;
  fontWeight: FontWeight;
  fontStyle: TextAttributes["fontStyle"];
  decoration: TextAttributes["decoration"];
  textAlign: TextAttributes["textAlign"];
  width: number;
  rotation: number;
  useCustomWidth: boolean;
  gridSize: number;
  opacity: number;
  imageUrl: string;  // Property to store image URL
  spacing: number;   // Space between grid elements
  imageWidth: number; // Individual image width
  imageHeight: number; // Individual image height
};

type UIState = AppElementData;

const initialState: UIState = {
  text: "WATERMARK",
  color: "#706c6e",
  fontWeight: "normal",
  fontStyle: "normal",
  decoration: "none",
  textAlign: "center",
  width: 200,
  rotation: 45,
  useCustomWidth: false,
  gridSize: 3,
  opacity: 50,
  imageUrl: '',  // Initial empty string for image URL
  spacing: 100,    // Initial spacing between images
  imageWidth: 200, // Initial image width
  imageHeight: 200, // Initial image height
};

const appElementClient = initAppElement<AppElementData>({
  render: (data) => {
    const elements = [];
    const pageWidth = 800;
    const pageHeight = 600;
    const gridSize = data.gridSize;
    const spacing = data.spacing;
    const textWidth = (pageWidth - spacing * (gridSize + 1)) / gridSize;
    const textHeight = (pageHeight - spacing * (gridSize + 1)) / gridSize;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const top = row * (textHeight + spacing) + spacing;
        const left = col * (textWidth + spacing) + spacing;
        if (data.imageUrl) {
          elements.push({
            type: "IMAGE",
            top: top,
            left: left,
            width: data.imageWidth,
            height: data.imageHeight,
            ref: data.imageUrl,
            opacity: data.opacity / 100,
          });
        } else {
          elements.push({
            type: "TEXT",
            top: top,
            left: left,
            ...data,
            width: textWidth,
            height: textHeight,
            children: [data.text],
            opacity: data.opacity / 100,
          });
        }
      }
    }

    return elements;
  },
});

export const App = () => {
  const [state, setState] = useState<UIState>(initialState);

  const {
    text,
    color,
    fontWeight,
    fontStyle,
    decoration,
    textAlign,
    width,
    rotation,
    useCustomWidth,
    gridSize,
    opacity,
    imageUrl,
    spacing,
    imageWidth,
    imageHeight,
  } = state;

  const disabled = text.trim().length < 1 || color.trim().length < 1;

  async function imageUpload() {
    const result = await upload({
      type: "IMAGE",
      mimeType: "image/jpeg",
      url: "https://www.canva.dev/example-assets/image-import/image.jpg",
      thumbnailUrl:
        "https://www.canva.dev/example-assets/image-import/thumbnail.jpg",
    });

    setState(prevState => ({
      ...prevState,
      imageUrl: result.ref,  // Store the image reference in the state
    }));
  }

  useEffect(() => {
    appElementClient.registerOnElementChange((appElement) => {
      setState(appElement ? appElement.data : initialState);
    });
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>This app creates custom watermarks arranged in a grid across the page</Text>
        <FormField
          label="Text"
          value={text}
          control={(props) => (
            <TextInput
              {...props}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  text: value,
                }));
              }}
            />
          )}
        />

        <Title size="small">Customizing Options</Title>

        <FormField
          label="Color"
          control={() => (
            <ColorSelector
              color={color}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  color: value,
                }));
              }}
            />
          )}
        />
      
        <FormField
          label="Opacity"
          control={() => (
            <Slider
              value={opacity}
              min={0}
              max={100}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  opacity: value,
                }));
              }}
            />
          )}
        />

        <FormField
          label="Font style"
          value={fontStyle}
          control={(props) => (
            <Select<TextAttributes["fontStyle"]>
              {...props}
              options={[
                { value: "normal", label: "Normal" },
                { value: "italic", label: "Italic" },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  fontStyle: value,
                }));
              }}
              stretch
            />
          )}
        />

        <FormField
          label="Font weight"
          value={fontWeight}
          control={(props) => (
            <Select<FontWeight>
              {...props}
              options={[
                { value: "normal", label: "Normal" },
                { value: "thin", label: "Thin" },
                { value: "extralight", label: "Extra light" },
                { value: "light", label: "Light" },
                { value: "medium", label: "Medium" },
                { value: "semibold", label: "Semibold" },
                { value: "bold", label: "Bold" },
                { value: "heavy", label: "Heavy" },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  fontWeight: value,
                }));
              }}
              stretch
            />
          )}
        />

        <FormField
          label="Decoration"
          value={decoration}
          control={(props) => (
            <Select<TextAttributes["decoration"]>
              {...props}
              options={[
                { value: "none", label: "None" },
                { value: "underline", label: "Underline" },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  decoration: value,
                }));
              }}
              stretch
            />
          )}
        />

        <FormField
          label="Text align"
          value={textAlign}
          control={(props) => (
            <Select<TextAttributes["textAlign"]>
              {...props}
              options={[
                { value: "start", label: "Start" },
                { value: "center", label: "Center" },
                { value: "end", label: "End" },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  textAlign: value,
                }));
              }}
              stretch
            />
          )}
        />

        <FormField
          label="Width"
          value={useCustomWidth}
          control={(props) => (
            <RadioGroup
              {...props}
              options={[
                {
                  label: "Fit to content",
                  value: false,
                },
                {
                  label: "Use custom width",
                  value: true,
                },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  useCustomWidth: value,
                }));
              }}
            />
          )}
        />

        {useCustomWidth ? (
          <FormField
            label="Width"
            value={width}
            control={(props) => (
              <NumberInput
                {...props}
                min={1}
                onChange={(value) => {
                  setState((prevState) => ({
                    ...prevState,
                    width: Number(value || 1),
                  }));
                }}
              />
            )}
          />
        ) : undefined}

        <FormField
          label="Rotation"
          value={rotation}
          control={(props) => (
            <NumberInput
              {...props}
              min={-180}
              max={180}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  rotation: Number(value || 0),
                }));
              }}
            />
          )}
        />

        <FormField
          label="Grid Size"
          value={gridSize}
          control={(props) => (
            <Select<number>
              {...props}
              options={[
                { value: 3, label: "3x3" },
                { value: 4, label: "4x4" },
                { value: 5, label: "5x5" },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  gridSize: value,
                }));
              }}
              stretch
            />
          )}
        />

        <Title size="small">Add an Image Watermark</Title>
        
        <FormField
          label="Spacing"
          value={spacing}
          control={(props) => (
            <NumberInput
              {...props}
              min={0}
              max={50}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  spacing: Number(value || 0),
                }));
              }}
            />
          )}
        />
        <FormField
          label="Grid Size"
          value={gridSize}
          control={(props) => (
            <Select<number>
              {...props}
              options={[
                { value: 3, label: "3x3" },
                { value: 4, label: "4x4" },
                { value: 5, label: "5x5" },
              ]}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  gridSize: value,
                }));
              }}
              stretch
            />
          )}
        />
        <FormField
          label="Image Width"
          value={imageWidth}
          control={(props) => (
            <NumberInput
              {...props}
              min={50}
              max={400}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  imageWidth: Number(value || 50),
                }));
              }}
            />
          )}
        />
        <FormField
          label="Image Height"
          value={imageHeight}
          control={(props) => (
            <NumberInput
              {...props}
              min={50}
              max={400}
              onChange={(value) => {
                setState((prevState) => ({
                  ...prevState,
                  imageHeight: Number(value || 50),
                }));
              }}
            />
          )}
        />

        <Button
          onClick={imageUpload}
          //disabled={!imageUrl} // Disable if an image is already uploaded
          variant={"primary"}        >
          Upload and Add Image
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            appElementClient.addOrUpdateElement(state);
          }}
          disabled={disabled}
          stretch
        >
          Add or update watermark
        </Button>
      </Rows>
    </div>
  );
};