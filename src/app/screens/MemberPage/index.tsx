import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import "../../../css/member-page.css";

import { VisitOtherPage } from "./visitOtherPage";
import { VisitMyPage } from "./visitMyPage";

export function MemberPage() {
  return (
    <div className="member_page">
      <Routes>
        <Route path="/" element={<VisitMyPage />} />
        <Route path="/other" element={<VisitOtherPage />} />
      </Routes>
    </div>
  );
}
