const WORDS_PER_MINUTE = 200;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const calculateReadingTime = (content: string): number => {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / MS_PER_DAY);

  if (diffInDays === 0) return "今日";
  if (diffInDays === 1) return "昨日";
  if (diffInDays < 7) return `${diffInDays}日前`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}週間前`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months}ヶ月前`;
  }
  return dateString;
};
