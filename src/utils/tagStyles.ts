import type { TagColor } from '../types/app';

export function tagColorClass(color?: TagColor) {
  switch (color) {
    case 'orange':
      return 'bg-orange-100 text-orange-700';
    case 'green':
      return 'bg-green-100 text-green-700';
    case 'purple':
      return 'bg-purple-100 text-purple-700';
    case 'red':
      return 'bg-red-100 text-red-700';
    case 'blue':
    default:
      return 'bg-blue-100 text-blue-700';
  }
}

export function tagSelectedClass(color?: TagColor) {
  switch (color) {
    case 'orange':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'green':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'purple':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'red':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'blue':
    default:
      return 'bg-blue-100 text-blue-700 border-blue-300';
  }
}
