import { SessionEndReason } from "../index";

export function protoToStringSessionEndReason(
  reason: number | null | undefined
): string {
  switch (reason) {
    case SessionEndReason.SESSION_END_REASON_NORMAL:
      return "normal";
    case SessionEndReason.SESSION_END_REASON_ERROR:
      return "error";
    case SessionEndReason.SESSION_END_REASON_TIMEOUT:
      return "timeout";
    case SessionEndReason.SESSION_END_REASON_UNSPECIFIED:
    default:
      return "unknown";
  }
}
