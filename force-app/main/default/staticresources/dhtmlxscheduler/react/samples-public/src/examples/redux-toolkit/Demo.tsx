import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactScheduler from "@dhx/trial-react-scheduler";
import "@dhx/trial-react-scheduler/dist/react-scheduler.css";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  updateEvent, createEvent, deleteEvent,
  setCurrentDate, setZoom,
} from "../../redux/schedulerSlice";
import { undo, redo } from "../../redux/historyWrapper";
import type { RootState } from "../../redux/store";

/**
 * Scheduler demo wired to Redux Toolkit history.
 *
 * • Toolbar buttons (Day/Week/Month, Prev/Next/Today) dispatch actions that
 *   update `zoom` and `currentDate` in the slice.
 * • Undo / Redo roll back any state change – including view switches and CRUD.
 * • No custom Timeline view needed: we simply set `view={zoom}` ("day", "week",
 *   or "month"), which are built‑in Scheduler modes.
 */
export default function ReactSchedulerReduxDemo() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler | Redux Toolkit & Undo/Redo";
  }, []);

  const dispatch = useDispatch();

  const present = useSelector((s: RootState) => s.scheduler.present);
  const canUndo = useSelector((s: RootState) => s.scheduler.past.length > 0);
  const canRedo = useSelector((s: RootState) => s.scheduler.future.length > 0);

  const { events, zoom, currentDate, config } = present;
  const activeDate = new Date(currentDate);

  const addDate = useCallback((step: number) => {
    const date = new Date(activeDate);
    if (zoom === "day") {
      date.setDate(date.getDate() + step);
    } else if (zoom === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [activeDate, zoom, dispatch]);

  // Scheduler <-> Redux data bridge 
  const dataBridge = {
    save: (entity: string, action: string, payload: any, id: any) => {
      if (entity !== "event") return;

      switch (action) {
        case "update":
          dispatch(updateEvent(payload));
          break;
        case "create":
          dispatch(createEvent(payload));
          break;
        case "delete":
          dispatch(deleteEvent(id));
          break;
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  };

  const handleViewChange = (mode: string, date: Date) => {
    if (mode === "day") {
      dispatch(setZoom("day"));
    } else if (mode === "week") {
      dispatch(setZoom("week"));
    } else {
      dispatch(setZoom("month"));
    }
    dispatch(setCurrentDate(date.getTime()));
  };

  // custom toolbar
  const Toolbar = (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1, borderBottom: "1px solid #ddd" }}>
      {(["day", "week", "month"] as const).map(l => (
        <Button key={l} variant={zoom === l ? "contained" : "outlined"} onClick={() => dispatch(setZoom(l))}>
          {l.charAt(0).toUpperCase() + l.slice(1)}
        </Button>
      ))}

      <IconButton disabled={!canUndo} onClick={() => dispatch(undo())}>↺</IconButton>
      <IconButton disabled={!canRedo} onClick={() => dispatch(redo())}>↻</IconButton>
      <span style={{ flexGrow: 1 }} />
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {activeDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      </Typography>
      <span style={{ flexGrow: 1 }} />
      <IconButton onClick={() => addDate(-1)}>&nbsp;&lt;&nbsp;</IconButton>
      <Button onClick={() => dispatch(setCurrentDate(Date.now()))}>Today</Button>
      <IconButton onClick={() => addDate(1)}>&nbsp;&gt;&nbsp;</IconButton>
    </Stack>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {Toolbar}

      <ReactScheduler
        events={events}
        view={zoom}
        date={activeDate}
        xy={{ nav_height: 0 }} /* hide built‑in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
