"use client";

import {useMemo, useRef, useState} from "react";
import {
  ArrayOfObjectsInput,
  Card,
  Flex,
  Stack,
  Text,
  set,
  useFormValue,
} from "sanity";

type GridBlock = {
  _key: string;
  _type: string;
  title?: string;
  content?: string;
  caption?: string;
  columnStart?: number;
  columnSpan?: number;
  rowStart?: number;
  rowSpan?: number;
};

type ProjectGridInputProps = React.ComponentProps<typeof ArrayOfObjectsInput>;

type DragState = {
  key: string;
  mode: "move" | "resize";
  startX: number;
  startY: number;
  startColumn: number;
  startRow: number;
  startColumnSpan: number;
  startRowSpan: number;
};

function isGridBlockArray(value: unknown): value is GridBlock[] {
  return Array.isArray(value);
}

function getDefaultColumnSpan(block: GridBlock, columns: number) {
  if (block._type === "textBlock") {
    return Math.min(6, columns);
  }

  return Math.min(8, columns);
}

function getDefaultRowSpan(block: GridBlock) {
  if (block._type === "textBlock") {
    return 3;
  }

  if (block._type === "videoBlock") {
    return 6;
  }

  return 5;
}

function getBlockLabel(block: GridBlock) {
  if (block._type === "textBlock") {
    return block.content?.slice(0, 40) || "Text block";
  }

  if (block._type === "videoBlock") {
    return block.caption || "Video block";
  }

  return block.caption || block.title || "Image block";
}

function normalizeBlocks(blocks: GridBlock[], columns: number) {
  return blocks.map((block, index) => {
    const columnSpan = Math.min(block.columnSpan ?? getDefaultColumnSpan(block, columns), columns);
    const columnStart = Math.min(Math.max(block.columnStart ?? 1, 1), Math.max(1, columns - columnSpan + 1));

    return {
      ...block,
      columnStart,
      columnSpan,
      rowStart: Math.max(block.rowStart ?? index * 4 + 1, 1),
      rowSpan: Math.max(block.rowSpan ?? getDefaultRowSpan(block), 1),
    };
  });
}

