import React from "react";
import { IconButton } from "../../../shared/ui/IconButton";

export function LanguageSwitcher() {
  return (
    <IconButton aria-label="Сменить язык">
      <span role="img" aria-hidden="true">
        🌐
      </span>
    </IconButton>
  );
}