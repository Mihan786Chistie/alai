import { Tldraw, createShapeId } from "tldraw";
import "tldraw/tldraw.css";

export default function TldrawComponent() {
  return (
    <div style={{ position: "fixed", width: "50vh", height: "50vh" }}>
      <Tldraw
        hideUi={true}
        onMount={(editor) => {
          const helloWorldShapeId = createShapeId();
          editor.createShape({
            id: helloWorldShapeId,
            type: "text",
            x: 200,
            y: 200,
            props: {
              text: "Hello world!",
            },
          });

          return () => {
            editor.deleteShape(helloWorldShapeId);
          };
        }}
      />
    </div>
  );
}
