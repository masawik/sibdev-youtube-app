export const useLastViewMode = (): false | 'list' | 'card' => {
  const lastViewMode = localStorage.getItem('viewMode')
  if (!lastViewMode || (lastViewMode !== 'list' && lastViewMode !== 'card')) return false
  return lastViewMode
}