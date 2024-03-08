import React, { useMemo } from "react";
import { Routes, Route, useLocation, useMatch } from "react-router-dom";
import { Container } from "@mui/material";
import "../../../css/member-page.css";
import { VisitOtherPage } from "./visitOtherPage";
import { VisitMyPage } from "./visitMyPage";
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage() {
  /** Initializations */

  const query = useQuery();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;
  /** Handlers */
  return (
    <div className="member_page">
      <Routes>
        <Route
          path="/"
          element={
            <VisitMyPage
              chosen_mb_id={chosen_mb_id}
              chosen_art_id={chosen_art_id}
            />
          }
        />
        <Route
          path="/other"
          element={
            <VisitOtherPage
              chosen_mb_id={chosen_mb_id}
              chosen_art_id={chosen_art_id}
            />
          }
        />
      </Routes>
    </div>
  );
}
