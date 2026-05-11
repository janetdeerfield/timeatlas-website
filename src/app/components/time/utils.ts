import { cn } from '../ui/utils';

export function joinClasses(...classes: Parameters<typeof cn>): string {
  return cn(...classes);
}
