import {
  Tooltip as MuiTooltip,
  tooltipClasses,
  type TooltipProps,
} from "@mui/material";

export default function Tooltip(props: TooltipProps) {
  return (
    <MuiTooltip
      {...props}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
              {
                marginTop: "5px",
              },
          },
        },
      }}
      disableInteractive
    >
      {props.children}
    </MuiTooltip>
  );
}
