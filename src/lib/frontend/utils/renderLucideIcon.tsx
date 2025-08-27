
import * as Icons from 'lucide-react';

function renderLucideIcon(iconName: string, size?: number) {
  if (!iconName) return null;

  const IconComponent = (Icons as any)[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return <Icons.HelpCircle size={size || 24} />;
  }

  return <IconComponent size={size || 24} />;
}

export default renderLucideIcon;