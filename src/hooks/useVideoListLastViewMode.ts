export const useLastViewMode = (): false | string => {
  const lastViewMode = localStorage.getItem('viewMode')
  if (!lastViewMode || (lastViewMode !== 'list' && lastViewMode !== 'card')) return false
  return lastViewMode
}