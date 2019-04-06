/**
 * Get react-feather icon component from icon name, otherwise use fallback icon
 */
import * as Icons from "react-feather"

export default function getIconComponent(icon, fallback = "HelpCircle") {
  return Icons[icon] || Icons[fallback]
}
