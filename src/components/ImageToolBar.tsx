import React from "react";
import { styled } from "@stitches/react";
import { Button, Link, Root, Separator } from "@radix-ui/react-toolbar";
import { violet, blackA, mauve } from "@radix-ui/colors";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { FilePath } from "../FilePath";

const StyledToolbar = styled(Root, {
  display: "flex",
  padding: 10,
  width: "80vh",
  minWidth: "max-content",
  borderRadius: 6,
  backgroundColor: "white",
  boxShadow: `0 3px 10px ${blackA.blackA7}`,
});

const commonItemStyles = {
  all: "unset",
  flex: "0 0 auto",
  color: mauve.mauve11,
  height: 25,
  borderRadius: 4,
  display: "inline-flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { backgroundColor: violet.violet3, color: violet.violet11 },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${violet.violet7}` },
};

const StyledButton = styled(
  Button,
  {
    ...commonItemStyles,
    boxShadow: 0,
    backgroundColor: "white",
  },
  { "&:hover": { color: "white", backgroundColor: violet.violet10 } }
);

const StyledSeparator = styled(Separator, {
  width: 1,
  backgroundColor: mauve.mauve6,
  margin: "0 10px",
});

const StyledLink = styled(
  Link,
  {
    ...commonItemStyles,
    backgroundColor: "transparent",
    color: mauve.mauve11,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  {
    "&:hover": { backgroundColor: "transparent", cursor: "pointer" },
  }
);

export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;

interface ImageToolBarProps {
  currentFilePath: FilePath;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageToolBar: React.FC<ImageToolBarProps> = ({
  currentFilePath,
  onPrevious,
  onNext,
}) => {
  return (
    <Toolbar>
      <ToolbarButton onClick={onPrevious}>
        <ArrowLeftIcon aria-label="Go to left image" />
      </ToolbarButton>
      <ToolbarButton onClick={onNext}>
        <ArrowRightIcon aria-label="Go to right image" />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink>{currentFilePath.value}</ToolbarLink>
    </Toolbar>
  );
};

export default ImageToolBar;
