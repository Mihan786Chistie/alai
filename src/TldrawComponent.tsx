import { Tldraw, createShapeId } from "@tldraw/tldraw";
import { TLShapeId } from "@tldraw/tldraw";
import { useRef, useState, useEffect } from "react";
import "tldraw/tldraw.css";

interface TldrawComponentProps {
  responseData: { heading: string; description: string }[];
  loading: boolean;
}

export default function TldrawComponent({ responseData, loading }: TldrawComponentProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [timelineKey, setTimelineKey] = useState(0);

  useEffect(() => {
    if (responseData.length > 0) {
      setTimelineKey(prevKey => prevKey + 1);
    }
  }, [responseData]);

  return (
    <div className="main-content">
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : responseData.length > 0 ? (
          <Tldraw
            key={timelineKey}
            hideUi={true}
            onMount={(editor) => {
              if (!editor || responseData.length === 0) return;

              const screenWidth = window.innerWidth;
              const screenHeight = window.innerHeight;
              const baseX = 100;
              const baseY = 100;
              const s = 100;
              const ids: TLShapeId[] = [];
              let q = 0;

              if (responseData.length === 1) {
                q = screenWidth / 2;
              } else {
                q = (screenWidth * 0.87) / (responseData.length - 1);
              }

              const timeline = createShapeId();
              editor.createShape({
                id: timeline,
                type: "arrow",
                x: baseX,
                y: baseY,
                props: {
                  start: { x: 0, y: baseY },
                  end: { x: screenWidth, y: baseY },
                  color: "black",
                  size: "m",
                  dash: "solid",
                  arrowheadStart: "none",
                  arrowheadEnd: "none",
                },
                isLocked: true,
              });
              ids.push(timeline);

              responseData.forEach((item, i) => {
                const head = createShapeId();
                editor.createShape({
                  id: head,
                  type: "text",
                  x: s + i * q,
                  y: i % 2 ? screenHeight * 0.35 : screenHeight * 0.02,
                  props: {
                    color: "black",
                    text: item.heading,
                    font: "sans",
                    w:400,
                    autoSize: false,
                  },
                });
                ids.push(head);

                const desc = createShapeId();
                editor.createShape({
                  id: desc,
                  type: "text",
                  x: s + i * q,
                  y: i % 2 ? screenHeight * 0.45 : screenHeight * 0.12,
                  props: {
                    color: "black",
                    text: item.description,
                    font: "sans",
                    size: "s",
                    w: 350,
                    autoSize: false,
                  },
                });
                ids.push(desc);

                const arrow = createShapeId();
                editor.createShape({
                  id: arrow,
                  type: "arrow",
                  x: baseX,
                  y: baseY,
                  props: {
                    start: { x: s + i * q, y: baseY },
                    end: { x: s + i * q, y: i % 2 ? baseY + 30 : baseY - 30 },
                    color: "black",
                    size: "m",
                    dash: "solid",
                    arrowheadStart: "dot",
                    arrowheadEnd: "none",
                  },
                  isLocked: true,
                });
                ids.push(arrow);
              });

              return () => {
                ids.forEach((id) => editor.deleteShape(id));
              };
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