export default function ProjectGridInput(props: ProjectGridInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const columnsValue = useFormValue(["layoutColumns"]);
  const rowsValue = useFormValue(["layoutRows"]);
  const rowHeightValue = useFormValue(["layoutRowHeight"]);
  const gapValue = useFormValue(["layoutGap"]);

  const columns = typeof columnsValue === "number" ? columnsValue : 12;
  const rows = typeof rowsValue === "number" ? rowsValue : 18;
  const rowHeight = typeof rowHeightValue === "number" ? rowHeightValue : 80;
  const gap = typeof gapValue === "number" ? gapValue : 20;
  const blocks = useMemo(() => {
    const rawBlocks = isGridBlockArray(props.value) ? props.value : [];
    return normalizeBlocks(rawBlocks, columns);
  }, [props.value, columns]);

  const activeSelectedKey = selectedKey && blocks.some((block) => block._key === selectedKey)
    ? selectedKey
    : blocks[0]?._key ?? null;

  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      const state = dragStateRef.current;
      const container = containerRef.current;

      if (!state || !container) {
        return;
      }

      const stepX = (container.clientWidth - gap * (columns - 1)) / columns + gap;
      const stepY = rowHeight + gap;
      const deltaColumns = Math.round((event.clientX - state.startX) / stepX);
      const deltaRows = Math.round((event.clientY - state.startY) / stepY);

      const nextBlocks = blocks.map((block) => {
        if (block._key !== state.key) {
          return block;
        }

        if (state.mode === "move") {
          const columnSpan = block.columnSpan ?? 1;
          return {
            ...block,
            columnStart: Math.min(Math.max(state.startColumn + deltaColumns, 1), Math.max(1, columns - columnSpan + 1)),
            rowStart: Math.min(Math.max(state.startRow + deltaRows, 1), rows),
          };
        }

        const nextColumnSpan = Math.min(Math.max(state.startColumnSpan + deltaColumns, 1), columns - state.startColumn + 1);
        const nextRowSpan = Math.min(Math.max(state.startRowSpan + deltaRows, 1), Math.max(1, rows - state.startRow + 1));

        return {
          ...block,
          columnSpan: nextColumnSpan,
          rowSpan: nextRowSpan,
        };
      });

      props.onChange(set(nextBlocks));
    };

    const pointerUp = () => {
      dragStateRef.current = null;
    };

    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);

    return () => {
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
    };
  }, [blocks, columns, gap, props, rowHeight, rows]);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>, block: GridBlock, mode: DragState["mode"]) => {
    event.preventDefault();
    event.stopPropagation();

    dragStateRef.current = {
      key: block._key,
      mode,
      startX: event.clientX,
      startY: event.clientY,
      startColumn: block.columnStart ?? 1,
      startRow: block.rowStart ?? 1,
      startColumnSpan: block.columnSpan ?? 1,
      startRowSpan: block.rowSpan ?? 1,
    };

    setSelectedKey(block._key);
  };

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} shadow={1} border>
        <Stack space={3}>
          <Flex justify="space-between" align="center">
            <Text size={2} weight="semibold">Project Grid Canvas</Text>
            <Text size={1} muted>
              {columns} columns · {rows} rows · {rowHeight}px row height
            </Text>
          </Flex>

          <div
            ref={containerRef}
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
              gap: `${gap}px`,
              minHeight: `${rows * rowHeight + Math.max(0, rows - 1) * gap}px`,
              padding: "16px",
              borderRadius: "12px",
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`,
              backgroundSize: `calc((100% - ${(columns - 1) * gap}px) / ${columns} + ${gap}px) ${rowHeight + gap}px`,
              backgroundColor: "#fafafa",
              overflow: "hidden",
            }}
          >
            {blocks.map((block) => {
              const isSelected = block._key === activeSelectedKey;
              return (
                <div
                  key={block._key}
                  onPointerDown={(event) => startDrag(event, block, "move")}
                  onClick={() => setSelectedKey(block._key)}
                  style={{
                    gridColumn: `${block.columnStart ?? 1} / span ${block.columnSpan ?? 1}`,
                    gridRow: `${block.rowStart ?? 1} / span ${block.rowSpan ?? 1}`,
                    borderRadius: "10px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "grab",
                    background: isSelected ? "#111111" : "#ffffff",
                    color: isSelected ? "#ffffff" : "#111111",
                    border: isSelected ? "1px solid #111111" : "1px solid rgba(0,0,0,0.12)",
                    boxShadow: isSelected ? "0 12px 24px rgba(0,0,0,0.12)" : "none",
                    userSelect: "none",
                  }}
                >
                  <div>
                    <Text size={1} style={{opacity: 0.6}}>{block._type}</Text>
                    <Text size={2} weight="medium">{getBlockLabel(block)}</Text>
                  </div>

                  <Text size={1} style={{opacity: 0.65}}>
                    c{block.columnStart ?? 1} / s{block.columnSpan ?? 1} · r{block.rowStart ?? 1} / s{block.rowSpan ?? 1}
                  </Text>

                  <div
                    onPointerDown={(event) => startDrag(event, block, "resize")}
                    style={{
                      position: "absolute",
                      right: 8,
                      bottom: 8,
                      width: 16,
                      height: 16,
                      borderRight: `2px solid ${isSelected ? "#ffffff" : "#111111"}`,
                      borderBottom: `2px solid ${isSelected ? "#ffffff" : "#111111"}`,
                      cursor: "nwse-resize",
                    }}
                  />
                </div>
              );
            })}
          </div>

          <Text size={1} muted>
            Drag blocks to move them on the grid. Drag the bottom-right corner to resize their column and row span. Use the fields below to add, edit, and upload content.
          </Text>
        </Stack>
      </Card>

      {props.renderDefault(props)}
    </Stack>
  );
}